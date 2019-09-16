from urllib.request import urlopen
from bs4 import BeautifulSoup
from krwordrank.word import KRWordRank
import csv
from time import sleep

def spider(url):
    html = urlopen(url)
    #plain_text = source_code.text
    soup = BeautifulSoup(html, 'lxml')
    [x.extract() for x in soup.findAll('script')]
    soup = soup.body.extract()
    data = [x.extract().get_text() for x in soup.findAll('p')]
    return ''.join(data)

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
min_count = 5   # 단어의 최소 출현 빈도수 (그래프 생성 시)
max_length = 20 # 단어의 최대 길이
wordrank_extractor = KRWordRank(min_count, max_length)

beta = 0.85    # PageRank의 decaying factor beta
max_iter = 20
verbose = True

t = spider("https://webnautes.tistory.com/779")

print(t)
texts = [t]
keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter, verbose)

for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:30]:
        print('%8s:\t%.4f' % (word, r))

stopwords = {'영화', '관람객', '너무', '정말', '보고'}
passwords = {word:score for word, score in sorted(
    keywords.items(), key=lambda x:-x[1])[:300] if not (word in stopwords)}
'''