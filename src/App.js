import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {

  // We can also  create a state outside a constructor
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  pageSize = 5;
  apikey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
          height={2}
        />
        <Router>
          <Navbar style={{position: "sticky"}}/>
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="" pageSize={this.pageSize} apikey={this.apikey} category={"general"} country={"in"} />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} apikey={this.apikey} category={"business"} country={"in"} />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} apikey={this.apikey} category={"entertainment"} country={"in"} />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} apikey={this.apikey} category={"general"} country={"in"} />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} apikey={this.apikey} category={"health"} />} country={"in"} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} apikey={this.apikey} category={"science"} country={"in"} />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} apikey={this.apikey} category={"sports"} />} country={"in"} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} apikey={this.apikey} category={"technology"} country={"in"} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}