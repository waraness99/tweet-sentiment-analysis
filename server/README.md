# Tweet Sentiment Analysis - Server

This is the server for the Tweet Sentiment Analysis project. It contains an API to predict sentiment from a text, but also APIs to interact with Twitter.

## Endpoints

### Sentiment

The sentiment API is used to predict the sentiment of a text. It is available at the following URL: `http://localhost:5000/sentiment`.

#### Request

The request is a `POST` request with the following body:

```curl
curl --location --request POST 'http://localhost:8000/predict' \
--header 'Content-Type: application/json' \
--data-raw '{"text":"I love this api!"}'
```

#### Response

The response is a float between 0 and 1, where 0 is negative and 1 is positive.

```bash
 0.678999468088150
```

### Get Twitter Bearer Token

To use the Twitter API, you need to get a bearer token. You can do so by following the instructions [here](https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens). This token is used to authenticate to the Twitter API. 

#### Request

The request is a `GET` request with the following body:

```curl
curl --location --request GET 'http://localhost:8000/token'
```

#### Response

The response is a JSON object with the bearer token.

```bash
{
    "token_type": "bearer",
    "access_token": "AAAAAAAAAAAAAAAAAAAAA..."
}
```

### Get Tweet by ID

The get tweet by ID API is used to get a tweet by its ID. It is available at the following URL: `http://localhost:5000/tweet/<tweet_id>`. It calls the Twitter API to get the tweet.

#### Request

The request is a `GET` request with the following body:

```curl
curl --location --request GET 'http://localhost:8000/tweet/<tweet_id>' \
--header 'Authorization: Bearer <bearer_token>'
```

#### Response

The response is a JSON object with the following structure:

```json
{
    "data": {
        "edit_history_tweet_ids": [
            "1582026007267377154"
        ],
        "id": "1582026007267377154",
        "text": "I love this integration with Twitter!"
    }
}
```

## Getting Started

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

### Configure the environment

The server uses environment variables to interact with Twitter APIs. To obtain your Twitter API keys, follow the instructions [here](https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens). You will need to create a Twitter developer account and an app. Once you have your API keys, you can create a `.env` file in the root of the project and add the following variables:

```bash
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_KEY_SECRET=your_twitter_api_key_secret
```

## Running the server

Run the following command to start the server:

```bash
python index.py
```

## Make a request

To make a request to the server, send a POST request to the following URL:

```curl
curl --location --request POST 'http://localhost:8000/predict' \
--header 'Content-Type: application/json' \
--data-raw '{"text":"I love this api!"}'
```

The server will return a float representing sentiment of the tweet. In the above example, for the tweet is `I love this api!`. The server will return `0.9697214365005493`. The closer the number is to 1, the more positive the tweet is. The closer the number is to 0, the more negative the tweet is.

## Deploying

We tried to deploy the server on Vercel as a Serverless Function. However, the server is too big to be deployed as a Serverless Function. The maximum size for a Serverless Function is 50 MB. This limitation come from AWS Lambda. You can find more details [here](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html).
