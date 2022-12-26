import Dice, { IDice } from './Dice';
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
  let dices: DiceInstance[] = [];
  for (let i = 0; i < dice_num; i++) {
    dices.push(new DiceInstance());
  }
  
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
          for (let i = 0; i < dice_num; i++) {
            dices[i].roll();
            console.log(dices[i].getValue());
          }
        }}
      >
        Roll
      </button>
    </main>
  );
}

export default App;
