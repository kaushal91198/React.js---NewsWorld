import React, { Component } from "react";
import { Link } from "react-router-dom";
//Replacement of class based component to function based components
// const Navbar = (props)=>{ }
//remove render for fun based components

export class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }

  handleSubmit = () => {
    this.props.search(this.state.value);
  };
  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              NewsWorld
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>

                {/* //business entertainment general health science sports technology */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/business">
                        Business
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/entertainment">
                        Entertainment
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/health">
                        Health
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/science">
                        Science
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/sports">
                        Sports
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="dropdown-item" to="/technology">
                        Technology
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.value}
                  onChange={this.handleOnChange}
                  required
                />
                <Link to="/search">
                  <button
                    className="btn btn-outline-success"
                    onClick={this.handleSubmit}
                  >
                    Search
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
