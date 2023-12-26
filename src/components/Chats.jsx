import { Box, Image, Flex, Text } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <Flex direction="column" align="start" className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <Box
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className="userChat"
            p={4}
            m={2}
            w="95%"
            boxShadow="md"
            borderRadius="md"
            cursor="pointer"
            transition="background-color 0.3s"
            _hover={{ bg: "gray.100", color: "black" }}
          >
            <Flex align="center">
              <Box boxSize="50px" mr={2}>
                <Image
                  borderRadius="full"
                  boxSize="100%"
                  objectFit="cover"
                  src={chat[1].userInfo?.photoURL}
                  alt=""
                />
              </Box>
              <Box>
                <Text fontWeight="bold">{chat[1].userInfo?.displayName}</Text>
                <Text>{chat[1].lastMessage?.text}</Text>
              </Box>
            </Flex>
          </Box>
        ))}
    </Flex>
  );
};

export default Chats;
