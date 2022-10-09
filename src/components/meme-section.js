import { useState, useEffect } from "react";
import $ from "jquery";

export default function Meme() {
  const [memesData, setMemesData] = useState();
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((api) => setMemesData(api.data.memes));
  }, []);
  function submit(e) {
    e.preventDefault();
    let randomNum = Math.floor(Math.random() * memesData.length);
    let upperLine = $("#firstLine").val();
    let lowerLine = $("#secondLine").val();
    let url = memesData[randomNum].url;
    setMeme((prev) => ({
      ...prev,
      topText: upperLine,
      bottomText: lowerLine,
      randomImage: url,
    }));
    $(document).ready(function () {
      $("#firstLine").val("");
      $("#secondLine").val("");
    });
  }

  return (
    <div className="sectionContent">
      <div className="memeSection">
        <form action="">
          <input type="text" placeholder="Top Text" id="firstLine" />
          <input type="text" placeholder="Bottom Text " id="secondLine" />
          <button className="btnSubmit" onClick={submit}>
            Get a new meme...
          </button>
        </form>
      </div>
      <div className="memeContainer">
        <h1>{meme.topText}</h1>
        <img src={meme.randomImage} alt="" />
        <h2>{meme.bottomText}</h2>
      </div>
    </div>
  );
}
