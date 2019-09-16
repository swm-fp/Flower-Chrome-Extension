
#===========================
# flask REST API code
#===========================
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
from flask import json
from flask import Response
import csv

from utils import keyword_extractor

app = Flask(__name__)
cors = CORS(app)

id = {"hello":"world"}

@app.route('/info/',methods=['POST', 'GET'])
def get():
    if request.method == 'POST':
        data = request.get_json(force=True)
        '''
        arrayList = 
        {
            title : ""
            url : ""
            memo : ["", "", ...]
            highlight : ["", "", ...]
        }
        '''
        result = {}
        result["title"] = data["title"]
        result["url"] = data["url"]
        result["keywords"], result["result"] = keyword_extractor(data["title"], "")

        res = json.dumps(result, ensure_ascii=False).encode('utf8')

        with open('./data.csv', 'a', encoding='utf-8') as csvfile:
            fieldnames = ['title', 'url', 'keywords', 'result']
            wr = csv.DictWriter(csvfile, fieldnames=fieldnames)
            wr.writeheader()
            #wr.writerow(result)

        return Response(res, content_type='application/json; charset=utf-8')

    if request.method == 'GET':
        return json.dumps(id)
        
    return "fail"

if __name__=='__main__':
	app.run(host='0.0.0.0',port=5002,debug=True)

