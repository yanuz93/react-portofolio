import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect, Link } from "react-router-dom";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trx_details: [],
      status: []
    };
  }

  componentDidMount = async () => {
    const self = this;
    await axios
      .get(this.props.host + "order", {
        headers: {
          Authorization: "Bearer " + String(localStorage.getItem("user_token"))
        }
      })
      .then(response => {
        this.setState({ trx_details: response.data });
        response.data.map((item, index) => {
          if (item.status == "20") {
            var joined = this.state.status.concat("Sudah Dikirim");
            this.setState({ status: joined });
          } else if (item.status == "30") {
            var joined = this.state.status.concat("Sudah Sampai");
            this.setState({ status: joined });
          }
        });
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
                <br />
                <h3 class="h3 mb-3 font-weight-normal">Riwayat Transaksi</h3>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama Penerima</th>
                      <th scope="col">Total Harga</th>
                      <th scope="col">Status Pengiriman</th>
                      <th scope="col">Waktu Transaksi</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.trx_details.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>

                          <td>{item.full_name}</td>
                          <td>{item.total_price}</td>
                          <td>{this.state.status[index]}</td>
                          <td>{item.created_at.slice(0, 26)}</td>
                          <td>
                            <Link to={"/invoice/" + item.transaction_id}>
                              Lihat Invoice
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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

export default connect(
  "host",
  actions
)(History);
