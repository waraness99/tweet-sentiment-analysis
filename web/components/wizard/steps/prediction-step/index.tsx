import React from "react";
import {
  Heading,
  Button,
  Text,
  Progress,
  HStack,
  Stack,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";

import { WizardContext } from "../../machine/machine-types";
import { contentFromPrediction } from "./sentiment-data";
import { Prediction } from "./prediction-types";

interface PredictionStepProps {
  onSubmit: () => void;
  context: WizardContext;
}

export const PredictionStep = ({ onSubmit, context }: PredictionStepProps) => {
  const { text } = context;
  const [isLoading, setIsLoading] = React.useState(true);
  const [prediction, setPrediction] = React.useState<Prediction | undefined>();

  const predictSentiment = async (text: string) => {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:8000/predict",
      data: {
        text,
      },
    });

    return data;
  };

  React.useState(async () => {
    if (text) {
      const result = await predictSentiment(text);
      setIsLoading(false);
      const predictionValue = Math.round(result * 100);
      setPrediction({
        value: predictionValue,
        ...contentFromPrediction(predictionValue),
      });
    }
  }, []);

  return (
    <>
      <Heading as="h1" size="xl" textAlign="center">
        The sentiment is...
      </Heading>

      <Stack alignItems="center">
        <Skeleton isLoaded={!isLoading}>
          <Image src={prediction?.image} alt="love" boxSize="152" />
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Heading>{`${prediction?.label} (${prediction?.value}%)`}</Heading>
        </Skeleton>
      </Stack>

      <Stack>
        <Progress
          size="lg"
          rounded="full"
          value={prediction?.value}
          isIndeterminate={isLoading}
        />
        <HStack justifyContent="space-between">
          {["Terrible", "Okay", "Great"].map((label) => (
            <Text key={label} fontSize="sm">
              {label}
            </Text>
          ))}
        </HStack>
      </Stack>

      <Button colorScheme="twitter" alignSelf="flex-end" onClick={onSubmit}>
        Restart
      </Button>
    </>
  );
};
