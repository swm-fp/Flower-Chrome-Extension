# Flower API

## createNodes( url , data )

### 설명

{userId} 유저의 {projectId} 프로젝트에 노드 리스트를 저장한다.

### params

#### url 
https://BaseUrl/users/{userId}/projects/{projectId}/nodes


#### data

구조 :
~~~

    [ {} , {} , ... ] 

~~~
예제 : 
~~~

    [
        {
            "nodeId" : "1",
            "parentId":"-1",
            "title":"cs231n",
            "url":"null",
            "isFolder":true,
            "children":["2","3"],
        },
        {
            "nodeId" : "2",
            "parentId":"1",
            "title":"hello world",
            "url":"https://www.naver.com",
            "children":[],
        },
        {
            "nodeId" : "3",
            "parentId":"1",
            "title":"hello fp",
            "url":"https://www.naver.com",
            "children":[],
        }
    ]


~~~











---
## readNodes

### 설명

{userId} 유저의 {projectId} 프로젝트 의 모든 노드들을 가져온다.



### params

#### url
https://BaseUrl/users/{userId}/projects/{projectId}/nodes


