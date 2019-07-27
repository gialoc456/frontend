import React, { Component, Fragment } from 'react';
import "./DashboardListOrganizationAdd.css"
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { addOrganizationRequest } from '../../actions';
const $ = window.$;


class DashboardListOrganizationAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtName: "",
            txtLocation: "",
            txtPhone:"",
            isClearable: true
        }
    }

    onChange = e => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }



    onSubmit = e => {
        var { history } = this.props;
        var { txtName, txtLocation, txtPhone } = this.state;
        e.preventDefault();
        var organization = {
            Name: txtName,
            Location: txtLocation,
            PhoneNumber: txtPhone
        }
        console.log(organization)
        this.props.onAddOrganization(organization);
        history.push("/dashboard/organization");
    }

    componentDidMount() {
        $(".form-control").each(function () {
            $(this).on("keyup", function () {
                if (
                    $(this)
                        .val()
                        .trim() !== ""
                ) {
                    $(this).addClass("has-val");
                    $(this)
                        .next("span")
                        .css({ visibility: "hidden", opacity: "0" });
                } else {
                    $(this).removeClass("has-val");
                    $(this)
                        .next("span")
                        .css({ visibility: "visible", opacity: "1" });
                }
            });
        });
    }

    render() {
        
        return (
            <Fragment>
                <div className="card card-custom" style={{ marginTop: "100px" }}>
                    <div className="card-body">
                        <div className="card-title">Tạo cơ quan</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="txtName"
                                            //   pattern="[0-9][0-9]{3}"
                                            required
                                            onChange={this.onChange}
                                        />
                                        <span className="input-placeholder">Tên</span>
                                    </div>
                                </div>
                                <div className="col-lg-6"></div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="txtLocation"
                                            //   pattern="[0-9][0-9]{3}"
                                            required
                                            onChange={this.onChange}
                                        />
                                        <span className="input-placeholder">Địa chỉ</span>
                                    </div>
                                </div>
                                <div className="col-lg-6"></div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="txtPhone"
                                            //   pattern="[0-9][0-9]{3}"
                                            required
                                            onChange={this.onChange}
                                        />
                                        <span className="input-placeholder">Số điện thoại</span>
                                    </div>
                                </div>
                                <div className="col-lg-6"></div>
                                
                            </div>

                            <button type="submit" className="btn custom-button-1 mr-3">
                                Tạo Mới
                    </button>
                            <NavLink to="/dashboard/organization" className="btn custom-button-2">
                                Quay Về
                    </NavLink>
                            <div />

                        </form>

                    </div>
                </div>
            </Fragment>
        );
    }

}
const mapDispatchToProps = (dispatch, props) =>{
    return{
        onAddOrganization: organization =>{
            dispatch(addOrganizationRequest(organization));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(DashboardListOrganizationAdd);