import { Stack, Heading, Text, Button, Image } from "@chakra-ui/react";

interface WelcomeStepProps {
  onSubmit: () => void;
}

export const WelcomeStep = ({ onSubmit }: WelcomeStepProps) => (
  <>
    <Stack spacing="2" textAlign="center">
      <Heading as="h1">Detect feelings with our AI</Heading>
      <Text maxW="xl" alignSelf="center">
        Need to determine the sentiment of a text or tweet? No problem, our AI
        takes care of it!
      </Text>
    </Stack>

    <Image
      src="cover.png"
      alt="Detect feelings with our AI"
      w="80%"
      alignSelf="center"
    />

    <Button colorScheme="twitter" alignSelf="center" onClick={onSubmit}>
      Start Now!
    </Button>
  </>
);
