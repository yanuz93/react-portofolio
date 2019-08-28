import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect, Link } from "react-router-dom";
import userProfileImage from "../../img/user_profile.png";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const self = this;
    // Untuk mendapatkan name
    await axios
      .get(this.props.host + "login", {
        headers: {
          Authorization: "Bearer " + String(localStorage.getItem("user_token"))
        }
      })
      .then(response => {
        self.props.setUsername(response.data.claims.name);
      })
      .catch(error => {
        console.log(error);
      });
    //  Untuk mendapatkan details
    await axios
      .get(this.props.host+"customer", {
        headers: {
          Authorization: "Bearer " + String(localStorage.getItem("user_token"))
        }
      })
      .then(response => {
        console.log(response.data);
        this.props.setUserFullName(response.data.name);
        this.props.setEmail(response.data.email);
        this.props.setFoto(response.data.url_foto);
        this.props.setUserAddress(response.data.address);
        this.props.setPhoneNumber(response.data.phone_number);
        if (response.data.sex == "male") {
          this.props.setSex("Laki-laki");
        } else {
          this.props.setSex("Perempuan");
        }
        this.props.setProvince(response.data.province);
        this.props.setCity(response.data.city);
        this.props.setPostcode(response.data.postcode);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (localStorage.getItem("logged_in") == "true") {
      return (
        <div>
          <Header />
          <div className="container" style={{ minHeight: "100vh" }}>
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <img src={this.props.foto} alt="" />
                <h3 className="card-title">{this.props.name}</h3>
                <p className="card-text">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Email</td>
                        <td>{this.props.email}</td>
                      </tr>
                      <tr>
                        <td>Nomor Telephone</td>
                        <td>{this.props.phone_number}</td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin</td>
                        <td>{this.props.sex}</td>
                      </tr>
                      <tr>
                        <td>Alamat</td>
                        <td>{this.props.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </p>{" "}
                <Link to="/profile/update">
                  <button className=" btn-lg btn-primary btn-block">
                    Update Informasi Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else {
      alert("Silakan Sign In Terlebih Dahulu!");
      return <Redirect to="/" />;
    }
  }
}

export default connect("host, name, address, sex, phone_number, name, province, city, email, postcode, foto",
  actions
)(SignUp);
