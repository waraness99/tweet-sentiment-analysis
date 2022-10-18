import { InputMethod } from "../machine/machine-types";

interface InputMethodStepProps {
  onSubmit: (value: InputMethod) => void;
}

export const InputMethodStep = ({ onSubmit }: InputMethodStepProps) => {
  const handleSubmit = () => {
    onSubmit(InputMethod.TweetText);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Input Method</h1>
      <p className="mt-4">Select an input method</p>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};
