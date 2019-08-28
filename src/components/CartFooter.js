import React from "react";
import { Link } from "react-router-dom";

class CartFooter extends React.Component {
  constructor(props) {
    super(props)
  }

  goToCheckout = () => {
    if (this.props.total_price == 0) {
      alert()
    } else {
      this.props.history.push('/shopping/checkout')
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <br />
          <Link to="/">
            <button type="button" class="btn btn-outline-dark">
              Beli Lainnya
            </button>
          </Link>
        </div>

        <div className="col-md-9">
          <div className="row">
            <div class="col-sm-6 col-md-6 col-lg-6" />
            <div class="col-sm-6 col-md-6 col-lg-6 text-right">
              <br />
              <h6 style={{ textAlign: "right" }}>TOTAL: {this.props.total_price}</h6>
              <Link to="/shopping/checkout">
                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                  style={{ textSizeAdjust: "200px" }}

                >
                  Bayar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartFooter;
