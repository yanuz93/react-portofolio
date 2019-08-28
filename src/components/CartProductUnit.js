import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { actions } from "../store";
import { connect } from "unistore/react";
import axios from "axios";
import React from "react";
import { async } from "q";

class CartProductUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total_price: 0,
      cart: this.props.cart
    };
  }

  clickDelete = async e => {
    e.preventDefault();
    const self = this;
    await axios
      .patch(
        self.props.host + "order/"+ self.props.product_id,
        {
          action: "delete"
        },
        {
          headers: {
            Authorization:
              "Bearer " + String(localStorage.getItem("user_token"))
          }
        }
      )
      .then(async response => {
        console.log(response.data);
        // alert("berhasil")
        await alert("Anda telah mengeluarkan 1 barang dari keranjang");
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
        alert("gagal!");
      });
  };

  render() {
    return (
      <div>
        <div className="card mt-5">
          <div className="row">
            <div className="col-md-3">
              <img width="95%" src={this.props.img_src} />
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-10">
                  <h4 className="card-title">{this.props.name}</h4>
                </div>
                <div className="col-2 text-center">
                  <Link
                    onClick={this.clickDelete}
                    className="fas fa-times text-danger"
                  ></Link>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6">
                  <table class="table table-hover clear-margin-bottom">
                    <tbody>
                      <tr>
                        <td> Harga Produk </td>
                        <td class="text-right">
                          <span class="price" data-role="item-price">
                            Rp{" "}
                            {Number(this.props.price) / Number(this.props.qty)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6">
                  <table class="table table-hover clear-margin-bottom">
                    <tbody>
                      <tr>
                        <td>
                          {" "}
                          Jumlah
                          <br />
                          Sub Total{" "}
                        </td>{" "}
                        <td class="text-right">
                          {" "}
                          {this.props.qty} <br />
                          <span
                            class="price"
                            data-price="390000"
                            data-role="item-price"
                          >
                            Rp {this.props.price}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6">
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    style={{ width: "170px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "host, cart",
  actions
)(withRouter(CartProductUnit));
