function getParams(url) {
    // 파라미터가 담길 배열
    let param = new Array();
    let params;
    // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
    params = url.substring( url.indexOf('#')+1, url.length );
    // 파라미터 구분자("&") 로 분리
    params = params.split("&");
    // params 배열을 다시 "=" 구분자로 분리하여 param 배열에 key = value 로 담는다.
    let size = params.length;
    let key, value;
    for(let i=0 ; i < size ; i++) {
    	key = params[i].split("=")[0];
    	value = params[i].split("=")[1];

    	param[key] = value;
    }
    return param;
}

function getIdToken(url){
	return getParams(url)["id_token"];
}

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		let loginSuccessURL = "https://fpsample.s3.ap-northeast-2.amazonaws.com/success.html#";

		//if contain login url
		if( details.url.search(loginSuccessURL) != -1){
			
			let token = getIdToken(details.url);

			chrome.storage.local.set({"token": token}, function() {
				chrome.storage.local.get(["token"], function(result) {
					console.log("token "+' currently is ' + result);
				});
			});

			alert(token);


			chrome.tabs.update(details.tabId, {url: "chrome://newtab"});
		}

	},
	{urls: ["<all_urls>"]});

