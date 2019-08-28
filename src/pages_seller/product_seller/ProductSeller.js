import HeaderSeller from "../../components_seller/HeaderSeller";
import FooterSeller from "../../components_seller/FooterSeller";

import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";
import { Redirect } from "react-router-dom";

class ProductSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      name: null,
      stock: null,
      unit_price: null,
      url_foto: null,
      description: null,
      category_id: null
    };
  }
  setName = async event => {
    event.preventDefault();
    await this.setState({ product_name: event.target.value });
  };

  setDescription = async event => {
    event.preventDefault();
    await this.setState({ product_description: event.target.value });
  };

  setStock = async event => {
    event.preventDefault();
    await this.setState({ product_stock: event.target.value });
  };

  setWeight = async event => {
    event.preventDefault();
    await this.setState({ product_weight: event.target.value });
  };

  setPrice = async event => {
    event.preventDefault();
    await this.setState({ product_price: event.target.value });
  };

  setImageURL = async event => {
    event.preventDefault();
    await this.setState({ product_image_url: event.target.value });
  };

  setCategoryID = async event => {
    event.preventDefault();
    await this.setState({ category_id: event.target.value });
  };

  doSubmit = async e => {
    e.preventDefault();
    const self = this;
    await axios
      .post(
        this.props.host + "product",
        {
          name: self.state.name,
          description: self.state.description,
          stock: self.state.stock,
          url_foto: self.state.url_foto,
          unit_price: self.state.unit_price,
          category_id: self.state.category_id
        },
        {
          headers: {
            Authorization:
              "Bearer " + String(localStorage.getItem("seller_token"))
          }
        }
      )
      .then(response => {
        window.location.reload();
        console.log("BERHASIL");
      })
      .catch(error => {
        console.log(error);
        console.log("GAGAL");
      });
  };

  doEdit = async e => {
    e.preventDefault();
    const self = this;
    await axios
      .put(
        this.props.host + "product/" + String(e.target.value),
        {
          name: self.state.name,
          description: self.state.description,
          stock: self.state.stock,
          url_foto: self.state.url_foto,
          unit_price: self.state.unit_price,
          category_id: self.state.category_id
        },
        {
          headers: {
            Authorization:
              "Bearer " + String(localStorage.getItem("seller_token"))
          }
        }
      )
      .then(response => {
        window.location.reload();
        console.log("BERHASIL");
      })
      .catch(error => {
        console.log(error);
        console.log("GAGAL");
      });
  };

  doDelete = async e => {
    e.preventDefault();
    alert(e.target.value);
    console.log(e.target.value);
    const self = this;
    await axios
      .delete(this.props.host + "product/" + String(e.target.value), {
        headers: {
          Authorization:
            "Bearer " + String(localStorage.getItem("seller_token"))
        }
      })
      .then(response => {
        window.location.reload();
        console.log("BERHASIL");
      })
      .catch(error => {
        alert(e.target.value);
      });
  };

  componentDidMount = async () => {
    const self = this;
    await axios
      .get(this.props.host + "product/all", {
        headers: {
          Authorization:
            "Bearer " + String(localStorage.getItem("seller_token"))
        }
      })
      .then(response => {
        this.setState({ product: response.data });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (localStorage.getItem("seller_logged_in") == "true") {
      return (
        <div>
          <HeaderSeller />
          <div className="container" style={{ minHeight: "100vh" }}>
            <div className="row">
              <div className="col-12">
                <br />
                <h1 className="text-center"> Product Settings </h1>
                <h4>Form Product</h4>
                <form class="form-signin">
                  <label for="inputName" class="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="inputName"
                    class="form-control"
                    placeholder="Name"
                    onChange={event => this.setName(event)}
                  />
                  <br />
                  <label for="inputDescription" class="sr-only">
                    Description
                  </label>
                  <input
                    type="text"
                    id="inputDescription"
                    class="form-control"
                    placeholder="Description"
                    onChange={event => this.setDescription(event)}
                  />
                  <br />
                  <label for="inputStock" class="sr-only">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="inputStock"
                    class="form-control"
                    placeholder="Stock"
                    onChange={event => this.setStock(event)}
                  />
                  <br />
                  <label for="inputPrice" class="sr-only">
                    Price
                  </label>
                  <input
                    type="number"
                    id="inputPrice"
                    class="form-control"
                    placeholder="Price"
                    onChange={event => this.setPrice(event)}
                  />
                  <br />
                  <label for="inputImageURL" class="sr-only">
                    ImageURL
                  </label>
                  <input
                    type="text"
                    id="inputImageURL"
                    class="form-control"
                    placeholder="ImageURL"
                    onChange={event => this.setImageURL(event)}
                  />
                  <br />
                  <label for="inputCategoryID" class="sr-only">
                    CategoryID
                  </label>
                  <input
                    type="number"
                    id="inputCategoryID"
                    class="form-control"
                    placeholder="CategoryID"
                    onChange={event => this.setCategoryID(event)}
                  />
                  <br />

                  <button
                    class="btn btn-lg btn-primary btn-block"
                    type="submit"
                    onClick={e => this.doSubmit(e)}
                  >
                    Add
                  </button>
                </form>
                <br />
                <form>
                  <h4>List Category & Edit It</h4>
                  <div className="table-responsive">
                    <table class="table ">
                      <thead>
                        <tr>
                          <th scope="col">Product ID</th>
                          <th scope="col">Category ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Description</th>
                          <th scope="col">Stock</th>
                          <th scope="col">Price</th>
                          <th scope="col">Image URL</th>
                          <th scope="col">Created At</th>
                          <th scope="col">Updated At</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.product.map((item, index) => {
                          return (
                            <tr>
                              <td>{item.id}</td>
                              <td>{item.category_id}</td>
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td>{item.stock}</td>
                              <td>Rp. {item.unit_price}</td>
                              <td>
                                {item.image_url.slice(0, 20)}...(cut)
                              </td>
                              <td>{item.created_at.slice(0, 26)}</td>
                              <td>{item.updated_at.slice(0, 26)}</td>
                              <td>
                                <button
                                  value={item.product_id}
                                  class="btn btn-lg btn-primary btn-block"
                                  type="submit"
                                  onClick={e => this.doEdit(e)}
                                >
                                  Change
                                </button>
                              </td>
                              <td>
                                <button
                                  value={item.product_id}
                                  class="btn btn-lg btn-danger btn-block"
                                  type="submit"
                                  onClick={e => this.doDelete(e)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <FooterSeller />
        </div>
      );
    }
  }
}

export default connect(
  "host",
  actions
)(ProductSeller);
