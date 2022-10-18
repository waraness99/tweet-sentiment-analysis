import { useMachine } from "@xstate/react";
import { wizardMachine } from "./machine/machine";
import {
  EventTypes,
  InputMethod,
  WizardFlowStates,
} from "./machine/machine-types";
import { InputMethodStep } from "./steps/input-method-step";
import { PredictionStep } from "./steps/prediction-step";
import { TextInputStep } from "./steps/text-input-step";
import { WelcomeStep } from "./steps/welcome-step";

export const Wizard = () => {
  const [state, send] = useMachine(wizardMachine);

  const CurrentStep = () => {
    switch (state.value) {
      case WizardFlowStates.Welcome:
        return <WelcomeStep onSubmit={() => send(EventTypes.Start)} />;
      case WizardFlowStates.InputMethod:
        return (
          <InputMethodStep
            onSubmit={(value) => send(EventTypes.SetInputMethod, { value })}
          />
        );
      case WizardFlowStates.TextInput:
        return (
          <TextInputStep
            onSubmit={(value) => send(EventTypes.SetText, { value })}
            inputMethod={state.context.inputMethod as InputMethod}
          />
        );
      case WizardFlowStates.SentimentPrediction:
        return <PredictionStep onSubmit={() => send(EventTypes.Restart)} />;
      default:
        return <div>Error</div>;
    }
  };

  return (
    <div>
      {state.value !== WizardFlowStates.Welcome && (
        <button onClick={() => send(EventTypes.Prev)}>Previous</button>
      )}
      <CurrentStep />

      <pre>{JSON.stringify(state.context, null, 2)}</pre>
    </div>
  );
};
