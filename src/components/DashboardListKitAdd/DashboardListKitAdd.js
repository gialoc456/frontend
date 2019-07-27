import React, { Component, Fragment } from 'react';
import "./DashboardListKitAdd.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { addKitRequest } from '../../actions';
const $ = window.$;
const options = [
    { value: "ExtractStep", label: "Ly Trích" },
    { value: "PCRStep", label: "PCR" },
    { value: "ElectrophoresisStep", label: "Điện di" },
    { value: "PurifyStep", label: "Tinh sạch" }
]

class DashboardListKitAdd extends Component {
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
        var kit = {
            Name: txtName,
            Category: slCategory.value
        }
        this.props.onAddKit(kit);
        history.push("/dashboard/kit");
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
                        <div className="card-title">Tạo Kit</div>
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
                            <NavLink to="/dashboard/kit" className="btn custom-button-2">
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
        onAddKit: kit =>{
            dispatch(addKitRequest(kit));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
) (DashboardListKitAdd);