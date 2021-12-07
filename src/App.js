import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      progress: 0,
    };
  }

  // apikey = process.env.NEWSWORLD_API_KEY;

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };


  search = async (search) => {
    await this.setState({ search: search.toLowerCase() });
    console.log(this.state.search)
  };
  async componentDidMount() {
    this.search(this.state.search)
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar search={this.search} />
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={5}
                  key="general"
                  country="in"
                  category='general'
                />
              }
            />
            {/* <Route exact path = '/about' element = {<News setProgress={this.setProgress} apiKey={this.apiKey}} pageSize={5} key= country="in" category="general" />}/> */}
            <Route
              exact
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={5}
                  key="business"
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={5}
                  key="entertainment"
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={5}
                  key="health"
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={5}
                  key="science"
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={5}
                  key="sports"
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={5}
                  key="technology"
                  country="in"
                  category="technology"
                />
              }
            />
             <Route
              exact
              path="/search"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={5}
                  country="in"
                  category={this.state.search}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
