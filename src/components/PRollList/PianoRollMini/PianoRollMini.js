import { useEffect, useState } from "react";
import css from "./PianoRollMini.module.css";
import PianoRoll from "../../../js/PianoRollClass";

export const PianoRollMini = ({ onClick, sequence, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const svg = document.querySelector(`.svg${id}`);
  let roll = { finished: false };

  useEffect(() => {
    if (svg && sequence) {
      // svg.innerHTML = "";
      // setIsLoading(true);
      roll = new PianoRoll({ svgElement: svg, sequence });
    }
  }, [sequence, svg, roll]);

  useEffect(() => {
    const svgContent = svg ? svg.innerHTML : false;
    if (isLoading && svgContent && roll.finished) setIsLoading(false);
  }, [svg, isLoading, roll]);

  return (
    <>
      <div
        className={`${css.pianoRollMini} ${isLoading ? css.loader : ""}`}
        onClick={onClick}
      >
        <div
          className={css.description}
        >{`This is a piano roll number ${id}`}</div>
        <svg
          className={`${css.pianoRollSvg} ${`svg${id}`} ${
            isLoading ? css.hidden : ""
          }`}
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
        ></svg>
      </div>
    </>
  );
};
