import css from "./LoadPRollsBtn.module.css";
import { PianoRollDisplay } from "../../js/pianoRollDisplay";

const onClick = async () => {
  const csvToSVG = new PianoRollDisplay();
  console.log(`--------piano.js------generating svg---`);
  await csvToSVG.generateSVGs();
};

export const LoadPRollsBtn = () => {
  return (
    <button id="loadCSV" type="button" className={css.loadPRollsBtn} onClick={onClick}>
      Load Piano Rolls!
    </button>
  );
};
