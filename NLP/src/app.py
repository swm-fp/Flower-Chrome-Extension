
#===========================
# flask REST API code
#===========================
from flask import Flask
from flask_cors import CORS
from flask import request
from flask import json
from flask import Response
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

from body import *
from getTagList import *
from nounExtractor import *
from preprocessing import *

sentry_sdk.init(
    dsn="https://3748dcc21dcc4661b7157e902f07998b@sentry.io/1810010",
    integrations=[FlaskIntegration()]
)

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
        }
        '''
        result = {}
        title = data["title"]
        url = data["url"]
        
        title_nouns, body_nouns = nouns_extractor(title, url, nlpapi_num=3)
        TF = TF_score(title_nouns, body_nouns)
        tags = Total_score(TF, seletAllTagsFromDB(), alpha=1, beta=1, test=False)

        result["version"] = "1.0"
        result["tags"] = tags

        res = json.dumps(result, ensure_ascii=False).encode('utf8')
        print(res)

        return Response(res, content_type='application/json; charset=utf-8')

    if request.method == 'GET':
        return json.dumps(id)
        
    return "fail"

if __name__=='__main__':
	app.run(host='0.0.0.0',port=5002,debug=True)

