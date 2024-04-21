import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, Divider, Spacer, Avatar, useToast } from "@chakra-ui/react";
import { FaRobot, FaUser } from "react-icons/fa";

const Index = () => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const toast = useToast();

  const handleSignUp = () => {
    if (username.trim() !== "") {
      toast({
        title: "Signed up successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const userMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: "user",
      };
      const botMessage = {
        id: Date.now() + 1,
        text: "I am Convergenous, an AI assistant. How can I help you today?",
        sender: "bot",
      };
      setMessages([...messages, userMessage, botMessage]);
      setInputMessage("");
    }
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Convergenous
      </Heading>
      {username === "" ? (
        <VStack spacing={4}>
          <Input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Button colorScheme="blue" onClick={handleSignUp}>
            Sign Up
          </Button>
        </VStack>
      ) : (
        <>
          <VStack spacing={4} align="stretch">
            {messages.map((message) => (
              <HStack key={message.id} bg={message.sender === "user" ? "gray.100" : "blue.100"} padding={2} borderRadius="md" maxWidth="80%" alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}>
                {message.sender === "user" ? (
                  <>
                    <Text>{message.text}</Text>
                    <Spacer />
                    <Avatar size="xs" icon={<FaUser />} />
                  </>
                ) : (
                  <>
                    <Avatar size="xs" icon={<FaRobot />} />
                    <Spacer />
                    <Text>{message.text}</Text>
                  </>
                )}
              </HStack>
            ))}
          </VStack>
          <Divider marginY={4} />
          <HStack>
            <Input placeholder="Type your message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
            <Button colorScheme="blue" onClick={handleSendMessage}>
              Send
            </Button>
          </HStack>
        </>
      )}
    </Box>
  );
};

export default Index;
