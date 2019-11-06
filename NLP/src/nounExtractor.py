import re
from konlpy.tag import Kkma, Twitter, Hannanum, Komoran, Mecab
from textblob import TextBlob

from preprocessing import *
from body import spider

def notNoStopWords(word): #불용어처리
    nos = ['네이버', 'naver']
    if word not in nos:
        return True
    return False

def getEngNouns(sen):
    return [r for r in TextBlob(sen).noun_phrases if len(re.findall(u'[\u3130-\u318F\uAC00-\uD7A3]+', r))==0]

def nlp_apis(api_num, sen):
    sen = clean_sentence(sen)
    api_dict = {1:Kkma(), 2:Twitter(), 3:Hannanum(), 4:Komoran(), 5:Mecab()}

    module = api_dict[api_num]

    #pos = module.pos(sen)
    #return deleteRepetes(filter(module.nouns(sen))) + eng_nouns(sen), module.pos(sen)
    return filterout(module.nouns(sen)) + getEngNouns(sen), module.pos(sen)

def nouns_extractor(title, url, nlpapi_num=5):
    title_nouns, _ = nlp_apis(nlpapi_num, title)
    body_nouns, _ = nlp_apis(nlpapi_num, spider(url))
    
    return title_nouns, body_nouns