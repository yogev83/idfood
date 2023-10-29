import React, { useEffect, useState } from "react";
import { Caption1Stronger } from "@fluentui/react-components";

import "./alternatingText.css";

const LONG = 12000;
const SHORT = 1000;
const ANIMATION = 300;

const options = [
  "ג'חנון",
  "קוסקוס",
  "המבורגר",
  "בורקסים",
  "עוגת גבינה",
  "בייגל ירושלמי",
  "עראיס",
  "סושי",
  "פיצה",
  "סלט טונה",
];

export const AlternatingText: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    const changeText = () => {
      setIndex((prevIndex) => (prevIndex + 1) % options.length);
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, ANIMATION); // assuming the animation duration is 0.3s
    };

    changeText();
    let timeoutId: NodeJS.Timeout;
    const intervalId = setInterval(() => {
      changeText();
      timeoutId = setTimeout(changeText, SHORT);
    }, LONG);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={`alternating-text-conteiner ${animate ? "animate" : ""}`}>
      <Caption1Stronger className="alternating-text">
        {options[index]}
      </Caption1Stronger>
    </div>
  );
};
