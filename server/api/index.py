from flask import Flask, render_template
import re
import contractions
import tensorflow as tf

app = Flask(__name__)

@app.route('/')
def hello():
    return predict_sentiment("I hate this movie")

@app.route('/test')
def test():
    return 'Test'

@app.route('/result')
def result():
   dict = {'phy':50,'che':60,'maths':70}
   return render_template('result.html', result = dict)


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
    #remove special characters
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    # remove numbers
    text = re.sub(r'\d+', '', text)
    # remove small words
    text = re.sub(r'\b\w{1,2}\b', '', text)
    
    return text


def predict_sentiment(tweet):
    tweet = text_preprocessing(tweet)
    
    pad_sequences = tf.keras.preprocessing.sequence.pad_sequences
    tokenizer = tf.keras.preprocessing.text.Tokenizer()
    tweet_sequence = pad_sequences(tokenizer.texts_to_sequences([tweet]), padding='post', maxlen=30)
    
    model = tf.keras.models.load_model('../../model/best_model.h5')
    return model.predict(tweet_sequence).item()