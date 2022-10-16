import nltk
import json
import re
import contractions
import tensorflow as tf


# download nltk resources
nltk.download('punkt')
nltk.download('stopwords')
stopwords = nltk.corpus.stopwords.words('english')
nltk.download('wordnet')
stemmer = nltk.stem.SnowballStemmer('english')
# load model resources
model = tf.keras.models.load_model("model/best_model.h5")
with open('server/model/vocab.json') as json_file:
    vocab = json.load(json_file)


def text_preprocessing(text):
    # lowercase
    text = text.lower()
    # remove extra whitespaces
    text = " ".join(text.split())
    # remove urls
    text = re.sub(r'http\S+', '', text)
    # remove identifiers (e.g. @user)
    text = re.sub(r'@\S+', '', text)
    # replace common contractions by full words
    text = contractions.fix(text)
    # remove punctuation
    text = re.sub(r'[^\w\s]', '', text)
    # remove special characters
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    # remove numbers
    text = re.sub(r'\d+', '', text)
    # remove small words
    text = re.sub(r'\b\w{1,2}\b', '', text)

    return text


def tokenize(text):
    raw_tokens = nltk.word_tokenize(text)
    parsed_tokens = []

    for token in raw_tokens:
        if token not in stopwords:
            parsed_tokens.append(stemmer.stem(token))

    return parsed_tokens


def predict_sentiment(tweet):
    tweet = text_preprocessing(tweet)
    tokenized_tweet = tokenize(tweet)

    tokenized_tweet = [vocab.get(token) for token in tokenized_tweet]
    tokenized_tweet = [[token]
                       for token in tokenized_tweet if token is not None]
    tokenized_tweet = tf.keras.preprocessing.sequence.pad_sequences(
        [tokenized_tweet], maxlen=30, padding='post')

    return str(model.predict(tokenized_tweet).item())
