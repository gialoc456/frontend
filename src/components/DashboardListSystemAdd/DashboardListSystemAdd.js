import React, { Component, Fragment } from 'react';
import "./DashboardListSystemAdd.css"
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { addSystemRequest } from '../../actions';
const $ = window.$;
const options = [
    { value: "ExtractStep", label: "Ly trích" },
    { value: "PCRStep", label: "PCR" },
    { value: "ElectrophoresisStep", label: "Điện di" },
    { value: "PurifyStep", label: "Tinh sạch" }
];

class DashboardListSystemAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtName: "",
            slCategory: null,
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

    handleChangeSelect = (slCategory) => {
        this.setState({
            slCategory: slCategory
        });
    }

    onSubmit = e => {
        var { history } = this.props;
        var { txtName, slCategory } = this.state;
        e.preventDefault();
        var system = {
            Name: txtName,
            Category: slCategory.value
        }
        this.props.onAddSystem(system);
        history.push("/dashboard/system");
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
        const { slCategory, isClearable } = this.state;
        return (
            <Fragment>
                <div className="card card-custom" style={{ marginTop: "100px" }}>
                    <div className="card-body">
                        <div className="card-title">Tạo Hệ Thống</div>
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
                                        <Select
                                            value={slCategory}
                                            onChange={this.handleChangeSelect}
                                            name="slCategory"
                                            options={options}
                                            placeholder="Danh mục"
                                            isClearable={isClearable}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6"></div>
                            </div>

                            <button type="submit" className="btn custom-button-1 mr-3">
                                Tạo Mới
                    </button>
                            <NavLink to="/dashboard/system" className="btn custom-button-2">
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
        onAddSystem: system =>{
            dispatch(addSystemRequest(system));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(DashboardListSystemAdd);