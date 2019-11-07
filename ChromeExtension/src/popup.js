/* global chrome */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/popup.css";
import "./apis/FlowerAPI";

// const KeyCodes = {
//   comma: 188,
//   enter: 13
// };

// const delimiters = [KeyCodes.comma, KeyCodes.enter];

// function TagApp(props) {
//   const [tags, setStateTags] = useState([]);
//   const [suggestions, setStateSuggenstions] = useState();

//   useEffect(() =>
//     Tags().then(result =>
//       setStateTags({
//         result
//       })
//     )
//   );

//   const handleDelete = i => {
//     setStateTags({
//       tags: tags.filter((tag, index) => index !== i)
//     });
//   };

//   const handleAddition = tag => {
//     setStateTags([...tags, tag]);
//   };

//   const handleDrag = (tag, currPos, newPos) => {
//     const newTags = tags.slice();

//     newTags.splice(currPos, 1);
//     newTags.splice(newPos, 0, tag);

//     // re-render
//     setStateTags(newTags);
//   };

//   let Tags = async () => {
//     let title = await chrome.tabs.executeScript({
//       code: 'document.querySelector("title").innerText'
//     });

//     let url = await chrome.tabs.executeScript({
//       code: "document.URL"
//     });

//     let node = {
//       title: title[0],
//       url: url[0],
//       memo: undefined,
//       highlight: undefined
//     };

//     let data = await FlowerAPI.getTags(node);
//     let result = [];
//     for (let i = 0; i < data.length; i++) {
//       result.push({ id: data[i][0], text: data[i][0] });
//     }
//     return result;
//   };

//   return (
//     <div>
//       <ReactTags
//         inputFieldPosition="top"
//         tags={tags}
//         suggestions={suggestions}
//         handleDelete={handleDelete}
//         handleAddition={handleAddition}
//         handleDrag={handleDrag}
//         delimiters={delimiters}
//       />
//     </div>
//   );
// }

function Popup(props) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          <h3 className="modal_tags">Tags</h3>
        </Form.Label>

        <Form.Text className="text-muted">
          태그는 삭제 또는 추가할 수 있습니다.
        </Form.Text>
      </Form.Group>
      {/* <TagApp /> */}
    </Form>
  );
}

ReactDOM.render(<Popup />, document.getElementById("root"));
