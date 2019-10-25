from collections import Counter
import operator
import boto3
from boto3.dynamodb.conditions import Key, Attr

from nounExtractor import notNoStopWords

def TF_score(title, body):

    words = {}
    try:
        for w, c in Counter(body).most_common(1000):
            if notNoStopWords(w):
                words[w] = c
    except Exception as e:
        print("::body nouns ERROR::\n", e)

    for w, c in Counter(title).most_common(10):
        if notNoStopWords(w):
            try:
                words[w] += c*10
            except:
                words[w] = c*10

    total = sum(words.values())

    res={}
    for k, v in words.items():
        res[k] = v/total

    return res

def seletAllTagsFromDB():
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')
    table = dynamodb.Table('tags')

    response = table.scan(
        FilterExpression=Attr('fq').gt(0)
    )

    words = {}
    for i in response['Items']:
        words[i['words']] = float(i['fq'])
    
    total = sum(words.values())

    for k, v in words.items():
        words[k] = v/total

    return words

def Total_score(words, tags, alpha=1, beta=1, test=True):
    #====================================================================
    # Tn-Score = (title-weight*title-tf + body-weihgt*body-tf) normalize
    # Tn-Tag = Tag weight normalize
    # Total = alpha * Tn-Score + beta * Tn-Tag
    #====================================================================

    for k, v in words.items():
        if k in tags:
            words[k] = alpha*v + beta*tags[k]
        else:
            words[k] = alpha*v

    if test:
        return sorted(words.items(), key=operator.itemgetter(1), reverse=True)

    return [x[0] for x in sorted(words.items(), key=operator.itemgetter(1), reverse=True)][:5]
