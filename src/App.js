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
import { useState } from 'react';



const App = () => {

  const [progress, setProgress] = useState(0)

  let pageSize = 5;
  let apikey = process.env.REACT_APP_NEWS_API

    return (
      <div>
        <LoadingBar
          color='#f11946'
          progress={progress}
          height={2}
        />
        <Router>
          <Navbar style={{position: "sticky"}}/>
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} key="" pageSize={pageSize} apikey={apikey} category={"general"} country={"in"} />} />
            <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} apikey={apikey} category={"business"} country={"in"} />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} apikey={apikey} category={"entertainment"} country={"in"} />} />
            <Route exact path="/general" element={<News setProgress={setProgress} key="general" pageSize={pageSize} apikey={apikey} category={"general"} country={"in"} />} />
            <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} apikey={apikey} category={"health"} />} country={"in"} />
            <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} apikey={apikey} category={"science"} country={"in"} />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} apikey={apikey} category={"sports"} />} country={"in"} />
            <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} apikey={apikey} category={"technology"} country={"in"} />} />
          </Routes>
        </Router>
      </div>
    )
}



export default App