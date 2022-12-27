import Dice, { IDice } from './Dice';
import React  from 'react';
import Confetti from 'react-confetti';
import "./App.css";

class DiceInstance implements IDice { 
  private id_: number;
  private value_: number;
  private selected_: boolean;
  constructor(id: number) {
    this.id_ = id;
    this.value_ = 0;
    this.selected_ = false;
  }

  getId() { return this.id_; }
  getValue(): number { return this.value_; }
  isSelected(): boolean { return this.selected_; }
  touch(selected: boolean): void { this.selected_ = selected; } 

  roll(): void {
    this.value_ = Math.floor(Math.random() * 6) + 1;
  }
}

function App() {
  let dice_num: number = 10;
  
  const [dices, setDices] = React.useState<DiceInstance[]>(() => {
    let dices: DiceInstance[] = [];
    for (let i = 0; i < dice_num; i++) {
      dices.push(new DiceInstance(i));
      dices[i].roll();
    }
    return dices; 
  });
  const [round, setRound] = React.useState<number>(0);
  const [GameOver, setGameOver] = React.useState<boolean>(false);

  React.useEffect(() => {
    const allSelected = dices.every((dice) => dice.isSelected());
    const allSameValue = dices.every((dice) => dice.getValue() === dices[0].getValue());
    if (allSelected && allSameValue) {
      setGameOver(true);
    }
  }, [dices]);

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.text())
      .then((text) => {
        console.log('fetch data');
        setRound(text.length);
      });
  }, []);

  let SetDice = (id: number, selected: boolean) => {
    setDices((prevDices) => {
      return prevDices.map((dice) => {
        if (dice.getId() === id) {
          dice.touch(selected);
        }
        return dice;
      });
    });
  }

  let RollDice = () => {
    setDices((prevDices) => {
      return prevDices.map((dice) => {
        if (!dice.isSelected()) {
          dice.roll();
        }
        return dice;
      });
    });
  }

  let NewGame = () => {
    setDices((prevDices) => {
      return prevDices.map((dice) => {
        dice.touch(false);
        return dice;
      });
    });
    setRound(0);
    setGameOver(false);
  }

  return (
    <main>    
      { GameOver && <Confetti /> }
      <h1>Tenzies</h1>
      <div className='tenzies-describe'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</div>
      <div className='tenzies-describe'>{`You have rolled ${round} Round`}</div>
      <div className='dice-container'>
        {
          dices.map((dice, index) => {
            return (
              <Dice 
                key={index} 
                instance={dice} 
                setDice={SetDice} 
              />
            );
          })
        }
      </div>
      <button 
        className='tenzies-roll'
        onClick={(event) => { 
          setRound((prevRound) => prevRound + 1);
          if (GameOver) {
            NewGame();
          } 
          RollDice(); 
        }}
      >
        { GameOver ? 'New Game' : 'Roll' }
      </button>
    </main>
  );
}

export default App;
