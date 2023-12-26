import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Box, Button, FormControl, Input, Link as ChakraLink, Text } from "@chakra-ui/react";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <Box  display='flex' justifyContent='center' alignItems='center' h='100vh' className="formContainer">
      <Box w='50%' border='1px' borderColor='#81E6D9' borderRadius='12px' p='14' className="formWrapper" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" mb="4">Lama Chat</Text>
        <Text fontSize="xl" fontWeight="bold" mb="4">Login</Text>
        <form onSubmit={handleSubmit}>
          <FormControl mb="4" isRequired>
            <Input type="email" placeholder="Email" />
          </FormControl>
          <FormControl mb="4" isRequired>
            <Input type="password" placeholder="Password" />
          </FormControl>
          <Button type="submit" colorScheme="teal">Sign in</Button>
          {err && <Text color="red.500" mt="2">Something went wrong</Text>}
        </form>
        <Text mt="4">Don't have an account? <ChakraLink as={Link} to="/register" color="teal.500">Register</ChakraLink></Text>
      </Box>
    </Box>
  );
};

export default Login;
