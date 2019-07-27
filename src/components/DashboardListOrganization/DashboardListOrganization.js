import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./DashboardListOrganization.css";
import "./../DashboardListOrganizationItem/DashboardListOrganizationItem";
import DashboardListOrganizationItem from './../DashboardListOrganizationItem/DashboardListOrganizationItem';
import { searchOrganizationRequest,filterByNameOrganization } from '../../actions';

class DashboardListOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOrga: "",
    };
  };

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilterByNameOrganization({
      name: name === "nameOrga" ? value : this.state.nameOrga 
    })
    this.setState({
      [name]: value
    });
  };

  // onSearch = () => {
  //   var { keyword } = this.state;
  //   this.props.onSearchOrganization(keyword);
  // }


  render() {
    return (
      <Fragment>
        <div className="list-code-wrapper">
          <div className="breadcrumb-wrapper d-flex justify-content-start align-items-center mb-5">
            <div className="breadcrumb-header">
              <h2>Danh Sách Cơ Quan</h2>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard/organization"><i className="fas fa-home" /></NavLink>
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard/organization">Quản lý cơ quan</NavLink>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Danh sách cơ quan
                    </li>
              </ol>
            </nav>
          </div>
          <div className="list-code-option-bar-wrapper d-flex justify-content-between align-items-center">
            <div className="add-option">
              <div className="btn-add-code">
                <NavLink to="/dashboard/organization/add">
                  <i className="fas fa-plus mr-2" />
                  Tạo mới cơ quan
                    </NavLink>
              </div>
            </div>

            <div className="search-option">
              <input
                type="text"
                name="nameOrga"
                className="input-search"
                onChange={this.onChange}
                placeholder="Nhập tên cơ quan"
              />
              <button type="button">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>

          <div className="list-code-content">
            <div className="table-responsive">
              <table className="table table-borderless table-custom">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Tên</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.children}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, props) =>{
  return {
    // onSearchOrganization: keyword =>{
    //   dispatch(searchOrganizationRequest(keyword));
    // },
    onFilterByNameOrganization: (dataName) => {
      dispatch(filterByNameOrganization(dataName))
    }
   }
}


export default connect(
  null,
  mapDispatchToProps
) (DashboardListOrganization);