import React from 'react';
import './App.css';
import pacmanIcon from './pacman.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle} from '@fortawesome/free-solid-svg-icons'

function PacMan() {
  return <span><img src={pacmanIcon} alt="pacman" width="20px"
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
        listItems.push(<PacMan key={i + '-' + j}/>)
      } else {
        // let isFood = foodList.find(food => food.x === j && food.y === i);
        //Test
        let isFood = foodList.find(food => food.y === i);
        if (isFood) {
          listItems.push(<span className="block"><FontAwesomeIcon icon={faCircle} color="white"
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
        totalFoods: 0
      },
      foodList: [
        {
          x: 3,
          y: 4
        },
        {
          x: 1,
          y: 2
        }
      ]
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
        <InitTable width={this.state.width} height={this.state.height} pacman={this.state.pacman}
                   foodList={this.state.foodList}/>
      </div>


    );
  }
}

export default App;
