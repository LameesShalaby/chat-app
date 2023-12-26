import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp } from "firebase/firestore";
import { Box, Image, Text } from "@chakra-ui/react";

const Message = ({ messages }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  console.log(messages);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messageDate =
    messages.date instanceof Timestamp ? messages.date.toDate() : messages.date;
  // Options to format time without seconds
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  return (
    <Box
      ref={ref}
      className={`message ${messages.senderId === currentUser.uid && "owner"}`}
      p={4}
      m={2}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      color="black"
    >
      <Box
        display="flex"
        alignItems=""
        flexDirection="column"
        justifyContent=""
      >
        <Image
          boxSize="40px"
          borderRadius="full"
          src={
            messages.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          mr={2}
        />
        <Box>
          <Text color="black" fontSize="10px" pt="5px">
            {messageDate?.toLocaleTimeString(undefined, timeOptions)}
          </Text>
        </Box>
      </Box>
      <Box mt={2}>
        <Text color="black" fontSize="18px" fontWeight="600">
          {messages.text}
        </Text>
        {messages.img && <Image src={messages.img} alt="" mt={2} />}
      </Box>
    </Box>
  );
};

export default Message;
