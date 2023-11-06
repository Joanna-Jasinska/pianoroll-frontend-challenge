import { PropTypes } from "prop-types";
import css from "./LoadPRollsBtn.module.css";

export const LoadPRollsBtn = ({ onClick }) => {
  return (
    <button
      id="loadCSV"
      type="button"
      className={css.loadPRollsBtn}
      onClick={onClick}
    >
      Load Piano Rolls!
    </button>
  );
};

LoadPRollsBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
