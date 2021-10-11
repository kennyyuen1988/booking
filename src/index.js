import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

  return (
    <button className="square" onClick={ props.onClick }>
      {props.value}
    </button>
  );

}

function calWin(squares){
  const winPattern =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i=0; i<winPattern.length; i++){
    const [a,b,c] = winPattern[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
      return squares[a];
    }
  }

  if(!squares.includes(null)){
      return 'draw';
  }else{
    return null;
  }
  
}


class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={ ()=> this.props.onClick(i)}/>;
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state={
      history:[{
        squares : Array(9).fill(null),
      }],
      xIsNext:true,
    }
  }

  handleClick(i){
    const history = this.state.history;
    const current = history[history.length-1];
    const copySquares = current.squares.slice();
    if(calWin(copySquares) || copySquares[i]){
      return;
    }
    copySquares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({ 
      history: history.concat([{
        squares : copySquares,
      }]),
      xIsNext : !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length-1];
    const winner = calWin(current.squares);
    let status;
    if(winner && winner !== 'draw'){
      status = 'Winner: ' +winner;
    }else if (winner && winner === 'draw'){
      status = 'It is a ' + winner;
    }
    else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
