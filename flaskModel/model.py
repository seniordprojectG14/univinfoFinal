import pickle
from venv import pandas as pd
#import pandas as pd  
from venv import nltk 

nltk.download('punkt')
nltk.download('stopwords')
from venv import stopwords
# from nltk.corpus import stopwords

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import confusion_matrix,classification_report

#library that contains punctuation
import string

path_to_data = "/Users/sheetalsudhir/Documents/SDP_ML/labeled_data.csv"
labeled_df = pd.read_csv(path_to_data)

# assigns hate speech and offensive language to the same class
def create_new_class_col(x):
    if x == 1 or x == 0:
        return 1
    else:
        return 0

labeled_df['new_class'] = labeled_df['class'].apply(create_new_class_col)

# text_preprocessing, removes stopwords
stop_words = stopwords.words('english')
labeled_df['tweet'] = labeled_df['tweet'].apply(lambda x: ' '.join([word for word in x.split() if word.lower() not in (stop_words)]))

# remove unnecessary punctuation
def remove_punctuation(text):
    if type(text)==float:
        return text
    new_text = ""
    for i in text:
        if i not in string.punctuation:
            new_text+=i
    return new_text

labeled_df['tweet'] = labeled_df['tweet'].apply(lambda x: remove_punctuation(x))

X = labeled_df['tweet']
y = labeled_df['new_class']

X_train, X_test , y_train, y_test = train_test_split(labeled_df['tweet'].values,labeled_df['new_class'].values,
                                                     test_size=0.2,random_state=123,
                                                     stratify=labeled_df['new_class'].values)

tfidf_vectorizer = TfidfVectorizer()
tfidf_train_vectors = tfidf_vectorizer.fit_transform(X_train)
tfidf_test_vectors = tfidf_vectorizer.transform(X_test)

clf = MultinomialNB()
clf.fit(tfidf_train_vectors,y_train)

# generate predictions on testing data
y_pred = clf.predict(tfidf_test_vectors)

# save tfidf vectorizer
pickle.dump(tfidf_vectorizer, open("tfidf.pk1", "wb"))

# save naive bayes classifier
pickle.dump(clf, open('model.pkl','wb'))