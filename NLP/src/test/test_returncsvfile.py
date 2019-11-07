import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

import csv
from getTagList import *
from nounExtractor import *

def compare_api():
    api_list = {1:'kkma', 2:'Twitter', 3:'Hannanum', 4:'Komoran', 5:'Mecab'}

    with open('../../result/data.csv', 'w', encoding='utf-8') as csvfile:
        fieldnames = ['title', 'url', 'kkma', 'Twitter', 'Hannanum', 'Komoran', 'Mecab']
        wr = csv.DictWriter(csvfile, fieldnames=fieldnames)
        wr.writeheader()

        with open('./list.csv', 'r', encoding='utf-8') as csvfile:
            r = csv.DictReader(csvfile)
            for l in r:
                result = {}
                result["title"], result["url"] = l["title"], l["url"]
                result[api_list[1]], _ = nlp_apis(1,l["title"])
                result[api_list[2]], _ = nlp_apis(2,l["title"])
                result[api_list[3]], _ = nlp_apis(3,l["title"])
                result[api_list[4]], _ = nlp_apis(4,l["title"])
                result[api_list[5]], _ = nlp_apis(5,l["title"])

                print(result," ......finished")
                wr.writerow(result)

def TF_result():

    with open('../../result/words.csv', 'w', encoding='utf-8') as csvfile:
        fieldnames = ['title', 'url', 'TF', 'total']
        wr = csv.DictWriter(csvfile, fieldnames=fieldnames)
        wr.writeheader()

        with open('./list.csv', 'r', encoding='utf-8') as csvfile:
            r = csv.DictReader(csvfile)
            for l in r:
                result = {}
                result["title"], result["url"] = l["title"], l["url"]
                
                title_nouns, body_nouns = nouns_extractor(l["title"], l["url"])
                result["TF"] = TF_score(title_nouns, body_nouns)
                result["total"] = Total_score(result["TF"], seletAllTagsFromDB(), alpha=1, beta=1)
                print(result," ......finished")
                wr.writerow(result)

def dbconnection():
    print(seletAllTagsFromDB())

if __name__ == '__main__':
    #compare_api()
    TF_result()
    #dbconnection()