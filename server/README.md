# Tweet Sentiment Analysis - Server

This is the server for the Tweet Sentiment Analysis project. It is a simple GET API that takes a tweet as a parameter and returns the sentiment of the tweet.

## Setup

### Create a Virtual Environment

The first step is to create a virtual environment. This is a virtual environment that will contain all the dependencies for the project. This is a good practice to keep the dependencies of different projects separate.

```bash
python3 -m venv venv
```

You can now activate the virtual environment by running:

```bash
source venv/bin/activate
```

### Install dependencies

Run the following command to download all required dependencies:

```bash
pip install -r requirements.txt
```

## Running the server

Run the following command to start the server:

```bash
python index.py
```

## Make a request

To make a request to the server, send a POST request to the following URL:

```curl
curl -X POST http://127.0.0.1:5000/
   -H 'Content-Type: application/json'
   -d '{"tweet":"I love this api!"}'
```

The server will return a float representing sentiment of the tweet. In the above example, for the tweet is `I love this api!`. The server will return `0.9697214365005493`. The closer the number is to 1, the more positive the tweet is. The closer the number is to 0, the more negative the tweet is.

## Deploying

We tried to deploy the server on Vercel as a Serverless Function. However, the server is too big to be deployed as a Serverless Function. The maximum size for a Serverless Function is 50 MB. This limitation come from AWS Lambda. You can find more details [here](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html).
