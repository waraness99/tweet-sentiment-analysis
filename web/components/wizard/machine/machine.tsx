import { createMachine } from "xstate";
import {
  setInputMethod,
  setText,
  initialContext,
  resetContext,
} from "./machine-functions";
import {
  WizardContext,
  WizardSchema,
  WizardEvent,
  WizardFlowStates,
  EventTypes,
} from "./machine-types";

export const wizardMachine = createMachine<
  WizardContext,
  // @ts-ignore:next-line
  WizardSchema,
  WizardEvent
>(
  {
    id: "wizard",
    predictableActionArguments: true,
    context: initialContext,
    initial: WizardFlowStates.Welcome,
    states: {
      [WizardFlowStates.Welcome]: {
        on: {
          [EventTypes.Start]: {
            target: WizardFlowStates.InputMethod,
          },
        },
      },
      [WizardFlowStates.InputMethod]: {
        on: {
          [EventTypes.SetInputMethod]: {
            target: WizardFlowStates.TextInput,
            actions: "setInputMethod",
          },
          [EventTypes.Prev]: {
            target: WizardFlowStates.Welcome,
          },
        },
      },
      [WizardFlowStates.TextInput]: {
        on: {
          [EventTypes.SetText]: {
            target: WizardFlowStates.SentimentPrediction,
            actions: "setText",
          },
          [EventTypes.Prev]: {
            target: WizardFlowStates.InputMethod,
          },
        },
      },
      [WizardFlowStates.SentimentPrediction]: {
        on: {
          [EventTypes.Restart]: {
            target: WizardFlowStates.InputMethod,
            actions: "resetContext",
          },
          [EventTypes.Prev]: {
            target: WizardFlowStates.TextInput,
          },
        },
      },
    },
  },
  {
    actions: { setInputMethod, setText, resetContext },
  }
);
