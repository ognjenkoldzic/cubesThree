import React from "react";
import CubesTest from "./CubeTest";
import "./App.scss";

function App() {
  let styles = {
    width: "100%",
    height: "80%",
    margin: "0",
    padding: "0",
    background: "#f1f4f8",
    // position: "fixed",
  };
  function Header() {
    return <h2>Hier gehts Zurück</h2>;
  }
  return (
    <div>
      <Header />

      <CubesTest style={styles} />
      <Header />
    </div>
  );
}

export default App;
