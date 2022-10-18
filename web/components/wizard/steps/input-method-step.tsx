import React from "react";
import { Stack, Heading, HStack, Button, Text } from "@chakra-ui/react";
import { IoDocumentTextOutline, IoLogoTwitter } from "react-icons/io5";
import { RadioButtonGroup } from "@/components/radio-button-group";
import { InputMethod, WizardContext } from "../machine/machine-types";

interface InputMethodStepProps {
  onSubmit: (value: InputMethod) => void;
  onPrevious: () => void;
  context: WizardContext;
}

export const InputMethodStep = ({
  onSubmit,
  onPrevious,
  context,
}: InputMethodStepProps) => {
  const [value, setValue] = React.useState<InputMethod>(
    context.inputMethod ?? InputMethod.TweetUrl
  );

  const handleChange = (value: InputMethod) => {
    setValue(value);
  };

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <>
      <Stack spacing="2">
        <Heading as="h1">What do you want to predict the feeling of?</Heading>
        <Text>Our model can analyze sentiment from texts and tweets.</Text>
      </Stack>

      <RadioButtonGroup
        defaultValue={value}
        value={value}
        options={[
          {
            label: "From a tweet",
            description: "Enter a tweet url to predict the sentiment.",
            icon: IoLogoTwitter,
            value: InputMethod.TweetUrl,
          },
          {
            label: "From a text",
            description: "Enter a text to predict the sentiment.",
            icon: IoDocumentTextOutline,
            value: InputMethod.TweetText,
          },
        ]}
        onChange={handleChange}
      />

      <HStack spacing="4" alignSelf="flex-end">
        <Button onClick={onPrevious}>Previous</Button>
        <Button colorScheme="twitter" onClick={handleSubmit}>
          Next
        </Button>
      </HStack>
    </>
  );
};
