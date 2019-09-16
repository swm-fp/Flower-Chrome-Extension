import csv
from utils import keyword_extractor

with open('./list.csv', 'r', encoding='utf-8') as csvfile:
    r = csv.DictReader(csvfile)
    for l in r:
        result = {}
        result["title"], result["url"] = l["title"], l["url"]
        result["keywords"], result["result"] = keyword_extractor(l["title"], "")

        with open('./data.csv', 'a', encoding='utf-8') as csvfile:
            fieldnames = ['title', 'url', 'keywords', 'result']
            wr = csv.DictWriter(csvfile, fieldnames=fieldnames)
            #wr.writeheader()
            wr.writerow(result)