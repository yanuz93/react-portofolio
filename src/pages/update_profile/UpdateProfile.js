import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect } from "react-router-dom";

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      address: "",
      sex: "male",
      phone_number: "",
      //   email: "",
      //   password: "",
      foto: "",
      postcode: ""
    };
  }

  setFullname = async event => {
    event.preventDefault();
    await this.setState({ full_name: event.target.value });
  };

  setAddress = async event => {
    event.preventDefault();
    await this.setState({ address: event.target.value });
  };

  setHandphone = async event => {
    event.preventDefault();
    await this.setState({ phone_number: event.target.value });
  };

  setSex = async event => {
    event.preventDefault();
    await this.setState({ sex: event.target.value });
  };

  setEmail = async event => {
    event.preventDefault();
    await this.setState({ email: event.target.value });
  };

  setPassword = async event => {
    event.preventDefault();
    await this.setState({ password: event.target.value });
  };

  setFoto = async event => {
    event.preventDefault();
    await this.setState({ foto: event.target.value });
  };

  setZipCode = async event => {
    event.preventDefault();
    await this.setState({ postcode: event.target.value });
  };

  doComplete = async e => {
    e.preventDefault();
    const self = this;
    axios
      .put(
        this.props.host+"customer",
        {
          name: self.state.full_name,
          address: self.state.address,
          email: self.state.email,
          sex: self.state.sex,
          phone_number: self.state.phone_number,
          password: self.state.password,
          url_foto: self.state.foto,
          postcode: self.state.postcode
        },
        {
          headers: {
            Authorization:
              "Bearer " + String(localStorage.getItem("user_token"))
          }
        }
      )
      .then(response => {
        alert("Terimakasih Telah Melengkapi Profil!");
        self.props.history.push("/");
      })
      .catch(error => {
        alert("Terjadi kesalahan!");
      });
    //   });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "100vh" }}>
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <form class="form-signin" onSubmit={e => this.doComplete(e)}>
                <br />
                <br />
                <br />
                {/* <img class="mb-4" src={blackLogo} alt="Ba-ik" /> */}
                <h1 class="h3 mb-3 font-weight-normal">Update Your Profile</h1>
                <label for="inputDistrict" class="sr-only">
                  Foto
                </label>
                <input
                  type="text"
                  id="inputDistrict"
                  class="form-control"
                  placeholder="Link foto"
                  onChange={event => this.setFoto(event)}
                  required="required"
                />
                <br />
                <label for="inputFullname" class="sr-only">
                  Fullname
                </label>
                <input
                  type="text"
                  id="inputFullname"
                  class="form-control"
                  placeholder="Nama Lengkap"
                  onChange={event => this.setFullname(event)}
                  required="required"
                />{" "}
                <br />
                <label for="inputEmail" class="sr-only">
                  Email
                </label>
                <input
                  type="text"
                  id="inputEmail"
                  class="form-control"
                  placeholder="Email"
                  onChange={event => this.setEmail(event)}
                  required="required"
                />
                <br />
                <label for="inputPassword" class="sr-only">
                  Password
                </label>
                <input
                  type="text"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Password"
                  onChange={event => this.setPassword(event)}
                  required="required"
                />
                <br />
                <label for="inputSex" class="sr-only">
                  Sex
                </label>
                <select
                  className="form-control"
                  id="gender"
                  onChange={event => this.setSex(event)}
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
                <br />
                <label for="inputHandphone" class="sr-only">
                  No. Handphone
                </label>
                <input
                  type="text"
                  id="inputHandphone"
                  class="form-control"
                  placeholder="No. Handphone"
                  onChange={event => this.setHandphone(event)}
                  required="required"
                />
                <br />
                <label for="inputAddress" class="sr-only">
                  Address
                </label>
                <textarea
                  placeholder="Jln. RT/RW"
                  class="form-control"
                  id="note"
                  row="5"
                  onChange={event => this.setAddress(event)}
                  required="required"
                />
                <br />
                <label for="inputZipCode" class="sr-only">
                  ZipCode
                </label>
                <input
                  type="text"
                  id="inputZipCode"
                  class="form-control"
                  placeholder="Kode Pos"
                  onChange={event => this.setZipCode(event)}
                  required="required"
                />
                <br />
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                  Update Now
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect("host",
  actions
)(UpdateProfile);
