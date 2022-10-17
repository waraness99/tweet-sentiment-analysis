# Tweet Sentiment Analysis

This project aims to classify the sentiment of a tweet as positive or negative. The project is divided into 3 parts:

1. The AI model
2. A server that uses the model to classify tweets
3. A web client that sends tweets to the server and displays the sentiment

## The AI model

The AI model is a simple Sequence to Sequence model (Seq2seq). The model is trained on a dataset of 1.6 million tweets. The dataset is available [here](https://www.kaggle.com/kazanova/sentiment140). The model is trained on 1.2 million tweets and tested on 400,000 tweets. The model achieves an accuracy of 78% on the test set.

When you give the model a tweet, it returns a number between 0 and 1. The closer the number is to 1, the more positive the tweet is. The closer the number is to 0, the more negative the tweet is.

You can find all details inside the model notebook [here](./model/main.ipynb).

## The server

The server is a simple Flask API that takes a tweet as a parameter and returns the sentiment of the tweet. The server uses the model to classify the tweet.
It also includes an API to get a tweet by its ID. It uses the Twitter API to get the tweet.

You can find all details inside the server README [here](./server/README.md).

## The web client

The web client is a simple web app that allows you to send tweets to the server and display the sentiment. You can find all details inside the client README [here](./client/README.md).
