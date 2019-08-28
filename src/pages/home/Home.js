import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import ItemHome from "../../components/ItemHome";
import axios from "axios";
import { actions } from "../../store";
import { connect } from "unistore/react";
// import { Link } from "react-router-dom";
import CategoryList from "../../components/CategoryList";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const self = this;
    await axios
      .get(this.props.host + "category")
      .then(function(response) {
        self.props.setCategory(response.data);
      })
      .catch(function(error) {});
    await axios
      .get(this.props.host + "product/list")
      .then(function(response) {
        self.props.setProduct(response.data);
      })
      .catch(function(error) {});
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "100vh" }}>
          <div className="row">
            <div className="col-lg-3 text-center">
              <img src="" height="50px" style={{ margin: "10px 0px" }} />
              <div className="list-group">
                <CategoryList />
              </div>
            </div>

            <div className="col-lg-9">
              <div
                id="carouselExampleIndicators"
                className="carousel slide my-4"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  />
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img
                      className="d-block img-fluid"
                      src="https://www.nationalgeographic.com/content/dam/environment/photos/future_of_food/organic_farming_rough/01_organic_farming_i8860_20181003_11260.adapt.1900.1.ImmersiveLeadHorizontal.jpg"
                      alt="First slide"
                      style={{ height: "350px", width: "900px" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="https://www.worldatlas.com/r/w728-h425-c728x425/upload/d7/3e/21/shutterstock-759949660.jpg"
                      alt="Second slide"
                      style={{ height: "350px", width: "900px" }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="https://www.goodnewsnetwork.org/wp-content/uploads/2019/08/Rooftop-Urban-Farm-in-Paris-2-Agripolis-Released.jpg"
                      alt="Third slide"
                      style={{ height: "350px", width: "900px" }}
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>

              <div className="row">
                {this.props.product.map((item, index) => {
                  return (
                    <ItemHome
                      img_src={item.url_foto}
                      img_name={item.name}
                      img_desc={item.description}
                      img_price={item.unit_price}
                      link={item.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  "host, category, product",
  actions
)(Home);
