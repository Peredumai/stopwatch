import Button from "../../elements/Button";
import timeToString from "../../helpers/timeToStringFunc";
import "./styles.css";

interface IViewerProps {
  time: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  wait: () => void;
}

function Viewer({ time, start, stop, reset, wait }: IViewerProps) {
  return (
    <div className="wrapper">
      <div className="time">{timeToString(time)}</div>
      <div>
        <Button text="start" onClickHandler={start} />
        <Button text="stop" onClickHandler={stop} />
        <Button text="reset" onClickHandler={reset} />
        <Button text="wait" onClickHandler={wait} />
      </div>
    </div>
  );
}

export default Viewer;
