from flask import Flask, request
from model.index import predict_sentiment

app = Flask(__name__)


@app.route('/', methods=['POST'])
def predict_tweet_sentiment():
    tweet = request.json['tweet']
    return predict_sentiment(tweet)


if __name__ == '__main__':
    app.run()
