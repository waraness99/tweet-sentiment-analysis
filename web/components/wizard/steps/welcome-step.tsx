interface WelcomeStepProps {
  onSubmit: () => void;
}

export const WelcomeStep = ({ onSubmit }: WelcomeStepProps) => (
  <div>
    <h1 className="text-2xl font-bold">Welcome to the wizard</h1>
    <p className="mt-4">
      This wizard will help you to predict the sentiment of a tweet or a text.
    </p>
    <button onClick={onSubmit}>Start</button>
  </div>
);
