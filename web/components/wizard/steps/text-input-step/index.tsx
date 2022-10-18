import React from "react";
import { HStack, Button } from "@chakra-ui/react";
import { InputFromText } from "./components/input-from-text";
import { InputFromTweetUrl } from "./components/input-from-tweet-url";
import { InputMethod, WizardContext } from "../../machine/machine-types";

interface TextInputStepProps {
  onSubmit: (value: string) => void;
  onPrevious: () => void;
  context: WizardContext;
}

export const TextInputStep = ({
  onSubmit,
  onPrevious,
  context,
}: TextInputStepProps) => {
  const { inputMethod } = context;
  const [text, setText] = React.useState("");

  const handleTextChange = (text: string) => {
    setText(text);
  };

  const handleSubmit = () => {
    onSubmit(text);
  };

  return (
    <>
      {inputMethod === InputMethod.TweetText && (
        <InputFromText onTextChange={handleTextChange} context={context} />
      )}
      {inputMethod === InputMethod.TweetUrl && (
        <InputFromTweetUrl onTextChange={handleTextChange} />
      )}

      <HStack spacing="4" alignSelf="flex-end">
        <Button onClick={onPrevious}>Previous</Button>
        <Button colorScheme="twitter" onClick={handleSubmit}>
          Next
        </Button>
      </HStack>
    </>
  );
};
