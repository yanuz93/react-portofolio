import HeaderSeller from "../../components_seller/HeaderSeller";
import FooterSeller from "../../components_seller/FooterSeller";


import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect, Link } from 'react-router-dom'

class SigninSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  setEmail = async event => {
    event.preventDefault();
    await this.setState({ email: event.target.value });
  };

  setPassword = async event => {
    event.preventDefault();
    await this.setState({ password: event.target.value });
  };

  doLogin = async e => {
    e.preventDefault();
    const self = this;
    await axios
      .post(this.props.host + "seller/login", {
        email: self.state.email,
        password: self.state.password
      })
      .then(response => {
        localStorage.setItem('seller_logged_in', true)
        localStorage.setItem('seller_token', response.data.token)
        console.log("Anda Berhasil Login!")
        window.location.reload()
      })
      .catch(error => {
        console.log(error);
        alert('Email atau password salah. Silakan masukkan kembali.')
      });
  };

  render() {
    if (localStorage.getItem('seller_logged_in') !== 'true') {
      return (
        <div>
          <HeaderSeller />

          <div className="container" style={{ minHeight: "100vh" }}>
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <form class="form-signin">
                  <h1 class="h3 mt-5 mb-3 font-weight-normal">Sign In</h1>
                  <label for="inputEmail" class="sr-only">
                    Email
                  </label>
                  <input
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Email"
                    onChange={event => this.setEmail(event)}
                  />
                  <br />
                  <label for="inputPassword" class="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    onChange={event => this.setPassword(event)}
                  />
                  <br />
                  <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={e => this.doLogin(e)}>
                    Sign in
                  </button>
                  <p class="mt-5 mb-3 text-muted">© 2019</p>
                </form>
              </div>
            </div>
          </div>
          <FooterSeller />
        </div>
      );
    } else {
      return (
        <div>
          <HeaderSeller />
          <div className="container" style={{ minHeight: "100vh" }}>
            <div className="row">
              <div className="col-12 text-center">
                <br />
                <h1>Selamat datang Mitra Agrary!</h1>
                <h6>Silakan pilih menu yang tersedia</h6>
                <Link to="/seller">
                  <button type="button" class="btn btn-primary btn-lg btn-block">Transaction</button>
                </Link>
                <Link to="/seller/product">
                  <button type="button" class="btn btn-success btn-lg btn-block">Product</button>
                </Link>

              </div>
            </div>
          </div>
          <FooterSeller />
        </div>
      )
    }

  }
}

export default connect("host", actions)(SigninSeller);
