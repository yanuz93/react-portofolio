import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.phone_number = React.createRef();
    this.sex = React.createRef();
    this.address = React.createRef();
    this.url_foto = React.createRef();
  }

  handleSubmit = async event => {
    event.preventDefault();
    // GET TOKEN
    const req = {
      method: "post",
      url: this.props.host + "customer",
      data: {
        name: this.name.current.value,
        email: this.email.current.value,
        password: this.password.current.value,
        phone_number: this.phone_number.current.value,
        sex: this.sex.current.value,
        address: this.address.current.value,
        url_foto: this.url_foto.current.value
      }
    };
    const self = this;
    await axios(req)
      .then(function(response) {
        self.props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container mt-5">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
              <div className="card">
                <article className="card-body">
                  <h4 className="card-title text-center mb-4 mt-1">
                    Daftar Sebagai Costumer
                  </h4>
                  <hr />
                  <p className="text-success text-center">
                    Masukkan Data Diri Anda
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    {/* NAMA LENGKAP */}
                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        ref={this.name}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder=""
                        ref={this.email}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder=""
                        ref={this.password}
                        required
                      />
                    </div>

                    {/* Nomor Telephone */}
                    <div className="form-group">
                      <label>Nomor Telephone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        ref={this.phone_number}
                        required
                      />
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="form-group">
                      <label>Jenis Kelamin</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        ref={this.sex}
                        required
                      />
                    </div>

                    {/* Alamat */}
                    <div className="form-group">
                      <label>Alamat</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        ref={this.address}
                        required
                      />
                    </div>

                    {/* URL Foto */}
                    <div className="form-group">
                      <label>URL Foto</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        ref={this.url_foto}
                        //   required
                      />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        value="Submit"
                      >
                        {" "}
                        Daftar{" "}
                      </button>
                    </div>
                  </form>
                </article>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  //     } else {
  //       alert("Anda Sudah Login!");
  //       return <Redirect to="/" />;
  //     }
  //   }
}

export default connect("host",
  actions
)(SignUp);
