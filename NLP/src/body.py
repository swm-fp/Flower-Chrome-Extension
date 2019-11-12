from urllib.request import urlopen
from bs4 import BeautifulSoup
#from krwordrank.word import KRWordRank
import csv
from time import sleep

def spider(url):
    try:
        html = urlopen(url)
        #plain_text = source_code.text
        soup = BeautifulSoup(html, 'lxml')
        [x.extract() for x in soup.findAll('script')]
        soup = soup.body.extract()
        data = [x.extract().get_text() for x in soup.findAll('p')]
        return ''.join(data)
    except Exception as ex:
        print("::CRAWLING ERROR::\n",ex)
        return ""

'''
urls = []
with open('./data.csv', 'r', encoding='utf-8') as csvfile:
    r = csv.DictReader(csvfile)
    for l in r:
        urls.append(l["url"])


print(urls, len(urls))

url = urls[50]
for idx, url in enumerate(urls):
    t = spider(url)
    print(t+"\n"+str(idx)+"/"+url)
    sleep(1)
'''

if __name__ == '__main__':
    print(spider('https://subinium.github.io/feature-selection/'))