import os
from dotenv import load_dotenv
import base64
import requests

from flask import Flask, request
from flask_cors import CORS
from model.index import predict_sentiment

app = Flask(__name__)
CORS(app)
load_dotenv()
TWITTER_API_KEY = os.getenv('TWITTER_API_KEY')
TWITTER_API_KEY_SECRET = os.getenv('TWITTER_API_KEY_SECRET')


@app.route('/predict', methods=['POST'])
def predict():
    text = request.json['text']
    return predict_sentiment(text)


@app.route('/token', methods=['GET'])
def get_token():
    basic_authentication = f'{TWITTER_API_KEY}:{TWITTER_API_KEY_SECRET}'
    basic_authentication = base64.b64encode(
        basic_authentication.encode('utf-8'))
    basic_authentication = f'Basic {basic_authentication.decode("utf-8")}'

    cookies = {'guest_id': 'v1%3A166599792829854195'}
    headers = {'Authorization': basic_authentication}
    data = {'grant_type': 'client_credentials'}

    response = requests.post('https://api.twitter.com/oauth2/token',
                             cookies=cookies, headers=headers, data=data)

    return response.json()


@app.route('/tweet/<tweet_id>', methods=['GET'])
def get_tweets(tweet_id):
    bearer = request.headers.get('Authorization')
    cookies = {'guest_id': 'v1%3A166599792829854195'}
    headers = {'Authorization': bearer}

    response = requests.get(
        f'https://api.twitter.com/2/tweets/{tweet_id}', cookies=cookies, headers=headers)

    return response.json()


if __name__ == '__main__':
    app.run(host='localhost', port=8000, debug=True)
