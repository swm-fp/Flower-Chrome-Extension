/* global chrome */
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "../css/memo.css";
import "../chrome-extension-async";
let x;
let y;


document.addEventListener("mousemove",function(event){
	x = event.layerX;
	y = event.layerY;
},false);


function dragElement(elmnt) {
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.getElementsByClassName("flower-memo-header")[0].onmousedown = dragMouseDown;
	
	
	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}
	
	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}
	
	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

export default class Memo extends Component {
	render() {
		
		return (
			<div className="flower-memo-wrapper">
				<div className="flower-memo-header"></div>
				<textarea className="flower-memo-text"></textarea>
			</div>
			);
		}
		componentDidMount(){
			dragElement(this.props.element);
			this.props.element.getElementsByClassName("flower-memo-text")[0].onkeydown = (e)=>{e.stopPropagation();}
			this.props.element.getElementsByClassName("flower-memo-text")[0].value = this.props.text;
			
		}
	}
	
	



function renderMemo(memoList = undefined){
	
	if( memoList == undefined){
		const memo = document.createElement('div');
		memo.classList.add("flower-memo");
		memo.style="left:"+x+"px;top:"+y+"px;"
		
		document.body.appendChild(memo);
		ReactDOM.render(<Memo element={memo}/>, memo);
	}
	else {
		for(let memo of memoList){

			const memoElement = document.createElement('div');
			memoElement.classList.add("flower-memo");
			memoElement.style="left:"+memo.position.left+";top:"+memo.position.top+";"
			document.body.appendChild(memoElement);
			ReactDOM.render(<Memo element={memoElement} text={memo.text}/>, memoElement);
		}
	}
	
}


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("catch message :" + request.message);
		if(request.message == "contextMenu"){
			renderMemo();
		}
		else if (request.message == "memoList"){
			console.log("in render");
			renderMemo(request.memoList);
		}
});
	

window.onbeforeunload = e=>{
	if( document.getElementsByClassName("flower-memo").length > 0   ){
		let memoList = [];

		let memoElements = document.getElementsByClassName("flower-memo");
		for(let memoElement of memoElements){

			let memoData = {
				"position" : {
					"left" : memoElement.style["left"], 
					"top" : memoElement.style["top"]
				},
				"text" : memoElement.querySelector("textarea").value
			}
			memoList.push(memoData);
		}

		chrome.runtime.sendMessage({ "memoList" : memoList });
	}
		
};
