import { assign } from "xstate";
import {
  WizardContext,
  SetInputMethodEvent,
  SetTextEvent,
} from "./machine-types";

export const initialContext = { inputMethod: undefined, text: undefined };

export const setInputMethod = assign(
  (context: WizardContext, event: SetInputMethodEvent) => {
    return {
      inputMethod: event.value,
      text: context.text,
    };
  }
);

export const setText = assign((context: WizardContext, event: SetTextEvent) => {
  return {
    inputMethod: context.inputMethod,
    text: event.value,
  };
});

export const resetContext = assign(initialContext);
