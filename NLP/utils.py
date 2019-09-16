import operator, re
from konlpy.tag import Kkma, Twitter
from textblob import TextBlob

def compare_api(api_name, sen):
    module = None
    if api_name=='kkma':
        module = Kkma()
    elif api_name=='Twitter':
        module = Twitter()

    return module.pos(sen)

def posResult(sen): #단어 단위로 형태소 분석 후 반환
    kkma = Kkma()

    #print("nouns: ", kkma.nouns(sen))

    pos = kkma.pos(sen)
    morphs = [x[0] for x in pos] #형태소

    parse = sen.split(' ')
    result = []
    for p in parse:
        temp = []
        while True:
            try:
                target = morphs[0]
            except:
                break
            print(target)
            if target in p:
                temp.append(pos[0])
            elif morphs[0] not in sen:
                pass
            else:
                break
            pos = pos[1:]
            morphs = morphs[1:]
        result.append(temp)
    
    print(result)
    return result

def toWords(pos):
    for cur in pos:
        word_temp = ''
        for c in cur:
            if 'N' in c[0]:
                word_temp += c[0]
            pass


def keyword_extractor(title, highlight):
    konl = Kkma()
    eng_title = TextBlob(re.sub("[^A-Za-z]", ",", title.strip())).noun_phrases
    eng_highlight = TextBlob(re.sub("[^A-Za-z]", " ", highlight.strip())).noun_phrases
    title_nouns = konl.nouns(title)
    highlight_nouns = konl.nouns(highlight)

    #line = re.sub("[^A-Za-z]", "", title.strip())

    keyword_list = {i: 2 for i in title_nouns}
    for i in highlight_nouns:
        try:
            keyword_list[i] +=1
        except:
            keyword_list[i] = 1

    for i in eng_title:
        keyword_list[i] = 2

    for i in eng_highlight:
        try:
            keyword_list[i] +=1
        except:
            keyword_list[i] = 1

    keyword_list = sorted(keyword_list.items(), key=operator.itemgetter(1), reverse=True)
    
    keywords={}
    for i, k in enumerate(keyword_list):
        if not k[0].isdigit():
            keywords[str("k"+str(i))] = k[0]

    return keyword_list, posResult(title)

if __name__ == "__main__":
    while True:
        sent = input("문장입력>> ")
        posResult(sent)
        print()
    