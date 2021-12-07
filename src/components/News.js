import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import { useEffect } from "react";
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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // articles = data.articles
  constructor(props) {
    // When u write constructor u have to call constructor of super class
    super(props);
    this.state = {
      articles: [],
      loading: false, // for spinner to load data
      page: 1,
      totalResults: 0,
      success: true,
    };

    document.title = `NewsWorld - ${this.capitalizeFirstLetter(
      this.props.category?this.props.category:"General"
    )}`;
  }

  updateNews = async () => {
    this.props.setProgress(30);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0d5027e67c64e80acc766a983f25959&page=1&pageSize=${this.props.pageSize}`;
    console.log(url);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);

    if (!parsedData.articles.length) {
      this.setState({success:false})
      console.log("There are no result related to this");
      this.props.setProgress(100);
      return
    }
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      success:true
    });
    this.props.setProgress(100);
  };

  // in case of fun based components (39th 11.05) useEffect must be used.
  // useEffect(() => {
  //   updateNews()
  // }, []);

  async componentDidMount() {
    this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.updateNews();
    }
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=c0d5027e67c64e80acc766a983f25959&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      page: this.state.page + 1,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    // fetch(url).then(data=>{return data.json()}).then(data=>{
    //   console.log(data)
    // })
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  // handlePrevClick = async () => {
  //   this.setState({
  //     page: this.state.page - 1
  //   });
  //   this.updateNews()
  // };

  // handleNextClick = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews()
  // };

  render() {
    return (
      <div className="container my-3">
        {!this.state.success &&  <h3
          className="text-center"
          style={{ margin: "14px 0px", marginTop: "67px" }}
        >
         There are no result!
        </h3> }
       {this.state.success &&  !this.state.loading &&  <div>
        <h1
          className="text-center"
          style={{ margin: "14px 0px", marginTop: "67px" }}
        >
          NewsWorld - Top {this.capitalizeFirstLetter(this.props.category?this.props.category:"General")}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="row my-6">
            {
              /*!this.state.loading && */
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
                      source={element.source.name}
                    />
                  </div>
                );
              })
            }
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
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
        </div> */}
       </div>}
      </div>
    );
  }
}

export default News;
