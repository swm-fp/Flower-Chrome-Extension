import csv
from utils import *

def compare_api():
    api_list = {1:'kkma', 2:'Twitter', 3:'Hannanum', 4:'Komoran', 5:'Mecab'}

    with open('./data.csv', 'w', encoding='utf-8') as csvfile:
        fieldnames = ['title', 'url', 'kkma', 'Twitter', 'Hannanum', 'Komoran', 'Mecab']
        wr = csv.DictWriter(csvfile, fieldnames=fieldnames)
        wr.writeheader()

        with open('./list.csv', 'r', encoding='utf-8') as csvfile:
            r = csv.DictReader(csvfile)
            for l in r:
                result = {}
                result["title"], result["url"] = l["title"], l["url"]
                result[api_list[1]], _ = api(1,l["title"])
                result[api_list[2]], _ = api(2,l["title"])
                result[api_list[3]], _ = api(3,l["title"])
                result[api_list[4]], _ = api(4,l["title"])
                result[api_list[5]], _ = api(5,l["title"])

                print(result," ......finished")
                wr.writerow(result)

def TF_test():

    with open('./words.csv', 'w', encoding='utf-8') as csvfile:
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
                result["total"] = Total_score(result["TF"], getTags(), alpha=1, beta=1)
                print(result," ......finished")
                wr.writerow(result)

if __name__ == '__main__':
    #ompare_api()
    TF_test()