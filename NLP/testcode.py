import csv
from utils import *

api_list = {1:'kkma', 2:'Twitter', 3:'Hannanum', 4:'Komoran'}

with open('./data.csv', 'w', encoding='utf-8') as csvfile:
    fieldnames = ['title', 'url', 'kkma', 'Twitter', 'Hannanum', 'Komoran']
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

            print(result," ......finished")
            wr.writerow(result)