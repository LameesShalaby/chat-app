import { Input as ChakraInput, Box, Button, Flex, Image } from "@chakra-ui/react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useContext, useState } from "react";
import { Timestamp, serverTimestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.error("File upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <Box className="input" p={4} bg="gray.100">
      <Flex alignItems="center">
        <ChakraInput
          type="text"
          placeholder="Type something...."
          onChange={(e) => setText(e.target.value)}
          mr={2}
          color="black"
        />
        <label htmlFor="file">
          <Image src={Attach} alt="" cursor="pointer" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
            color="black"
          />
        </label>
        <Button colorScheme="teal" ml={2} onClick={handleSend}>
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default Input;
