import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./DashboardListCase.css";
import { searchCase } from "../../actions";
class DashboardListCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }
  componentDidMount() {
    const $ = window.$;
    $(".input-search")
      .on("focus", () => {
        console.log("ok");
        $(this).attr("placeholder", "ok");
      })
      .blur(() => {
        $(this).attr("placeholder", "Join our mailing list!");
      });
  }

  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter({
      name: name === "keyword" ? value : this.state.keyword
    });
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Fragment>
        <div className="list-code-wrapper">
          <div className="breadcrumb-wrapper d-flex justify-content-start align-items-center mb-5">
            <div className="breadcrumb-header">
              <h2>List Cases View</h2>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard"><i className="fas fa-home" /></NavLink>
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard">Manage Case</NavLink>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  List Cases View
                </li>
              </ol>
            </nav>
          </div>
          <div className="list-code-option-bar-wrapper d-flex justify-content-between align-items-center">
            <div className="add-option">
              <div className="btn-add-code">
                <NavLink to="/dashboard/case/add">
                  <i className="fas fa-plus mr-2" />
                  Add New Case
                </NavLink>
              </div>
            </div>

            <div className="search-option">
              <input
                type="text"
                name="keyword"
                className="input-search"
                onChange={this.onChange}
                placeholder="Search code"
              />
              <button type="button">
                <i className="fas fa-search" onClick={this.onSearch} />
              </button>
            </div>
          </div>

          <div className="list-code-content">
            <div className="table-responsive">
              <table className="table table-borderless table-custom">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Code</th>
                    <th scope="col">Organization</th>
                    <th scope="col">QDTC Number</th>
                    <th scope="col">Receive Date</th>
                    <th scope="col">Sign Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{this.props.children}</tbody>
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
    onFilter: filter => {
      dispatch(searchCase(filter));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DashboardListCase);
