import React, { Component, Fragment } from 'react';
import "./DashboardListOrganizationUpdate.css"
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { updateOrganizationRequest,getOrganizationUpdateRequest } from '../../actions';
const $ = window.$;


class DashboardListOrganizationUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: null,
            txtName: "",
            txtLocation: "",
            txtPhone:"",
            isClearable: true
        };
    };

    onChange = e => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    };

    componentWillReceiveProps(nextProps){
      console.log(nextProps);
      if(nextProps && nextProps.organizationbyid){
        var { organizationbyid } = nextProps;
        this.setState({
          ID: organizationbyid.ID,
          txtName: organizationbyid.Name,
          txtLocation: organizationbyid.Location,
          txtPhone: organizationbyid.PhoneNumber
        })
      };
    };

    onSubmit = e => {
        var { history } = this.props;
        var { ID, txtName, txtLocation, txtPhone } = this.state;
        e.preventDefault();
        var organization = {
            ID: ID,
            Name: txtName,
            Location: txtLocation,
            PhoneNumber: txtPhone
        }
        this.props.onUpdateOrganization(organization)
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
        var { match } = this.props;
        if(match){
          var id = match.params.id;
          this.props.onEditOrganization(id);
        }
    }

    render() {
        const { txtName, txtPhone, txtLocation } = this.state;
        return (
            <Fragment>
                <div className="card card-custom" style={{ marginTop: "100px" }}>
                    <div className="card-body">
                        <div className="card-title">Cập nhật cơ quan</div>
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
                                        <span className="input-placeholder">Tên</span>
                                    </div>
                                </div>
                                <div className="col-lg-6"></div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <input
                                            value={txtLocation}
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
                                            value={txtPhone}
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
                                Cập Nhật
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

const mapStateToProps = state =>{
  return{
    organizationbyid: state.organizationbyid
  };
};

const mapDispatchToProps = (dispatch, props) =>{
    return{
          onEditOrganization: (id) =>{
            dispatch(getOrganizationUpdateRequest(id));
          },
          onUpdateOrganization: (organization) =>{
            dispatch(updateOrganizationRequest(organization));
          }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardListOrganizationUpdate);