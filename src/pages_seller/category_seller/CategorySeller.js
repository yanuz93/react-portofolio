import HeaderSeller from "../../components_seller/HeaderSeller";
import FooterSeller from "../../components_seller/FooterSeller";
import React from "react";
import axios from "axios";
import { connect } from "unistore/react";
import { actions } from "../../store";

class CategorySeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            name: "",
            description: ""
        }
    }
    setName = async event => {
        event.preventDefault();
        await this.setState({ name: event.target.value });
    };

    setDescription = async event => {
        event.preventDefault();
        await this.setState({ description: event.target.value });
    };

    doSubmit = async e => {
        e.preventDefault();
        const self = this;
        await axios
            .post(this.props.host + "category", {
                name: self.state.name,
                description: self.state.description
            },
                {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('seller_token'))
                    }
                })
            .then(response => {
                window.location.reload()
                console.log("BERHASIL")
            })
            .catch(error => {
                console.log(error);
                console.log("GAGAL")
            });
    };


    doEdit = async e => {
        e.preventDefault();
        console.log(e.target.value)
        const self = this;
        await axios
            .put(this.props.host + "category/" + String(e.target.value), {
                name: self.state.name,
                description: self.state.description
            },
                {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('seller_token'))
                    }
                })
            .then(response => {
                window.location.reload()
                console.log("BERHASIL")
            })
            .catch(error => {
                console.log(error);
                console.log("GAGAL")
            });
    };


    doDelete = async e => {
        e.preventDefault();
        console.log(e.target.value)
        const self = this;
        await axios
            .delete(this.props.host + "category/" + String(e.target.value),
                {
                    headers: {
                        Authorization: "Bearer " + String(localStorage.getItem('seller_token'))
                    }
                })
            .then(response => {
                window.location.reload()
                console.log("BERHASIL")
            })
            .catch(error => {
                alert("Tidak Dapat Dihapus, Karena Menjadi Foreign Key!")
            });
    };




    componentDidMount = async () => {
        const self = this;
        await axios
            .get(this.props.host + "category", {
                name: self.state.name,
                description: self.state.description
            })
            .then(response => {
                this.setState({ category: response.data })
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        if (localStorage.getItem('seller_logged_in') == 'true') {
            return (
                <div>
                    <HeaderSeller />
                    <div className="container" style={{ minHeight: "100vh" }}>
                        <div className="row">
                            <div className="col-12">
                                <br />
                                <h1 className="text-center"> Category Settings </h1>
                                <h4>Form Category</h4>
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
                                        type="Description"
                                        id="inputDescription"
                                        class="form-control"
                                        placeholder="Description"
                                        onChange={event => this.setDescription(event)}
                                    />
                                    <br />
                                    <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={e => this.doSubmit(e)}>
                                        Add
                  </button>

                                </form>
                                <br />
                                <form>
                                    <h4>List Category & Edit It</h4>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Set New Name</th>
                                                <th scope="col">Set New Description</th>
                                                <th scope="col">Edit</th>
                                                <th scope="col">Delete</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.category.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.category_id}</td>
                                                        <td>{item.category_name}</td>
                                                        <td>{item.category_description}</td>
                                                        <td><input
                                                            type="text"
                                                            id="inputName"
                                                            class="form-control"
                                                            placeholder="Name"
                                                            onChange={event => this.setName(event)} />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="Description"
                                                                id="inputDescription"
                                                                class="form-control"
                                                                placeholder="Description"
                                                                onChange={event => this.setDescription(event)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <button value={item.category_id} class="btn btn-lg btn-primary btn-block" type="submit" onClick={e => this.doEdit(e)}>
                                                                Change
                                                </button>

                                                        </td>
                                                        <td>
                                                            <button value={item.category_id} class="btn btn-lg btn-danger btn-block" type="submit" onClick={e => this.doDelete(e)}>
                                                                Delete
                                                </button> </td>
                                                    </tr>
                                                )
                                            })}


                                        </tbody>
                                    </table>
                                </form>

                            </div>
                        </div>
                    </div>
                    <FooterSeller />
                </div>
            )
        }

    }
}

export default connect("host", actions)(CategorySeller);
