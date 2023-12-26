import React from "react";
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  return (
    <>
      <Box
        display={{ base: "none", lg: "block" }}
        bg="gray.700"
        w={isLargerThanMd ? "35%" : "100%"}
        h="100vh"
        p={2}
        color="white"
      >
        <Navbar />
        <Search />
        <Chats />
      </Box>

      <Box display={{ base: "block", lg: "none" }}>
        <Flex
          align="center"
          justifyContent="space-between"
          p={4}
          bg="gray.800"
          color="white"
        >
          <Text pb={2}>Let's Chat</Text>
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Open Sidebar"
            onClick={onOpen}
          />
        </Flex>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader bg="gray.700" color="white">
              <Text pb={2}>Let's Chat</Text>
            </DrawerHeader>
            <DrawerBody p={0}>
              <Flex direction="column" bg="gray.700" color="white">
                <Navbar />
                <Search />
                <Chats />
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
