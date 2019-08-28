import HeaderSeller from "../../components_seller/HeaderSeller";
import FooterSeller from "../../components_seller/FooterSeller";
import React from "react";
import { connect } from "unistore/react";
import { actions } from "../../store";

class TransactionSeller extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (localStorage.getItem('seller_logged_in') == 'true') {
            return (
                <div>
                    <HeaderSeller />
                    <div className="container" style={{ minHeight: "100vh" }}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <br />
                                <h1> Transaction Settings </h1>

                            </div>
                        </div>
                    </div>
                    <FooterSeller />
                </div>
            )
        }

    }
}

export default connect("host", actions)(TransactionSeller);
