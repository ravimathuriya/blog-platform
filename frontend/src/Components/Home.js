import React from "react";
import "./Css/Home.css";
import Card from "./Card";
import "./Css/Card.css";

function Home(props) {

  const {notify, updateToast} = props;

  return (
    <>
      <section className="light">
        <div className="container py-2">
          <div className="h1 text-center text-dark" id="pageHeaderTitle">
            Blogs
          </div>
          <Card notify={notify} updateToast={updateToast} />
        </div>
      </section>
    </>
  );
}

export default Home;
