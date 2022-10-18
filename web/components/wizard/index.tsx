import { useMachine } from "@xstate/react";
import { Stack } from "@chakra-ui/react";

import { WelcomeStep } from "./steps/welcome-step";
import { InputMethodStep } from "./steps/input-method-step";
import { TextInputStep } from "./steps/text-input-step";
import { PredictionStep } from "./steps/prediction-step";

import { wizardMachine } from "./machine/machine";
import { EventTypes, WizardFlowStates } from "./machine/machine-types";

export const Wizard = () => {
  const [state, send] = useMachine(wizardMachine);
  const { value, context } = state;

  // @ts-ignore
  const onPrevious = () => send(EventTypes.Prev);

  return (
    <Stack
      spacing={{ base: "4", md: "8", lg: "10" }}
      bg="white"
      p={{ base: "4", md: "8", lg: "12" }}
      rounded="xl"
      maxW="4xl"
      w="full"
    >
      {value === WizardFlowStates.Welcome && (
        <WelcomeStep
          // @ts-ignore
          onSubmit={() => send(EventTypes.Start)}
        />
      )}
      {value === WizardFlowStates.InputMethod && (
        <InputMethodStep
          // @ts-ignore
          onSubmit={(value) => send(EventTypes.SetInputMethod, { value })}
          onPrevious={onPrevious}
          context={context}
        />
      )}
      {value === WizardFlowStates.TextInput && (
        <TextInputStep
          // @ts-ignore
          onSubmit={(value) => send(EventTypes.SetText, { value })}
          onPrevious={onPrevious}
          context={context}
        />
      )}
      {value === WizardFlowStates.SentimentPrediction && (
        <PredictionStep
          // @ts-ignore
          onSubmit={() => send(EventTypes.Restart)}
          context={context}
        />
      )}
    </Stack>
  );
};
