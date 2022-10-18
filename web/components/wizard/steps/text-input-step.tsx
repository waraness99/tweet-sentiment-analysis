import { InputMethod } from "../machine/machine-types";

interface TextInputStepProps {
  onSubmit: (value: string) => void;
  inputMethod: InputMethod;
}

export const TextInputStep = ({
  onSubmit,
  inputMethod,
}: TextInputStepProps) => {
  const handleSubmit = () => {
    onSubmit("Veniam tempor aliquip eu elit nulla.");
  };

  const SelectedInputMethod = () => {
    switch (inputMethod) {
      case InputMethod.TweetText:
        return <p>Put your text here</p>;
      case InputMethod.TweetUrl:
        return <p>Put your url here</p>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Text Input Step</h1>
      <SelectedInputMethod />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};
