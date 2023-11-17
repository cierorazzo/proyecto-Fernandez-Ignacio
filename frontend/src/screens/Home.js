import React from "react";
import Header from "../components/Header";
import Body from "../components/Body";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/*Header */}
      <Header />

      {/*Body */}
      <Body />
    </div>
  );
}

export default Home;
