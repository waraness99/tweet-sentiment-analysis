import React from "react";
import { Heading, Stack, Text, Textarea } from "@chakra-ui/react";
import { WizardContext } from "@/components/wizard/machine/machine-types";

interface InputFromTextProps {
  onTextChange: (text: string) => void;
  context: WizardContext;
}

export const InputFromText = ({
  onTextChange,
  context,
}: InputFromTextProps) => {
  const [value, setValue] = React.useState(context.text ?? "");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const eventValue = event.target.value;
    setValue(eventValue);
    onTextChange(eventValue);
  };

  return (
    <>
      <Stack spacing="2">
        <Heading as="h1">Write your text bellow</Heading>
        <Text>Our model will predict the sentiment of your text.</Text>
      </Stack>

      <Textarea
        placeholder="Put your text here..."
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
};
