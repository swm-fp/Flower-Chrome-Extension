import boto3
from boto3.dynamodb.conditions import Key, Attr
from ast import literal_eval

from body import *
from getTagList import *
from nounExtractor import *
from preprocessing import *

# Create SQS client
sqs = boto3.client('sqs', region_name='ap-northeast-2')

queue_url = 'https://sqs.ap-northeast-2.amazonaws.com/616448378550/newQueue'
dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')
table = dynamodb.Table('UrlTag')

while 1:
    # Receive message from SQS queue
    response = sqs.receive_message(
        QueueUrl=queue_url,
        AttributeNames=[
            'SentTimestamp'
        ],
        MaxNumberOfMessages=1,
        MessageAttributeNames=[
            'All'
        ],
        VisibilityTimeout=0,
        WaitTimeSeconds=0
    )
    
    try:
        message = response['Messages'][0]
        receipt_handle = message['ReceiptHandle']
        body = literal_eval(message["Body"])

        url = body["url"]
        title = body["title"]

        title_nouns, body_nouns = nouns_extractor(title, url)
        TF = TF_score(title_nouns, body_nouns)
        tags = Total_score(TF, seletAllTagsFromDB(), alpha=1, beta=1, test=False)

        response = table.put_item(
            Item={
                    'url': url,
                    'tags': tags
                }
        )

        # Delete received message from queue
        sqs.delete_message(
            QueueUrl=queue_url,
            ReceiptHandle=receipt_handle
        )
        print('Received and deleted message: %s' % body["url"])
    except:
        pass
