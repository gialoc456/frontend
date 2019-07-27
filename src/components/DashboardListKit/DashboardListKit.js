import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./DashboardListKit.css";
import { searchKitRequest,filterByNameKit } from '../../actions';

class DashboardListKit extends Component{
    constructor(props){
        super(props);
        this.state = {
          nameKit: "",    
        };
    };

    onChange = e =>{
      var target = e.target;
      var name = target.name;
      var value = target.value;
      this.props.onFilterByNameKit({
        name: name === "nameKit" ? value : this.state.nameKit
      })
      this.setState({
        [name]: value
      });
    };

    // onSearch = () =>{
    //   var { keyword } = this.state;
    //   this.props.onSearchKit(keyword);
    // }

    render(){
        return(
            <Fragment>
            <div className="list-code-wrapper">
              <div className="breadcrumb-wrapper d-flex justify-content-start align-items-center mb-5">
                <div className="breadcrumb-header">
                  <h2>Danh Sách Kit</h2>
                </div>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <NavLink to="/dashboard/kit"><i className="fas fa-home" /></NavLink>
                    </li>
                    <li className="breadcrumb-item">
                      <NavLink to="/dashboard/kit">Quản Lý Kit</NavLink>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Danh sách kit
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="list-code-option-bar-wrapper d-flex justify-content-between align-items-center">
                <div className="add-option">
                  <div className="btn-add-code">
                    <NavLink to="/dashboard/kit/add">
                      <i className="fas fa-plus mr-2" />
                      Tạo Mới Kit
                    </NavLink>
                  </div>
                </div>
    
                <div className="search-option">
                  <input
                    type="text"
                    name="nameKit"
                    className="input-search"
                    onChange={this.onChange}
                    placeholder="Nhập tên Kit"
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
    // onSearchKit: keyword =>{
    //   dispatch(searchKitRequest(keyword));
    // }
    onFilterByNameKit: (dataName) => {
      dispatch(filterByNameKit(dataName))
    }
  }
}


export default connect(
  null,
  mapDispatchToProps
) (DashboardListKit);