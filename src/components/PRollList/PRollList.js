import { useNavigate } from "react-router";
import { PropTypes } from "prop-types";
import { PianoRollMini } from "./PianoRollMini/PianoRollMini";
import css from "./PRollList.module.css";

export const PRollList = ({ pRolls }) => {
  const navigate = useNavigate();

  const scroll = (id) => {
    return () => {
      const scrollTo =
        id || id === 0 ? document.querySelector(`#pianoRoll${id}`) : false;
      scrollTo.scrollIntoView();
    };
  };

  return (
    <div id="pianoRollContainer">
      <div className={css.grid}>
        {pRolls.map(({ sequence, id }) => {
          const selectPianoRoll = () => {
            navigate(`/${id}`);
            setTimeout(scroll(id), 100);
          };
          return (
            <PianoRollMini
              selectMyself={selectPianoRoll}
              sequence={sequence}
              id={id}
              key={`roll${id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

PRollList.propTypes = {
  pRolls: PropTypes.arrayOf(
    PropTypes.shape({
      sequence: PropTypes.arrayOf(
        PropTypes.shape({
          duration: PropTypes.number.isRequired,
          end: PropTypes.number.isRequired,
          pitch: PropTypes.number.isRequired,
          start: PropTypes.number.isRequired,
          velocity: PropTypes.number.isRequired,
        })
      ).isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
