import React from "react";
import { Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";
import axios from "axios";

class HeaderSeller extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    // await this.props.setLoggedIn({ logged_in: localStorage.getItem('logged_in') })
    // await this.props.setUserToken({ user_token: localStorage.getItem('user_token') })
    const self = this;
    axios
      .get(this.props.host + "order", {
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
      .get(this.props.host + "product/all")
      .then(function(response) {
        self.props.setProduct(response.data);
      })
      .catch(function(error) {});
  };

  doLogOut = async e => {
    localStorage.setItem("seller_logged_in", "");
    localStorage.setItem("seller_token", "");
    alert("Anda Berhasil Log Out!");
  };

  render() {
    if (localStorage.getItem("seller_logged_in") == "true") {
      const self = this;
      axios
        .get(this.props.host + "order", {
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
          className="navbar navbar-expand-lg navbar-dark sticky-top"
          style={{ backgroundColor: "#15c6c0" }}
        >
          <div className="container">
            <Link to="/seller" className="navbar-brand text-white">
              <h3>Agrary Great</h3>
            </Link>
            <p
              className="h4 text-white"
              style={{ padding: "0px", margin: "0px" }}
            >
              Mitra
            </p>
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
                  <Link to="/seller" className="nav-link">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/seller/transaction" className="nav-link">
                    Transaction
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/seller/product" className="nav-link">
                    Product
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link
                    to="/seller"
                    className="nav-link"
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
          style={{ backgroundColor: "#15c6c0" }}
        >
          <div className="container">
            <Link to="/seller" className="navbar-brand">
              {/* <img src={logo} height="40px" /> */}
            </Link>
            <p
              className="h4 text-white"
              style={{ padding: "0px", margin: "0px" }}
            >
              for Seller
            </p>

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
                {/* <li className="nav-item active">
                                    <Link to="/signin" className="nav-link">
                                        Sign In
                      <span className="sr-only">(current)</span>
                                    </Link>
                                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }
}

export default connect(
  "logged_in, user_token, cart, cartTotalProduct",
  actions
)(HeaderSeller);
