#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 16 16:50:24 2023

@author: sheetalsudhir
"""
# from venv import TfidfVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from flask import Flask, request, jsonify, render_template
import string
import pickle

app = Flask(__name__)
model = pickle.load(open('model.pk1', 'rb'))
tfidf_vectorizer = pickle.load(open('tfidf.pk1', 'rb'))

def remove_punctuation(text):
    if type(text)==float:
        return text
    new_text = ""
    for i in text:
        if i not in string.punctuation:
            new_text+=i
    return new_text

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    text_input = request.form.get("text")
    
    # remove stopwords
    stop_words = stopwords.words('english')
    
    text_tokens = word_tokenize(text_input)
    tokens_without_sw = [word for word in text_tokens if not word in stopwords.words()]
    new_text = (" ").join(tokens_without_sw)

    # remove punctuation
    new_text = remove_punctuation(new_text)

    # generate vector for data
    new_text_lst = [new_text]
    tfidf_vector = tfidf_vectorizer.transform(new_text_lst)
    
    # generate prediction
    prediction = model.predict(tfidf_vector)
    
    return render_template('index.html', prediction_text='Predicted label is {}'.format(prediction))

if __name__ == "__main__":
    app.run(debug=True)