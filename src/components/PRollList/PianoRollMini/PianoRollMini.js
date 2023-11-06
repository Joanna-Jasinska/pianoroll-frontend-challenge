import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import css from "./PianoRollMini.module.css";
import PianoRoll from "../../../js/pianoRoll";
import { useParams } from "react-router";
import { PIANO_ROLL_LENGTH } from "../../../data/predefined";

export const PianoRollMini = ({ selectMyself, sequence, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { rollId } = useParams();
  const selected = id == rollId;
  const [editingStart, setEditingStart] = useState(selected);
  const [editingEnd, setEditingEnd] = useState(selected);
  let markerStart = document.querySelector(`#markerStart${id}`);
  let markerEnd = document.querySelector(`#markerEnd${id}`);

  const toggleEditingStart = () => {
    setEditingStart(!editingStart);
  };
  const toggleEditingEnd = () => {
    setEditingEnd(!editingEnd);
  };
  const followMouse = ({ editStart, editEnd }) => {
    return (e) => {
      const svg = document.querySelector(`.svg${id}`) || false;
      if (!svg || (!editStart && !editEnd)) return;
      const square = svg.getBoundingClientRect();
      const squareX = square.x;
      const squareWidth = square.width;
      const mouseX = e.clientX - 2;

      const margin = 20;
      const stepWidth = squareWidth / PIANO_ROLL_LENGTH;
      const steps = Math.floor(
        (Math.max(mouseX - squareX, 0) * PIANO_ROLL_LENGTH) / squareWidth
      );
      const calculatedX = steps * stepWidth + margin;
      if (editStart) {
        markerStart.innerHTML = `${steps}`;
        markerStart.style.left = calculatedX - 1 + "px";
        markerStart.style.transition = "0s";
      }
      if (editEnd) {
        markerEnd.innerHTML = `${steps}`;
        markerEnd.style.left = calculatedX - 1 + "px";
        markerEnd.style.transition = "0s";
      }
    };
  };

  useEffect(() => {
    if (selected) {
      setEditingStart(true);
      setEditingEnd(true);
    }
  }, [selected]);

  useEffect(() => {
    const svg = document.querySelector(`.svg${id}`);
    if (svg && sequence) {
      svg.innerHTML = "";
      new PianoRoll({ svgElement: svg, sequence });
    }
  }, [sequence, id]);

  useEffect(() => {
    const svg = document.querySelector(`.svg${id}`);
    const svgContent = svg ? svg.innerHTML : false;
    if (isLoading && svgContent) setIsLoading(false);
  }, [isLoading, sequence, id]);

  return (
    <>
      <div
        id={`pianoRoll${id}`}
        className={`${css.pianoRollMini} ${css.cell} ${
          isLoading ? css.loader : ""
        } ${selected ? css.selected : ""}`}
        onClick={selected ? () => {} : selectMyself}
      >
        <div
          className={
            selected && !isLoading
              ? `${css.marker} ${css.markerStart} ${
                  editingStart ? css.onTop : ""
                }`
              : `${css.hidden}`
          }
          id={`markerStart${id}`}
          onClick={selected ? toggleEditingStart : () => {}}
          onMouseMove={
            selected
              ? followMouse({
                  editStart: editingStart,
                  editEnd: editingStart ? false : editingEnd,
                })
              : () => {}
          }
        />
        <div
          className={
            selected && !isLoading
              ? `${css.marker} ${css.markerEnd}`
              : `${css.hidden}`
          }
          id={`markerEnd${id}`}
          onClick={selected ? toggleEditingEnd : () => {}}
          onMouseMove={
            selected
              ? followMouse({
                  editStart: editingStart,
                  editEnd: editingStart ? false : editingEnd,
                })
              : () => {}
          }
        />

        <div className={css.description}>{`Piano roll nr ${id}`}</div>
        <svg
          className={`${css.pianoRollSvg} ${`svg${id}`}`}
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          onMouseMove={
            selected
              ? followMouse({
                  editStart: editingStart,
                  editEnd: editingStart ? false : editingEnd,
                })
              : () => {}
          }
        ></svg>
      </div>
    </>
  );
};

PianoRollMini.propTypes = {
  selectMyself: PropTypes.func.isRequired,
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
};
