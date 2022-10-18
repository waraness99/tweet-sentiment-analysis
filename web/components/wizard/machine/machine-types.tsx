import { AssignAction } from "xstate";

export enum WizardFlowStates {
  Welcome = "welcome",
  InputMethod = "inputMethod",
  TextInput = "textInput",
  SentimentPrediction = "sentimentPrediction",
}

export type WizardContext = {
  inputMethod?: InputMethod;
  text?: string;
};

export type WizardSchema = {
  states: {
    [key in WizardFlowStates]: {
      on: {
        target: WizardFlowStates;
        actions?: AssignAction<WizardContext, any>[];
      };
    };
  };
};

export enum InputMethod {
  TweetUrl = "tweetUrl",
  TweetText = "tweetText",
}

export enum EventTypes {
  Start = "START",
  Restart = "RESTART",
  Prev = "PREV",
  SetInputMethod = "SET_INPUT_METHOD",
  SetText = "SET_TEXT",
}

export type SetInputMethodEvent = {
  type: EventTypes.SetInputMethod;
  value: InputMethod;
};
export type SetTextEvent = { type: EventTypes.SetText; value: string };

export type WizardEvent =
  | { type: EventTypes.Start }
  | { type: EventTypes.Restart }
  | { type: EventTypes.Prev }
  | SetInputMethodEvent
  | SetTextEvent;
