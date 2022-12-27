import Dice, { IDice } from './Dice';
import React  from 'react';
import "./App.css";

class DiceInstance implements IDice { 
  private value_: number;
  constructor() {
    this.value_ = 0;
  }

  getValue(): number {
    return this.value_;
  }

  roll(): void {
    this.value_ = Math.floor(Math.random() * 6) + 1;
  }
}

function App() {
  let dice_num: number = 10;
  let dices_: DiceInstance[] = [];
  for (let i = 0; i < dice_num; i++) {
    dices_.push(new DiceInstance());
  }
  const [dices, setDices] 
    = React.useState<DiceInstance[]>(dices_);
  
  return (
    <main>    
      <h1>Tenzies</h1>
      <div className='tenzies-describe'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
      <div className='dice-container'>
        {
          dices.map((dice, index) => {
            return (
              <Dice key={index} instance={dice} />
            );
          })
        }
      </div>
      <button 
        className='tenzies-roll'
        onClick={() => {
          setDices((prevDices) => {
            prevDices.forEach((dice) => {
              dice.roll();
              console.log(dice.getValue());
            });
            return [...prevDices];
          })
        }}
      >
        Roll
      </button>
    </main>
  );
}

export default App;
