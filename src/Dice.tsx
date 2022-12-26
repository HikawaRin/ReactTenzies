import "./Dice.css";

export interface IDice {
  getValue(): number;
}

interface Wrapper_{
  instance: IDice;
}

function Dice({ instance }: Wrapper_) {
  return (
    <div className='dice'>
      <p>{ instance.getValue() }</p>
    </div>
  );
}

export default Dice;