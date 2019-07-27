import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./DashboardListLitigant.css"
import "./../DashboardListLitigantItem/DashboardListLitigantItem";
import { searchLitigantRequest,filterByNameLitigant } from '../../actions';

class DashboardListLitigant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameLitigant: "",
    };
  }

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilterByNameLitigant({
      name: name === "nameLitigant" ? value : this.state.nameLitigant
    })
    this.setState({
      [name]: value
    });
  }

  // onSearch = () => {
  //   var { keyword } = this.state;
  //   this.props.onSearchLititgant(keyword);
  // }


  render() {
    return (
      <Fragment>
        <div className="list-code-wrapper">
          <div className="breadcrumb-wrapper d-flex justify-content-start align-items-center mb-5">
            <div className="breadcrumb-header">
              <h2>Danh Sách Đương Sự</h2>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard/litigant"><i className="fas fa-home" /></NavLink>
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard/litigant">Quản lý đương sự</NavLink>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Danh sách đương sự
                    </li>
              </ol>
            </nav>
          </div>
          <div className="list-code-option-bar-wrapper d-flex justify-content-between align-items-center">
            <div className="add-option">
              <div className="btn-add-code">
                <NavLink to="/dashboard/litigant/add">
                  <i className="fas fa-plus mr-2" />
                  Tạo mới đương sự
                    </NavLink>
              </div>
            </div>

            <div className="search-option">
              <input
                type="text"
                name="nameLitigant"
                className="input-search"
                onChange={this.onChange}
                placeholder="Nhập tên đương sự"
              />
              <button type="button">
                <i className="fas fa-search"/>
              </button>
            </div>
          </div>
          <div className="list-code-content">
            <div className="table-responsive">
              <table className="table table-borderless table-custom">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Tên</th>
                    <th scope="col">Giới Tính</th>
                    <th scope="col">Ngày Sinh</th>
                    <th scope="col">Quê Quán</th>
                    <th scope="col">Quốc Tịch</th>
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


const mapDispatchToProps = (dispatch, props) => {
  return {
    // onSearchLititgant: keyword => {
    //   dispatch(searchLitigantRequest(keyword));
    // }
    onFilterByNameLitigant: (dataName) => {
      dispatch(filterByNameLitigant(dataName))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DashboardListLitigant);