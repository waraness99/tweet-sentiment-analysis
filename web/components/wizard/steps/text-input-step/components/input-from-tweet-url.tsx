import React from "react";
import { Button, Heading, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { Tweet } from "react-twitter-widgets";

import axios from "axios";
import { getCookie } from "cookies-next";

interface InputFromTweetUrlProps {
  onTextChange: (text: string) => void;
}

export const InputFromTweetUrl = ({ onTextChange }: InputFromTweetUrlProps) => {
  const [tweetUrl, setTweetUrl] = React.useState("");
  const [tweetId, setTweetId] = React.useState("");
  const [isValidUrl, setIsValidUrl] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    setTweetUrl(eventValue);
  };

  const extractTweetIdFromUrl = (url: string) => {
    const parsedTweetUrl = url.split("?")[0];
    const tweetId = parsedTweetUrl.split("/").pop();
    return tweetId;
  };

  const getTweetTextFromId = async (id: string) => {
    const bearer = getCookie("bearer_token");

    const { data, status } = await axios({
      method: "get",
      url: `http://localhost:8000/tweet/${id}`,
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    });

    return { data, status };
  };

  const onTweetUrlSubmit = async () => {
    const tempTweetId = extractTweetIdFromUrl(tweetUrl);
    if (tempTweetId) {
      setTweetId(tempTweetId);
      const { data } = await getTweetTextFromId(tempTweetId);
      if (data.errors) return alert("Tweet not found");
      setIsValidUrl(true);
      onTextChange(data.data.text);
    } else {
      alert("Tweet not found");
    }
  };

  return (
    <>
      <Stack spacing="2">
        <Heading as="h1">Paste a tweet Url</Heading>
        <Text>
          Our model will predict the sentiment of the text of the tweet.
        </Text>
      </Stack>

      <HStack>
        <Input
          placeholder="Basic usage"
          value={tweetUrl}
          onChange={handleInputChange}
        />
        <Button size="md" onClick={onTweetUrlSubmit}>
          Get
        </Button>
      </HStack>

      {isValidUrl && (
        <Tweet
          tweetId={tweetId}
          renderError={(_err) =>
            "Could not load tweet! ...Your custom component here"
          }
        />
      )}
    </>
  );
};
