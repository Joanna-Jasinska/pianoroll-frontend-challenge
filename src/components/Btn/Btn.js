import { PropTypes } from "prop-types";
import css from "./Btn.module.css";

export const Btn = ({ onClick, txt = "" }) => {
  return (
    <button id="loadCSV" type="button" className={css.Btn} onClick={onClick}>
      {txt}
    </button>
  );
};

Btn.propTypes = {
  onClick: PropTypes.func.isRequired,
  txt: PropTypes.string,
};
