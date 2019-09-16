import operator, re
from konlpy.tag import Kkma, Twitter, Hannanum, Komoran
from textblob import TextBlob
from collections import Counter

def clean_sentence(sen):
    sen = re.sub('[-=+,#/\?:^$.@*\"※~&%·ㆍ!』♥☆\\‘|\(\)\[\]\<\>`\'…》]', ' ', sen)
    sen = sen.strip()
    return sen

def filter(words):
    words = list(set(words))
    res = []
    for w in words:
        if not (len(w) <= 1 or w.isdigit()):
            res.append(w)
    return res

def deleteRepetes(words):
    res = []
    for i in range(len(words)):
        inFlag = False
        for temp in words[:i]+words[i+1:]:
            if words[i] in temp:
                inFlag=True
                break
        if not inFlag:
            res.append(words[i])
    return res

def eng_nouns(sen):
    res = []
    temp = TextBlob(sen).noun_phrases
    for r in temp:
        if len(re.findall(u'[\u3130-\u318F\uAC00-\uD7A3]+', r))==0:
            res.append(r)
    return res

def api(api_num, sen):
    sen = clean_sentence(sen)

    module = None
    if api_num==1:
        module = Kkma()
    elif api_num==2:
        module = Twitter()
    elif api_num==3:
        module = Hannanum()
    elif api_num==4:
        module = Komoran()

    #pos = module.pos(sen)
    return deleteRepetes(filter(module.nouns(sen))) + eng_nouns(sen), module.pos(sen)

def keyword_extractor(title):
    title_nouns, _ = api(2, title)

    for w, c in Counter(title_nouns).most_common(100):
        print(w, c)

if __name__ == "__main__":
    while True:
        sen = input("문장입력>> ")
        keyword_extractor(sen)
        print()