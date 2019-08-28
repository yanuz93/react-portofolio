import Header from "../../components/Header";
import Footer from "../../components/Footer";

import React from "react";
import axios from "axios";
import { actions } from "../../store";
import { connect } from "unistore/react";


class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      total_price: 0,
      full_name: "",
      handphone: "",
      address: "",
      province: "",
      district: "",
      city: "",
      postcode: "",
      note: ""
    };
  }


  setFullName = e => {
    this.setState({ full_name: e.target.value })
    console.log(e.target.value)
  }

  setHandphone = e => {
    this.setState({ handphone: e.target.value })
    console.log(e.target.value)
  }

  setAddress = e => {
    this.setState({ address: e.target.value })
    console.log(e.target.value)
  }

  setProvince = e => {
    this.setState({ province: e.target.value })
    console.log(e.target.value)
  }

  setCity = e => {
    this.setState({ city: e.target.value })
    console.log(e.target.value)
  }

  setDistrict = e => {
    this.setState({ district: e.target.value })
    console.log(e.target.value)
  }

  setZipCode = e => {
    this.setState({ postcode: e.target.value })
    console.log(e.target.value)
  }

  setNote = e => {
    this.setState({ note: e.target.value })
    console.log(e.target.value)
  }

  setUserOwnData = async e => {
    if (e.target.checked === true) {
      const self = this;
      //  Untuk mendapatkan details
      await axios
        .get(this.props.host + "user_details",
          {
            headers: {
              Authorization: "Bearer " + String(localStorage.getItem('user_token'))
            }
          })
        .then(response => {

          this.setState({
            full_name: response.data.full_name,
            handphone: response.data.phone,
            address: response.data.address,
            province: response.data.province,
            district: response.data.district,
            city: response.data.city,
            postcode: response.data.postcode
          })
        })
        .catch(error => {
          console.log(error);
        });

    } else {
      this.setState({
        full_name: "",
        handphone: "",
        address: "",
        province: "",
        district: "",
        city: "",
        postcode: ""
      })
    }
  }

  doComplete = async e => {
    await e.preventDefault();
    const self = this;
    await axios
      .post(this.props.host + "transaction",
        {
          full_name: self.state.full_name,
          address: self.state.address,
          handphone: self.state.handphone,
          province: self.state.province,
          city: self.state.city,
          district: self.state.district,
          postcode: self.state.postcode,
          note: self.state.note
        },
        {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem('user_token'))
          }
        })
      .then(response => {
        self.props.history.push('/invoice/' + String(response.data.transaction_id))
      })
      .catch(error => {
        console.log(error);
        alert("failed")
      });

  }



  componentDidMount = async () => {
    const self = this;
    // Untuk mendapatkan isi dari cart
    await axios
      .get(this.props.host + "order",
        {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem('user_token'))
          }
        })
      .then(response => {
        if (response.data.length == 0) {
          alert('Keranjang belanja anda masih kosong')
          self.props.history.push('/')
        }
        this.setState({ cart: response.data })
        response.data.map((item, index) => {
          self.setState(
            { total_price: self.state.total_price + item.price }
          )
        })
      })
      .catch(error => {
        console.log(error);
        alert("asu")
      });
  }


  render() {
    return (
      <div>
        <Header />
        <div style={{ minHeight: "100vh" }}>
          <div className="container">
            <div className="py-5 text-center">
              <h2>Checkout</h2>
            </div>

            <div className="row">
              <div className="col-md-12 order-md-1">
                <h4 className="mb-3">Informasi Alamat Pengiriman</h4>
                <form onSubmit={this.doComplete}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label for="fullName">Nama Lengkap</label>
                      <input type="text" className="form-control" id="fullName" placeholder="" value={this.state.full_name} onChange={this.setFullName} required="required" />
                      <div className="invalid-feedback">
                        Valid Nama Lengkap is required.
                    </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="handphone">No. Handphone</label>
                      <input type="text" className="form-control" id="handphone" placeholder="" value={this.state.handphone} onChange={this.setHandphone} required="required" />
                      <div className="invalid-feedback">
                        Valid No. Handphone is required.
                    </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label for="address">Alamat</label>
                      <textarea placeholder="Jln. RT/RW" className="form-control" id="address" row="5" value={this.state.address} onChange={this.setAddress} required="required" />
                      <div className="invalid-feedback">
                        Valid Address is required.
                    </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="province">Provinsi</label>
                      <input type="text" className="form-control" id="province" placeholder="" value={this.state.province} onChange={this.setProvince} required="required" />
                      <div className="invalid-feedback">
                        Valid Provinsi is required.
                    </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="city">Kota/Kabupaten</label>
                      <input type="text" className="form-control" id="city" Kota="" value={this.state.city} onChange={this.setCity} required="required" />
                      <div className="invalid-feedback">
                        Valid City is required.
                    </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="province">Kecamatan</label>
                      <input type="text" className="form-control" id="province" placeholder="" value={this.state.district} onChange={this.setDistrict} required="required" />
                      <div className="invalid-feedback">
                        Valid Provinsi is required.
                    </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="city">Kode Pos</label>
                      <input type="text" className="form-control" id="city" Kota="" value={this.state.postcode} onChange={this.setZipCode} required="required" />
                      <div className="invalid-feedback">
                        Valid City is required.
                    </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <input type="checkbox" name="" value="" onChange={this.setUserOwnData} /> Sesuaikan dengan data pribadi saya.
                  </div>
                    <div className="col-md-12 mb-3">
                      <label for="note">Catatan Pembelian</label>
                      <textarea placeholder="Beri catatan khusus untuk pesanan Anda" className="form-control" id="note" row="5" onChange={this.setNote} />
                      <div className="invalid-feedback">
                        Valid note is required.
                    </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <h4 className="mb-3">Informasi Pembelian</h4>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">No</th>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.cart.map((item, index) => {
                            return (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.product_name}</td>
                                <td>{item.qty}</td>
                                <td>{item.price}</td>
                              </tr>
                            )
                          })}
                          <tr>
                            <th colSpan="3" className="text-right">Total:</th>

                            <td>{this.state.total_price}</td>
                          </tr>
                        </tbody>
                      </table>

                      <button className=" btn-lg btn-primary btn-block" type="submit" value="Submit">
                        Lanjut Pembayaran
                    </button>

                    </div>
                  </div>
                </form>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect("host, phone_number, address, sex, name", actions)(Checkout);
