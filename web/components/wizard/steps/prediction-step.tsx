interface PredictionStepProps {
  onSubmit: () => void;
}

export const PredictionStep = ({ onSubmit }: PredictionStepProps) => (
  <div>
    <h1 className="text-2xl font-bold">Prediction</h1>
    <p className="mt-4">Here is the prediction:</p>
    <button onClick={onSubmit}>Restart</button>
  </div>
);
