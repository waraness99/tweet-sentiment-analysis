export enum Sentiment {
  Terrible = "terrible",
  Bad = "bad",
  Okay = "okay",
  Good = "good",
  Great = "great",
}

export type SentimentData = {
  image: string;
  label: string;
};

export interface Prediction extends SentimentData {
  value: number;
}

export type SentimentDataMap = {
  [key in Sentiment]: SentimentData;
};
