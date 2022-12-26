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
}

function App() {
  let dice: DiceInstance = new DiceInstance();
  let desc = 'Ro';
  return (
    <main>    
      <h1>Tenzies</h1>
      <div className='tenzies-describe'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
      <div className='dice-container'>
        <Dice instance={dice} />
      </div>
      <button className='tenzies-roll'>
        { `${desc}ll` }
      </button>
    </main>
  );
}

export default App;
