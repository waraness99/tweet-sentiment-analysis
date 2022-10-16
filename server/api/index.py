from http.server import BaseHTTPRequestHandler
from urllib import parse
import re

class handler(BaseHTTPRequestHandler):

	def do_GET(self):
		s = self.path
		dic = dict(parse.parse_qsl(parse.urlsplit(s).query))
		self.send_response(200)
		self.send_header('Content-type','text/plain')
		self.end_headers()

		if "name" in dic:
			message = "Hello, " + dic["name"] + "!"
		else:
			message = text_preprocessing("Hell ! 3 @eeee frèreHHH")

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
    # text = contractions.fix(text)
    # # remove punctuation
    # text = text.translate(str.maketrans('', '', string.punctuation))
    # remove special characters
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    # remove numbers
    text = re.sub(r'\d+', '', text)
    # remove small words
    text = re.sub(r'\b\w{1,2}\b', '', text)
    # spell correction (takes too much time, and doesn't improve that much accuracy)
    # text = Speller(lang='en', fast=True)(text)
    
    return text