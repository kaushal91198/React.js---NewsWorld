import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
// import data from '../sampleResponse.json'

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
    author: "Unknown Author",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    author: PropTypes.string,
    publishedAt: PropTypes.string,
  };

  // articles = data.articles
  constructor() {
    // When u write constructor u have to call constructor of super class
    super();
    this.state = {
      articles: [],
      loading: false, // for spinner to load data
      page: 1,
    };
  }
  updateNews =   async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=09246c0ca6e04a26839712f72c05e99e&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    
  }
  async componentDidMount() {
    // fetch(url).then(data=>{return data.json()}).then(data=>{
    //   console.log(data)
    // })
    this.updateNews()
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews()
  };

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews()
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsWorld - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row my-6">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  {/* TO reduce the characters in string we use slice function */}
                  <NewsItem
                    key={element.url}
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.content ? element.content.slice(0, 100) : null
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "http://www.cbc.ca/sports/baseball/mlb/mlb-1st-work-stoppage-since-1995-1.6270097"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source = {element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
