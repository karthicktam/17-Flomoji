import React, { useState, useEffect } from "react";
import "./styles.css";

const totalMemojis = 15;
let current = 1;

export default function App() {
  const [image, setImage] = useState(
    "https://www.florin-pop.com/images/memoji-1.png"
  );
  const [bgArr, setBg] = useState([]);

  const getMemojiUrl = (currentId) =>
    `https://www.florin-pop.com/images/memoji-${currentId}.png`;

  const getRandomNumber = () =>
    Math.random() < 0.4 ? "0" : Math.random() < 0.66 ? "1" : " ";

  const changeMemoji = () => {
    current = current + 1;

    if (current > totalMemojis) {
      current = 1;
    }

    let newImage = getMemojiUrl(current);
    setImage(newImage);
  };

  const changeNumbers = () => {
    setBg(
      bgArr.map((bg) => {
        bg.color = Math.random() < 0.2 ? "#ff4757" : "#2f3542";
        bg.innerTxt = getRandomNumber();
        return bg;
      })
    );
  };

  useEffect(() => {
    const changeBgNumbers = () => {
      const size = 30;
      const row = Math.ceil(window.innerWidth / size);
      const col = Math.ceil(window.innerHeight / size);

      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          setBg((state) => [
            ...state,
            {
              left: `${i * size}px`,
              top: `${j * size}px`,
              color: Math.random() < 0.2 ? "#ff4757" : "#2f3542",
              innerTxt: getRandomNumber()
            }
          ]);
        }
      }
    };

    changeBgNumbers();
  }, []);

  useEffect(() => {
    let intervalM = setInterval(changeMemoji, 100);
    return () => clearInterval(intervalM);
  });

  useEffect(() => {
    let intervalN = setInterval(changeNumbers, 100);
    return () => clearInterval(intervalN);
  });

  return (
    <div className="app">
      <img src={image} alt="memoji" className="memoji" />
      <h1 className="title">Inspired by Floring Pop</h1>
      <a className="link" href="https://florin-pop.com">
        www.florin-pop.com
      </a>
      {bgArr.map((bg, idx) => (
        <div
          key={idx}
          className="num"
          style={{
            left: bg.left,
            top: bg.top,
            color: bg.color
          }}
        >
          <span>{bg.innerTxt}</span>
        </div>
      ))}
    </div>
  );
}
