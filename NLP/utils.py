import operator, re
from konlpy.tag import Kkma, Twitter, Hannanum, Komoran, Mecab
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
        for temp in words[:i]+words[i+1:]:
            if temp is words[i]:
                continue
            if words[i] in temp:
                break
        else:
            res.append(words[i])
    return res

def eng_nouns(sen):
    return [r for r in TextBlob(sen).noun_phrases if len(re.findall(u'[\u3130-\u318F\uAC00-\uD7A3]+', r))==0]

def api(api_num, sen):
    sen = clean_sentence(sen)
    api_dict = {1:Kkma(), 2:Twitter(), 3:Hannanum(), 4:Komoran(), 5:Mecab('/usr/local/lib/mecab/dic/mecab-ko-dic')}

    module = api_dict[api_num]

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