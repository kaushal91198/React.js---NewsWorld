import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Routes>
             {/* //business entertainment general health science sports technology */}

           <Route exact path = '/' element = {<News pageSize={5} key="general" country="in" category="general" />}/>
           {/* <Route exact path = '/about' element = {<News pageSize={5} key= country="in" category="general" />}/> */}
           <Route exact path = '/business' element = {<News pageSize={5} key="business" country="in" category="business" />}/>
           <Route exact path = '/entertainment' element = {<News pageSize={5} key="entertainment" country="in" category="entertainment"/>}/>
           <Route exact path = '/health' element = {<News pageSize={5} key="health" country="in" category="health" />}/>
           <Route exact path = '/science' element = {<News pageSize={5} key="science" country="in" category="science" />}/>
           <Route exact path = '/sports' element = {<News pageSize={5} key="sports" country="in" category="sports" />}/>
           <Route exact path = '/technology' element = {<News pageSize={5} key="technology" country="in" category="technology" />}/>

              
          </Routes>
            
        </div>
      </Router>
    );
  }
}
