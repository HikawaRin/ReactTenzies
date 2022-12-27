import "./Dice.css";

export interface IDice {
  getId(): number;
  getValue(): number;
  isSelected(): boolean;
}

interface Wrapper_{
  instance: IDice;
  setDice: (id: number, selected: boolean) => void;
}

function Dice({ instance, setDice }: Wrapper_) {
  let style = instance.isSelected() ? 'selected' : '';
  return (
    <div 
      className={`dice ${style}`}
      onClick={(event) => setDice(instance.getId(), !instance.isSelected())}
    >
      <p>{ instance.getValue() }</p>
    </div>
  );
}

export default Dice;