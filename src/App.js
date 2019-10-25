import React from 'react';
import './App.css';
import pacmanIcon from './pacman.png';

function PacMan() {
  return <span><img src={pacmanIcon} alt="pacman" width="20px"
                    height="20px"></img></span>;
}

function InitTable(props) {
  const width = props.width;
  const height = props.height;
  let pacman = props.pacman;
  let listItems = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (i === pacman.yLocation && j === pacman.xLocation) {
        listItems.push(<PacMan key={i + '-' + j}/>)
      } else {
        listItems.push(<span key={i + '-' + j}>*</span>)
      }
    }
    listItems.push(<br key={i}/>)
  }

  return (
    <div className="wrapper"> {listItems}</div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 20,
      height: 100,
      pacman: {
        xLocation: 0,
        yLocation: 0,
        totalFoods: 0
      }
    };

    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
  }


  componentWillUnmount() {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      if (this.state.pacman.yLocation > 0) {
        this.setState(prevState => ({
          pacman: {
            ...prevState.pacman,
            yLocation: prevState.pacman.yLocation - 1
          }
        }));
      }
      console.log('Up');
    } else if (e.keyCode === 40) {
      console.log('Down');

      if (this.state.pacman.yLocation < this.state.width - 1) {
        this.setState(prevState => ({
          pacman: {
            ...prevState.pacman,
            yLocation: prevState.pacman.yLocation + 1
          }
        }));
      }
    } else if (e.keyCode === 39) {
      console.log('Right');
      if (this.state.pacman.xLocation < this.state.height - 1) {
        this.setState(prevState => ({
          pacman: {
            ...prevState.pacman,
            xLocation: prevState.pacman.xLocation + 1
          }
        }));
      }
    } else if (e.keyCode === 37) {
      console.log('Left');

      if (this.state.pacman.xLocation > 0) {
        this.setState(prevState => ({
          pacman: {
            ...prevState.pacman,
            xLocation: prevState.pacman.xLocation - 1
          }
        }));
      }
    }
  };


  render() {

    return (
      <div>
        <InitTable width={this.state.width} height={this.state.height} pacman={this.state.pacman}/>
      </div>


    );
  }
}

export default App;
