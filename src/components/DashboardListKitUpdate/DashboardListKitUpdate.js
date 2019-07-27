import React, { Component, Fragment } from 'react';
import "./DashboardListKitUpdate.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { updateKitRequest, getKitUpdateRequest } from '../../actions';
const $ = window.$;
const options = [
    { value: "ExtractStep", label: "Ly Trích" },
    { value: "PCRStep", label: "PCR" },
    { value: "ElectrophoresisStep", label: "Điện di" },
    { value: "PurifyStep", label: "Tinh sạch" }
]

class DashboardListKitUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: "",
            txtName: "",
            slCategory: null,
            isClearable: true,
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
        var { ID, txtName, slCategory } = this.state;
        e.preventDefault();
        var kit = {
            ID: ID,
            Name: txtName,
            Category: slCategory.value
        }
        this.props.onUpdateKit(kit);
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

        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditKit(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.kitUpdate) {
            var { kitUpdate } = nextProps;
            this.setState({
                ID: kitUpdate.ID,
                txtName: kitUpdate.Name,
                slCategory: kitUpdate.Category
            });
        }
    }

    getSelectedValue = () => {
        var { slCategory } = this.state;
        if (slCategory === "PCRStep") {
            this.setState({
                slCategory: { value: "PCRStep", label: "PCR" }
            });
        };
        if (slCategory === "ExtractStep") {
            this.setState({
                slCategory: { value: "ExtractStep", label: "Ly Trích" }
            });
        };
        if (slCategory === "ElectrophoresisStep") {
            this.setState({
                slCategory: { value: "ElectrophoresisStep", label: "Điện di" }
            });
        };
        if (slCategory === "PurifyStep") {
            this.setState({
                slCategory: { value: "PurifyStep", label: "Tinh sạch" }
            });
        };
    }

    render() {
        const { txtName, slCategory, isClearable } = this.state;
        {this.getSelectedValue()}
        return (
            <Fragment>
                <div className="card card-custom" style={{ marginTop: "100px" }}>
                    <div className="card-body">
                        <div className="card-title">Cập Nhật Kit</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <input
                                            value={txtName}
                                            type="text"
                                            className="form-control"
                                            name="txtName"
                                            //   pattern="[0-9][0-9]{3}"
                                            required
                                            onChange={this.onChange}
                                        />
                                        <span className="input-placeholder">Name</span>
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
                                Submit
                    </button>
                            <NavLink to="/dashboard/kit" className="btn custom-button-2">
                                Back
                    </NavLink>
                            <div />
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        kitUpdate: state.kit
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onEditKit: (id) => {
            dispatch(getKitUpdateRequest(id));
        },
        onUpdateKit: (kit) =>{
            dispatch(updateKitRequest(kit));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardListKitUpdate);