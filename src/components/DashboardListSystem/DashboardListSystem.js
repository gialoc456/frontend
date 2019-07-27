import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./DashboardListSystem.css";
import "./../DashboardListSystemItem/DashboardListSystemItem";
import { searchSystemRequest,filterByNameSystem } from '../../actions';

class DashboardListSystem extends Component{
  constructor(props){
    super(props);
    this.state = {
      nameSystem: "",    
    };
  };

  onChange = e =>{
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilterByNameSystem({
      name: name === "nameSystem" ? value : this.state.nameSystem
    })
    this.setState({
      [name]: value
    });
  };

  // onSearch = () => {
  //   var { keyword } = this.state;
  //   this.props.onSearchSystems(keyword)
  // }
  
  render(){
        return(
            <Fragment>
            <div className="list-code-wrapper">
              <div className="breadcrumb-wrapper d-flex justify-content-start align-items-center mb-5">
                <div className="breadcrumb-header">
                  <h2>Danh Sách Hệ Thống</h2>
                </div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <NavLink to="/dashboard/system"><i className="fas fa-home" /></NavLink>
                    </li>
                    <li className="breadcrumb-item">
                      <NavLink to="/dashboard/system">Quản lý hệ thống</NavLink>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Danh sách hệ thống
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="list-code-option-bar-wrapper d-flex justify-content-between align-items-center">
                <div className="add-option">
                  <div className="btn-add-code">
                    <NavLink to="/dashboard/system/add">
                      <i className="fas fa-plus mr-2" />
                      Tạo mới hệ thống máy
                    </NavLink>
                  </div>
                </div>
    
                <div className="search-option">
                  <input
                    type="text"
                    name="nameSystem"
                    className="input-search"
                    onChange={this.onChange}
                    placeholder="Nhập tên hệ thống"
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
                        <th scope="col">Danh Mục</th>
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
    // onSearchSystems: keyword =>{
    //   dispatch(searchSystemRequest(keyword));
    // }
    onFilterByNameSystem: (dataName) => {
      dispatch(filterByNameSystem(dataName))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
) (DashboardListSystem);