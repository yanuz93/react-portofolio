import Header from "../../components/Header";
import Footer from "../../components/Footer";


import React from "react";
import CarouselProductDetails from "../../components/CarouselProductDetails";
import axios from "axios";
import { actions } from "../../store";
import { connect } from "unistore/react";

class InvoiceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      total_price: 0,
      trx_info: []
    };
  }

  addToCart = async e => {
    e.preventDefault();
    const self = this;
    // this.setState({ cart: Number(this.state.cart) + Number(1) });
    // await this.props.tambahCart(this.state.cart);
    // console.log(self.state.cart)
    axios
      .post(this.props.host + "order", {
        product_id: self.state.id,
        qty: self.state.qty,
      }, {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem('user_token'))
          }
        })
      .then(response => {
        console.log(response.data)
        this.setState({ cart: Number(this.state.cart) + Number(1) });
        this.props.tambahCart(this.state.cart);
        alert("Barang yang anda pilih telah masuk keranjang!")
        self.props.history.push('/')
      })
      .catch(error => {
        alert('Terjadi kesalahan!')
      });

    // let cartDetail = {
    //   transaction_id: 0,
    //   product_id: this.state.id,
    //   product_name: this.state.name,
    //   qty: this.state.qty,
    //   total_price: this.state.subtotal_price,
    //   photo: this.state.photo
    // };
    // let cartList = this.state.cartList;
    // cartList.push(cartDetail);
    // this.setState({ cartList: cartList });
    // this.props.setCartList(cartList);
    // console.log(this.state.cart);
    // this.props.tambahCart(this.state.cart);
    // this.props.history.push("/shopping/cart");
  };

  setQty = async event => {
    event.preventDefault();
    await this.setState({ qty: Number(event.target.value) });
    await this.setState({ subtotal_price: this.state.price * this.state.qty });
    console.log(this.state.qty)
  };

  componentDidMount = async () => {
    const self = this;
    // Untuk mendapatkan isi dari cart
    await axios
      .get(`http://13.229.151.2/transaction_details/${self.props.match.params.trx_id}`,
        {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem('user_token'))
          }
        })
      .then(response => {
        this.setState({ cart: response.data })
        response.data.map((item, index) => {
          this.setState({ total_price: this.state.total_price + item.total_price })
        })

      })
      .catch(error => {
        console.log(error)
      });

    await axios
      .get('http://13.229.151.2/transaction',
        {
          headers: {
            Authorization: "Bearer " + String(localStorage.getItem('user_token'))
          }
        })
      .then(response => {
        response.data.map((item, index) => {
          if (item.transaction_id == this.props.match.params.trx_id) {
            this.setState({ trx_info: item })
          }
        })
      })
      .catch(error => {
        console.log(error)
      });


  }

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "100vh" }}>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <br />

              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Informasi Penerima</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <p>
                        Halo, <br />
                        Data pesanan produk yang telah kami terima adalah sebagai berikut : <br />
                        Tanggal Transaksi : {this.state.trx_info.created_at}
                      </p>

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
                                <td>{item.quantity}</td>
                                <td>{item.total_price}</td>
                              </tr>
                            )
                          })}
                          <tr>
                            <th colSpan="3" className="text-right">Total:</th>

                            <td>{this.state.total_price}</td>
                          </tr>
                        </tbody>
                      </table>

                    </th>
                  </tr>
                </tbody>
              </table>


              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Informasi Pengiriman</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">


                      <table className="table table-bordered">

                        <tbody>

                          <tr>
                            <th >Nama Penerima</th>
                            <td>{this.state.trx_info.full_name}</td>
                          </tr>
                          <tr>
                            <th >Alamat Penerima</th>
                            <td>{this.state.trx_info.address}, {this.state.trx_info.district}, {this.state.trx_info.city}, {this.state.trx_info.province}, {this.state.trx_info.postcode}</td>
                          </tr>
                          <tr>
                            <th >No Handphone Penerima</th>
                            <td>{this.state.trx_info.handphone}</td>
                          </tr>

                        </tbody>
                      </table>

                    </th>
                  </tr>
                </tbody>
              </table>


              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Informasi Pembayaran</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      Silahkan melakukan pembayaran via :
  
                    <table className="table table-bordered">

                        <tbody>

                          <tr>
                            <th >Nama Bank</th>
                            <td>Bank BCA (Kode Bank : 014)</td>
                          </tr>
                          <tr>
                            <th >No Rekening</th>
                            <td>123456789 a/n PT BAIK DOT COM </td>
                          </tr>
                          <tr>
                            <th >Jumlah Transfer</th>
                            <td> Rp {this.state.total_price}</td>
                          </tr>

                        </tbody>
                      </table>


                      Setelah melakukan pembayaran, mohon tunggu email konfirmasi dari kami. (Transaksi akan diproses dalam 1x24 Jam)
                  </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect("host, cart, cartList",
  actions
)(InvoiceDetails);
