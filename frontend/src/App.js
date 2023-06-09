import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [parent, setParent] = useState("");
  const [data, setData] = useState({
    path: "",
    files: [],
  });
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setParent("");
        },
        (error) => {}
      );
  }, []);

  const clickHendler = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/?path="+event.target.attributes.href.value)
      .then((res) => res.json())
      .then(
        (result) => {
          let linkArr = result.path.split("/");
          linkArr.pop();
          setParent(linkArr.join("/"));
          setData(result);
        },
        (error) => {}
      );
  };
  return (
    <div className="file-manager">
      <div>
        <a href={parent} onClick={clickHendler}>
          <span className="material-icons">&#xe5d8;</span>
          LEVEL UP
        </a>
      </div>

      <div className="current-level">
        current: {data.path === "" ? "/" : data.path}
      </div>

      <ul className="folder-list">
        {data.files.map((item) => {
          if (item.dir) {
            return (
              <li key={item.name} className="folder">
                <a href={data.path + "/" + item.name} onClick={clickHendler}>
                  <span className="material-icons">&#xe2c7;</span>
                  {item.name.toUpperCase()}
                </a>
              </li>
            );
          } else {
            return (
              <li key={item.name} className="file">
                <span className="material-icons">&#xe873;</span>
                {item.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default App;
