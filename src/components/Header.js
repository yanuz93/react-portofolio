import React from "react";
import { Link } from "react-router-dom";
import cart from "../img/cart.png";
import { connect } from "unistore/react";
import { actions } from "../store";
import axios from "axios";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    await this.props.setLoggedIn({
      logged_in: localStorage.getItem("logged_in")
    });
    await this.props.setUserToken({
      user_token: localStorage.getItem("user_token")
    });
    const self = this;
    axios
      .get(this.props.host + "order?status=10", {
        headers: {
          Authorization: "Bearer " + String(localStorage.getItem("user_token"))
        }
      })
      .then(response => {
        self.props.setCartTotalProduct(response.data.length);
      })
      .catch(error => {
        console.log(error);
      });

    await axios
      .get(this.props.host + "product")
      .then(function(response) {
        self.props.setProduct(response.data);
      })
      .catch(function(error) {});
  };

  doLogOut = async e => {
    localStorage.setItem("logged_in", "");
    localStorage.setItem("user_token", "");
    this.props.setLoggedIn({ logged_in: "" });
    this.props.setUserToken({ user_token: "" });
    alert("Anda Berhasil Log Out!");
  };

  render() {
    if (localStorage.getItem("logged_in") == "true") {
      const self = this;
      axios
        .get(this.props.host + "order?status=10", {
          headers: {
            Authorization:
              "Bearer " + String(localStorage.getItem("user_token"))
          }
        })
        .then(response => {
          self.props.setCartTotalProduct(response.data.length);
        })
        .catch(error => {
          console.log(error);
        });

      return (
        <nav
          className="navbar navbar-expand-lg navbar-light sticky-top"
          style={{ backgroundColor: "#32cb00" }}
        >
          <div className="container">
            <Link to="/" className="navbar-brand">
              <h3>Agrary Great</h3>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link to="/profile" className="text-white nav-link">
                    Profile
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/shopping/cart" className="nav-link">
                    <img
                      src={cart}
                      height="23px"
                      style={{
                        filter: "grayscale(100%)",
                        WebkitFilter: "invert(100%)"
                      }}
                    />
                    ({this.props.cartTotalProduct})
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/history" className="text-white nav-link">
                    History
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link
                    to="/"
                    className="nav-link text-white"
                    onClick={e => this.doLogOut(e)}
                  >
                    Log Out
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav
          className="navbar navbar-expand-lg navbar-dark sticky-top"
          style={{ backgroundColor: "#1daa47" }}
        >
          <div className="container">
            <Link to="/" className="navbar-brand">
              <h3 className="text-white">Agrary Great</h3>
            </Link>
            <div className="navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link to="/signup" className="nav-link">
                    Daftar
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/signin" className="nav-link">
                    Masuk
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }
}

export default connect(
  "host, logged_in, user_token, cart",
  actions
)(Header);
