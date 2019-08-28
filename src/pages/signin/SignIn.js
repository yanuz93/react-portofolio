import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect } from "react-router-dom";

class SignIn extends React.Component {
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
    axios
      .post(this.props.host+"customer/login", {
        email: self.state.email,
        password: self.state.password
      })
      .then(response => {
        localStorage.setItem("logged_in", true);
        localStorage.setItem("user_token", response.data.token);
        self.props.setLoggedIn({
          logged_in: localStorage.getItem("logged_in")
        });
        self.props.setUserToken({
          user_token: localStorage.getItem("user_token")
        });
        console.log("Selamat, Anda Berhasil Masuk!");
        self.props.history.push("/");
      })
      .catch(error => {
        alert("Salah Username atau Password! Coba Ulangi");
      });
  };

  render() {
    if (localStorage.getItem("logged_in") !== "true") {
      return (
        <div>
          <Header />
          <div className="container" style={{ minHeight: "100vh" }}>
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <form class="form-signin">

                  {/* <img class="mb-4" src={blackLogo} alt="Ba-ik" /> */}
                  <h1 class="mb-3 mt-5 font-weight-normal">Masuk</h1>
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
                  <button
                    class="btn btn-lg btn-secondary btn-block"
                    type="submit"
                    onClick={e => this.doLogin(e)}
                  >
                    Masuk
                  </button>
                  <p class="mt-5 mb-3 text-muted">© 2019</p>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      alert("Anda Sudah Login!");
      return <Redirect to="/" />;
    }
  }
}

export default connect("host",
  actions
)(SignIn);
