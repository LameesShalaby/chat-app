import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Container,
  Flex,
  Image,
  Spacer,
  Text,
  Button,
} from "@chakra-ui/react";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Container>
      <Flex className="navbar" pt={3} direction={{ base: "column", lg: "row" }}>
        <Box>
          <Text
            display={{ base: "none", lg: "block" }}
            fontSize="xl"
            fontWeight="bold"
          >
            Let's Chat
          </Text>
        </Box>
        <Spacer />
        <Flex alignItems="center" justifyContent="space-between">
          <Box boxSize="40px">
            <Image
              src={currentUser.photoURL}
              alt=""
              borderRadius="full"
              objectFit="cover"
              w="40px"
              h="40px"
            />
          </Box>
          <Box ml={3}>
            <Text>{currentUser.displayName}</Text>
          </Box>
          <Button ml={3} onClick={() => signOut(auth)}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
