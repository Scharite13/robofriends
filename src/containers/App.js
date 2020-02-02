import React, { Component, Fragment } from "react";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


class App extends Component {
    constructor(){
        super()
        this.state = {
           robots: [],
           searchfield: '' 

        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>{
                return response.json();
        })
            .then(users =>{
                this.setState({robots: users})
         })
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})

    }
    
    render(){
        const { robots, searchfield } = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        if (!robots.length){
            return <h1>Loading</h1>
        }
        else {
            return (
                <Fragment>
                    <main className='tc'> 
                        <h1 className='f1'>RoboFriends</h1>
                        <SearchBox searchChange={this.onSearchChange}/>
                        <Scroll>
                            <ErrorBoundry>
                                <CardList robots={ filterRobots }/>
                            </ErrorBoundry> 
                        </Scroll>
                    </main>
                </Fragment>
            );
        }
    }   
}

export default App;
