import React from "react";
import { Link } from "react-router-dom";

class ItemHome extends React.Component {
  render() {
    return (
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="card h-100">
          <a href="#">
            {/* <img
              className="card-img-top"
              src="http://placehold.it/700x400"
              alt=""
            /> */}
            <img className="card-img-top" src={this.props.img_src} alt="" />
          </a>
          <div className="card-body">
            <h4 className="card-title">
              <Link to={"/product/" + String(this.props.link)}>
                {this.props.img_name}
              </Link>
            </h4>
            <h5>Rp. {this.props.img_price}</h5>
            <p className="card-text">{this.props.img_desc}</p>
          </div>
          {/* <div className="card-footer">
            <small className="text-muted">
              &#9733; &#9733; &#9733; &#9733; &#9733;
            </small>
          </div> */}
        </div>
      </div>
    );
  }
}

export default ItemHome;
