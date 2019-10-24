import re

def clean_sentence(sen):
    #remove unnecessary signs
    sen = re.sub('[-=+,#/\?:^$.@*\"※~&%·ㆍ!』♥☆\\‘|\(\)\[\]\<\>`\'…》]', ' ', sen)
    sen = sen.strip()
    return sen

def filterout(words):
    #filter out words less than len 1 or digits
    res = []
    for w in words:
        if not (len(w) <= 1 or w.isdigit()):
            res.append(w)
    return res