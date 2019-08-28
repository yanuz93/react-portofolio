import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import CartProductUnit from "../../components/CartProductUnit";
import CartFooter from "../../components/CartFooter";
import axios from "axios";
import { actions } from "../../store";
import { connect } from "unistore/react";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total_price: 0,
      cart_data: null
    };
  }

  componentDidMount = async () => {
    const self = this;
    await axios
      .get(this.props.host + "order?status=10", {
        headers: {
          Authorization: "Bearer " + String(localStorage.getItem("user_token"))
        }
      })
      .then(response => {
        self.setState({ cart_data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.cart_data != null) {
      console.log(this.state.cart_data);
      return (
        <div>
          <Header />
          <div className="container" style={{ minHeight: "100vh" }}>
            <h3 className="card-title mt-3">Keranjang Belanja</h3>
            {this.state.cart_data.rincian.map((item, index) => {
              return (
                <CartProductUnit
                  product_id={item.product_id}
                  price={item.price}
                  qty={item.qty}
                  name={item.product_name}
                  img_src={item.foto_product}
                />
              );
            })}
            <CartFooter total_price={this.state.cart_data.total_price} />
            <br />
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <div className="container" style={{ minHeight: "100vh" }}>
            {/* <br /> */}

            <h3 className="card-title mt-4">Keranjang Belanja</h3>
            {/* {this.state.cart_data.data.map((item, index) => {
            return (
              <CartProductUnit
                price={item.price}
                qty={item.qty}
                name={item.product_name}
                img_src={item.foto_product}
              />
            ); // onClick={item.cart_id} />
          })}
          <CartFooter total_price={this.state.cart_data.total_price} /> */}
            {/* <br /> */}
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default connect(
  "host, cart, cartList, cartTotalPrice, product",
  actions
)(Cart);
