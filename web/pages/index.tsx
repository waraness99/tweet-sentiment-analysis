import React, { useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import { Tweet } from "react-twitter-widgets";

const Home: NextPage = () => {
  const [tweetUrl, setTweetUrl] = React.useState("");
  const [tweetText, setTweetText] = React.useState("");
  const [sentimentPrediction, setSentimentPrediction] = React.useState("");

  const predictSentiment = async (text: string) => {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:8000/predict",
      data: {
        text,
      },
    });

    return data;
  };

  const getBearerToken = async () => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:8000/token",
    });

    return data.access_token;
  };

  const storeBearerToken = async () => {
    const token = await getBearerToken();
    setCookie("bearer_token", token);
  };

  const extractTweetIdFromUrl = (url: string) => {
    const parsedTweetUrl = url.split("?")[0];
    const tweetId = parsedTweetUrl.split("/").pop();

    return tweetId;
  };

  const getTweetTextFromId = async (id: string) => {
    const bearer = getCookie("bearer_token");

    const { data } = await axios({
      method: "get",
      url: `http://localhost:8000/tweet/${id}`,
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });

    console.log(data);

    return data.text || data.data.text;
  };

  const getSentimentFromTweet = async () => {
    const tweetId = extractTweetIdFromUrl(tweetUrl);
    if (tweetId !== undefined) {
      const tweetText = await getTweetTextFromId(tweetId);
      const sentiment = await predictSentiment(tweetText);
      setSentimentPrediction(sentiment);
    }
  };

  const getSentimentFromText = async () => {
    const sentiment = await predictSentiment(tweetText);
    setSentimentPrediction(sentiment);
  };

  // useEffect(() => {
  //   storeBearerToken();
  // }, []);

  return (
    <div>
      <h2 className="text-twitter">Text</h2>
      <textarea onChange={(e) => setTweetText(e.target.value)} />
      <button onClick={getSentimentFromText}>Predict</button>

      <h2>Twitter</h2>
      <textarea onChange={(e) => setTweetUrl(e.target.value)} />
      {tweetUrl && (
        <Tweet
          tweetId={`${extractTweetIdFromUrl(tweetUrl)}`}
          renderError={(_err) =>
            "Could not load tweet! ...Your custom component here"
          }
        />
      )}
      <Tweet
        tweetId={`${extractTweetIdFromUrl(
          "https://twitter.com/cctv_idiots/status/1582054983130054656?s=20&t=xxTVlraJOQkAGlkPd724aQ"
        )}`}
        renderError={(_err) =>
          "Could not load tweet! ...Your custom component here"
        }
      />
      <button onClick={getSentimentFromTweet}>Get tweet info</button>

      <h2>Prediction</h2>
      <p> {sentimentPrediction ?? "_"}</p>
    </div>
  );
};

export default Home;
