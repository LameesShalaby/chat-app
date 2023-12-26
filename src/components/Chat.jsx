import { useContext } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import add from "../img/add.png";
import cam from "../img/cam.png";
import more from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <Box
      w="100%"
      bg="gray.900"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Flex className="chatInfo" p={6} justifyContent="space-between">
        <Text fontWeight="bold" fontSize="24px">
          {data.user?.displayName}
        </Text>
        <Flex>
          <Image src={add} alt="" />
          <Image src={cam} alt="" />
          <Image src={more} alt="" />
        </Flex>
      </Flex>
      <Messages />
      <Input />
    </Box>
  );
};

export default Chat;
