import React, { Component } from "react";

export class NewsItem extends Component {
  // constructor(){
  //     // When u write constructor u have to call super class of constructor
  //     super();
  //     // Constructor will be called three times because three newsitems components is there.
  //     console.log("Hello i m constructor from news components")
  // }
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div className='d-flex flex-row-reverse position-absolute top-0 end-0 '>
            <span
              className= "badge rounded-pill bg-success"
              style={{ left: "90%", zIndex: "1" }}
            >
              {source}
            </span>
          </div>
          <img
            src={imageUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "10rem" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title ? title + "...." : " "}</h5>
            <p className="card-text" style={{ height: "5rem" }}>
              {description ? description.slice(0, 100) + "...." : " "}
            </p>
            <p className="card-text" style={{ height: "3rem" }}>
              <small className="text-muted">
                By {author ? author : "Unkonwon Author"} on{" "}
                {new Date(publishedAt).toGMTString()}
              </small>
            </p>
          </div>
          <div className="card-footer">
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-success btn-sm"
              rel="noreferrer"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
