import "./Dice.css";
import React from "react";

export interface IDice {
  getId(): number;
  getValue(): number;
  isSelected(): boolean;
}

interface Wrapper_{
  instance: IDice;
  setDice: (id: number, selected: boolean) => void;
}

// function Dice({ instance, setDice }: Wrapper_) {
//   let style = instance.isSelected() ? 'selected' : '';
//   return (
//     <div 
//       className={`dice ${style}`}
//       onClick={(event) => setDice(instance.getId(), !instance.isSelected())}
//     >
//       <p>{ instance.getValue() }</p>
//     </div>
//   );
// }

class Dice extends React.Component<Wrapper_> {
  constructor(props: Wrapper_) {
    super(props);
    this.state = {
      // all of your state
    };
    // setState({}) will need provide whole state even if you only want to update one state 
  }

  componentDidMount(): void {
    console.log('Dice mounted'); 
  }

  render() {
    let style = this.props.instance.isSelected() ? 'selected' : '';
    return (
      <div 
        className={`dice ${style}`}
        onClick={(event) => this.props.setDice(this.props.instance.getId(), !this.props.instance.isSelected())}
      >
        <p>{ this.props.instance.getValue() }</p>
      </div>
    );
  }
}

export default Dice;