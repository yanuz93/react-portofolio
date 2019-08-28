import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { actions } from "../store";
import { connect } from "unistore/react";
import axios from "axios";
import React from "react";

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category
        };
    }

    clickHandle = async (event) => {
        event.preventDefault()
        await axios
            .get(this.props.host + "product/category/" + String(event.target.value))
            .then(async response => {

                this.props.setProduct(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    clickAllCategory = async (event) => {
        event.preventDefault()
        await axios
            .get(this.props.host + "product/all")
            .then(async response => {
                this.props.setProduct(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }



    render() {
        return (
            <div>
                <button style={{ width: "100%", color: "#0000EE" }} value="" onClick={e => this.clickAllCategory(e)} className="list-group-item">All Category</button>

                {this.props.category.map((item, index) => {
                    return <button style={{ width: "100%", color: "#0000EE" }} value={item.category_id} onClick={e => this.clickHandle(e)} className="list-group-item">{item.category_name}</button>;
                })}
            </div>
        );
    }
}

export default connect("host, product, category", actions)(withRouter(CategoryList));
