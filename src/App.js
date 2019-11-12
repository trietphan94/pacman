import React from 'react';
import './App.css';
import pacmanIcon1 from './pacman1.png';
import pacmanIcon2 from './pacman2.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faSquare} from '@fortawesome/free-solid-svg-icons'

function PacMan(props) {
    let status = props.status;
    return <span><img src={status ? pacmanIcon2 : pacmanIcon1} alt="pacman" width="20px"
                      height="20px" style={{margin: '0px 2.5px'}}></img></span>;
}

function InitTable(props) {
    let listItems = props.listItems;
    return (
        <div className="wrapper"> {listItems}</div>
    );
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            width: 20,
            height: 30,
            pacman: {
                xLocation: 0,
                yLocation: 0,
                totalFoods: 0,
                status: true,
            },
            foodList: [],
            wallList: [
                {x: 2, y: 0},
                {x: 2, y: 1},
                {x: 2, y: 2},
                {x: 2, y: 3},
                {x: 2, y: 4},
                {x: 2, y: 5},
            ]
        };

        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    componentDidMount() {
        const foodList = [];

        for (let i = 0; i < this.state.width; i++) {
            for (let j = 0; j < this.state.height; j++) {
                if (i !== this.state.pacman.yLocation || j !== this.state.pacman.xLocation) {
                    foodList.push({
                        x: j,
                        y: i
                    });
                }
            }
        }

        this.renderMap(foodList);
        document.addEventListener("keydown", this._handleKeyDown);
    }

    renderMap = (foodListParams) => {
        const width = this.state.width;
        const height = this.state.height;
        const foodList = foodListParams || this.state.foodList;
        const wallList = this.state.wallList;
        const pacman = this.state.pacman;
        const listItems = [];

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (i === pacman.yLocation && j === pacman.xLocation) {
                    listItems.push(<PacMan key={i + '-' + j} status={pacman.status}/>)
                } else {
                    let isWall = wallList.find(wall => wall.x === j && wall.y === i);
                    if (isWall) {
                        listItems.push(<span className="block" key={i + '-' + j}><FontAwesomeIcon icon={faSquare}
                                                                                                  color="red"
                                                                                                  className="wall"/></span>)
                    } else {
                        let isFood = foodList.find(food => food.x === j && food.y === i);
                        if (isFood) {
                            listItems.push(<span className="block" key={i + '-' + j}><FontAwesomeIcon icon={faCircle}
                                                                                                      color="white"
                                                                                                      className="food"/></span>)
                        } else {
                            listItems.push(<span key={i + '-' + j} className="block"></span>)
                        }
                    }

                }
            }
            listItems.push(<div style={{clear: 'both'}} key={i}/>)
        }

        this.setState({
            listItems: [...listItems],
            foodList: [...foodList]
        });
    };

    validatePacman = (location, value) => {
        let isWall = this.state.wallList.find(wall => wall.x === value.xLocation && wall.y === value.yLocation);
        if (isWall) return false;
        if (location === 'xLocation' && (value.xLocation <= this.state.height - 1 && value.xLocation >= 0)) return true;
        if (location === 'yLocation' && (value.yLocation <= this.state.width - 1 && value.yLocation >= 0)) return true;
        return false;
    };

    detectPacman = (location, value) => {
        let self = this;
        let foodList = this.state.foodList;
        if (location) {
            if (this.validatePacman(location, value)) {
                let isFood = this.state.foodList.find(food => food.x === value.xLocation && food.y === value.yLocation);
                if (isFood) {
                    foodList = this.state.foodList.filter(food => food.x !== value.xLocation || food.y !== value.yLocation);
                    this.setState(prevState => ({
                        pacman: {
                            ...prevState.pacman,
                            [location]: value[location],
                            totalFoods: prevState.pacman.totalFoods + 1,
                            status: !prevState.pacman.status
                        }
                    }));
                } else {
                    this.setState(prevState => ({
                        pacman: {
                            ...prevState.pacman,
                            [location]: value[location],
                            status: !prevState.pacman.status
                        }
                    }));
                }

            } else {
                clearInterval(this.timerID);
                this.timerID = setInterval(function () {
                    self.detectPacman();
                }, 200)
            }
        } else {
            this.setState(prevState => ({
                pacman: {
                    ...prevState.pacman,
                    status: !prevState.pacman.status
                }
            }));
        }

        this.renderMap(foodList);
    };

    _handleKeyDown = (e) => {
        let self = this;
        if (e.keyCode === 38) {
            clearInterval(this.timerID);
            this.timerID = setInterval(function () {
                self.detectPacman('yLocation', {
                    yLocation: self.state.pacman.yLocation - 1,
                    xLocation: self.state.pacman.xLocation
                })
            }, 200);
            console.log('Up');
        } else if (e.keyCode === 40) {
            console.log('Down');

            clearInterval(this.timerID);
            this.timerID = setInterval(function () {
                self.detectPacman('yLocation', {
                    yLocation: self.state.pacman.yLocation + 1,
                    xLocation: self.state.pacman.xLocation
                })
            }, 200)
        } else if (e.keyCode === 39) {
            console.log('Right');
            clearInterval(this.timerID);
            this.timerID = setInterval(function () {
                self.detectPacman('xLocation', {
                    yLocation: self.state.pacman.yLocation,
                    xLocation: self.state.pacman.xLocation + 1
                })
            }, 200)
        } else if (e.keyCode === 37) {
            console.log('Left');
            clearInterval(this.timerID);
            this.timerID = setInterval(function () {
                self.detectPacman('xLocation', {
                    yLocation: self.state.pacman.yLocation,
                    xLocation: self.state.pacman.xLocation - 1
                })
            }, 200)
        }
    };


    render() {

        return (
            <div>
                <InitTable listItems={this.state.listItems}/>
            </div>


        );
    }
}

export default App;
