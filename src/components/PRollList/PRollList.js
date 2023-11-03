import css from "./PRollList.module.css";
import { PianoRollMini } from "./PianoRollMini/PianoRollMini";
export const PRollList = ({ pRolls }) => {
  console.log(pRolls);
  return (
    <div id="pianoRollContainer">
      {pRolls.map(({ sequence, id }) => {
        const onClick = () => {};
        return (
          <PianoRollMini
            onClick={onClick}
            sequence={sequence}
            id={id}
            key={`roll${id}`}
          />
        );
      })}
    </div>
  );
};
