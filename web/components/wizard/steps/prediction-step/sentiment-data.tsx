import { SentimentDataMap, Sentiment, SentimentData } from "./prediction-types";

const sentimentDataMap: SentimentDataMap = {
  [Sentiment.Terrible]: {
    image: "/emojis/terrible.png",
    label: "Terrible",
  },
  [Sentiment.Bad]: {
    image: "/emojis/bad.png",
    label: "Bad",
  },
  [Sentiment.Okay]: {
    image: "/emojis/okay.png",
    label: "Okay",
  },
  [Sentiment.Good]: {
    image: "/emojis/good.png",
    label: "Good",
  },
  [Sentiment.Great]: {
    image: "/emojis/great.png",
    label: "Great",
  },
};

export const contentFromPrediction = (value: number): SentimentData => {
  if (value <= 20) return sentimentDataMap.terrible;
  else if (value > 20 && value <= 40) return sentimentDataMap.bad;
  else if (value > 40 && value <= 60) return sentimentDataMap.okay;
  else if (value > 60 && value <= 80) return sentimentDataMap.good;
  else if (value > 80) return sentimentDataMap.great;
  else return sentimentDataMap.okay;
};
