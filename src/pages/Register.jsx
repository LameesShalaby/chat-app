import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Image,
  Center,
  FormControl,
  FormLabel,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <Box
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <Center w="50%">
        <Box
          w="100%"
          border="1px"
          borderColor="#81E6D9"
          borderRadius="12px"
          borderWidth="1px"
          overflow="hidden"
          textAlign="center"
          p="20"
        >
          <Heading as="h2" size="xl" p={4}>
            Lama Chat
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired p={2}>
              <FormLabel>Display Name</FormLabel>
              <Input type="text" placeholder="Display Name" />
            </FormControl>

            <FormControl isRequired p={2}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" />
            </FormControl>

            <FormControl isRequired p={2}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Password" />
            </FormControl>

            <FormControl
              isRequired
              p={2}
              display="flex"
              justifyContent="start"
              alignItems="center"
              flexDirection=""
            >
              <FormLabel>Avatar</FormLabel>
              <Input style={{ display: "none" }} type="file" id="file" />
              <label htmlFor="file">
                <Image
                  boxSize="50px"
                  cursor="pointer"
                  src={Add}
                  alt="Add Avatar"
                />
                <Text cursor="pointer">Add an avatar</Text>
              </label>
            </FormControl>

            <Button type="submit" isLoading={loading} colorScheme="teal" m={2}>
              Sign up
            </Button>
            {loading && (
              <Text fontSize="sm">
                Uploading and compressing the image, please wait...
              </Text>
            )}
            {err && <Text color="red.500">Something went wrong</Text>}
          </form>
          <Text>
            Already have an account?{" "}
            <ChakraLink as={Link} to="/login" color="teal.500">
              Login
            </ChakraLink>
          </Text>
        </Box>
      </Center>
    </Box>
  );
};

export default Register;
