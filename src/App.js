import React, { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Search from "./components/Search";

function App() {
  const [woeid, setWoeid] = useState(null);
  return (
    <div className="app">
      <Main woeid={woeid} setWoeid={setWoeid} />
      <Search setWoeid={setWoeid} />
    </div>
  );
}

export default App;
