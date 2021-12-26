import "./styles.css";

interface IButtonProps {
  text: string;
  onClickHandler: () => void;
}

function Button({ text, onClickHandler }: IButtonProps): JSX.Element {
  return <button onClick={onClickHandler}>{text}</button>;
}

export default Button;
