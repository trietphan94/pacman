import React from 'react';
import './App.css';
import pacmanIcon1 from './pacman1.png';
import pacmanIcon2 from './pacman2.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle} from '@fortawesome/free-solid-svg-icons'

function PacMan(props) {
  let status = props.status;
  console.log(status);
  return <span><img src={status ? pacmanIcon2 : pacmanIcon1} alt="pacman" width="20px"
                    height="20px" style={{margin: '0px 2.5px'}}></img></span>;
}

function InitTable(props) {
  const width = props.width;
  const height = props.height;
  const foodList = props.foodList;
  let pacman = props.pacman;
  let listItems = [];

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (i === pacman.yLocation && j === pacman.xLocation) {
        listItems.push(<PacMan key={i + '-' + j} status={pacman.status}/>)
      } else {
        let isFood = foodList.find(food => food.x === j && food.y === i);
        if (isFood) {
          listItems.push(<span className="block" key={i + '-' + j}><FontAwesomeIcon icon={faCircle} color="white"
                                                                                    className="food"/></span>)
        } else {
          listItems.push(<span key={i + '-' + j} className="block"></span>)
        }
      }
    }
    listItems.push(<div style={{clear: 'both'}} key={i}/>)
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
      height: 30,
      pacman: {
        xLocation: 0,
        yLocation: 0,
        totalFoods: 0,
        status: true,
      },
      foodList: []
    };

    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  componentDidMount() {
    for (let i = 0; i < this.state.width; i++) {
      for (let j = 0; j < this.state.height; j++) {
        this.setState(prevState => ({
          foodList: [...prevState.foodList, {
            x: j,
            y: i
          }]
        }))
      }
    }
    console.log(this.state);
    document.addEventListener("keydown", this._handleKeyDown);
  }

  validatePacman = (location, value) => {
    if (location === 'xLocation' && value <= this.state.height - 1 && value >= 0) {
      return true;
    } else if (location === 'yLocation' && value <= this.state.width - 1 && value >= 0) {
      return true;
    } else {
      return false;
    }
  };

  detectPacman = (location, value) => {
    let self = this;
    if (location) {
      if (this.validatePacman(location, value)) {
        this.setState(prevState => ({
          pacman: {
            ...prevState.pacman,
            [location]: value,
            status: !prevState.pacman.status
          }
        }));
      } else {
        clearInterval(this.timerID);
        this.timerID = setInterval(function () {
          self.detectPacman();
        }, 500)
      }
    } else {
      this.setState(prevState => ({
        pacman: {
          ...prevState.pacman,
          status: !prevState.pacman.status
        }
      }));
    }
  };

  _handleKeyDown = (e) => {
    let self = this;
    if (e.keyCode === 38) {
      clearInterval(this.timerID);
      this.timerID = setInterval(function () {
        self.detectPacman('yLocation', self.state.pacman.yLocation - 1)
      }, 500);
      console.log('Up');
    } else if (e.keyCode === 40) {
      console.log('Down');

      clearInterval(this.timerID);
      this.timerID = setInterval(function () {
        self.detectPacman('yLocation', self.state.pacman.yLocation + 1)
      }, 500)
    } else if (e.keyCode === 39) {
      console.log('Right');
      clearInterval(this.timerID);
      this.timerID = setInterval(function () {
        self.detectPacman('xLocation', self.state.pacman.xLocation + 1)
      }, 500)
    } else if (e.keyCode === 37) {
      console.log('Left');
      clearInterval(this.timerID);
      this.timerID = setInterval(function () {
        self.detectPacman('xLocation', self.state.pacman.xLocation - 1)
      }, 500)
    }
  };


  render() {

    return (
      <div>
        <InitTable width={this.state.width} height={this.state.height} pacman={this.state.pacman}
                   foodList={this.state.foodList}/>
      </div>


    );
  }
}

export default App;
