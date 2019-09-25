import operator, re
from konlpy.tag import Kkma, Twitter, Hannanum, Komoran, Mecab
from textblob import TextBlob
from collections import Counter
from body import spider

def clean_sentence(sen):
    sen = re.sub('[-=+,#/\?:^$.@*\"※~&%·ㆍ!』♥☆\\‘|\(\)\[\]\<\>`\'…》]', ' ', sen)
    sen = sen.strip()
    return sen

def filter(words):
    #words = list(set(words))
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

def noStopWords(word): #불용어처리
    nos = ['네이버', 'naver']
    if word not in nos:
        return True
    return False

def eng_nouns(sen):
    return [r for r in TextBlob(sen).noun_phrases if len(re.findall(u'[\u3130-\u318F\uAC00-\uD7A3]+', r))==0]

def api(api_num, sen):
    sen = clean_sentence(sen)
    api_dict = {1:Kkma(), 2:Twitter(), 3:Hannanum(), 4:Komoran(), 5:Mecab('/usr/local/lib/mecab/dic/mecab-ko-dic')}

    module = api_dict[api_num]

    #pos = module.pos(sen)
    #return deleteRepetes(filter(module.nouns(sen))) + eng_nouns(sen), module.pos(sen)
    return filter(module.nouns(sen)) + eng_nouns(sen), module.pos(sen)

def nouns_extractor(title, url, num=5):
    title_nouns, _ = api(num, title)
    try:
        body_nouns, _ = api(num, spider(url))

    except Exception as e:
        print("::body nouns ERROR::\n", e)
    
    return title_nouns, body_nouns

def TF_score(title, body):

    words = {}
    try:
        for w, c in Counter(body).most_common(1000):
            if noStopWords(w):
                words[w] = c
    except Exception as e:
        print("::body nouns ERROR::\n", e)

    for w, c in Counter(title).most_common(10):
        if noStopWords(w):
            try:
                words[w] += c*10
            except:
                words[w] = c*10

    total = sum(words.values())

    res={}
    for k, v in words.items():
        res[k] = v/total

    return res

def getTags():
    tags = {"자동":0.1}
    return tags

def Total_score(words, tags, alpha=1, beta=1, test=True):
    #====================================================================
    # Tn-Score = (title-weight*title-tf + body-weihgt*body-tf) normalize
    # Tn-Tag = Tag weight normalize
    # Total = alpha * Tn-Score + beta * Tn-Tag
    #====================================================================

    for k, v in words.items():
        if k in tags.keys():
            words[k] = alpha*v + beta*tags[k]
        else:
            words[k] = alpha*v

    if test:
        return sorted(words.items(), key=operator.itemgetter(1), reverse=True)

    return [x[0] for x in sorted(words.items(), key=operator.itemgetter(1), reverse=True)][:5]

if __name__ == "__main__":
    while True:
        sen = input("문장입력>> ")
        TF_score(sen, 'https://subinium.github.io/feature-selection/')
        print()