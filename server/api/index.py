from http.server import BaseHTTPRequestHandler
from urllib import parse
import re
import contractions
import tensorflow as tf

class handler(BaseHTTPRequestHandler):

	def do_GET(self):
		s = self.path
		dic = dict(parse.parse_qsl(parse.urlsplit(s).query))
		self.send_response(200)
		self.send_header('Content-type','text/plain')
		self.end_headers()
  
        # if "name" in dic:
        #     message = "Hello, " + dic["name"] + "!"
		# else:
		# 	message = "Hello, stranger!"

		message = predict_sentiment("I hate this movie")

		self.wfile.write(message.encode())
		return



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
    
    model = tf.keras.models.load_model('model.h5')
    return model.predict(tweet_sequence).item()