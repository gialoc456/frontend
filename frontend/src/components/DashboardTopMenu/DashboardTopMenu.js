import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import "./DashboardTopMenu.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { deleteDataLoginRequest } from "../../actions";
// import PropTypes from 'prop-types';

class DashboardTopMenu extends Component {

  // static contextTypes = {
  //   store: PropTypes.object.isRequired
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentDidMount() {
    const $ = window.$;
    $("#toggle-menu").on("click", () => {
      $(".dashboard-menu-left").toggleClass("show");
      $(".overlay").toggleClass("show");
    });
    $(".overlay").on("click", () => {
      $(".dashboard-menu-left").removeClass("show");
      $(".overlay").removeClass("show");
    });
    // const { firestore } = this.context.store;
    // console.log(firestore);
  }

  logout = () => {
    const { history } = this.props;
    this.props.onDeleteDataLogin();

    // this.props.localStorage.removeItem("username");
    history.push("/");
  };
  render() {
    const { datalogin } = this.props;

    return (
      <div className="dashboard-top-menu">
        <nav className="navbar navbar-expand-lg custom-navtop">
          <button id="toggle-menu">
            <i className="fas fa-bars" />
          </button>
          <div className="left-btn d-flex pl-3 mr-auto">
            {/* <div className="btn-add-code">
              <NavLink to="/dashboard/code/add">
                <i className="fas fa-plus mr-2" />Add New Code
              </NavLink>
            </div> */}
          </div>
          <ul className="nav d-flex align-items-center ml-auto">
            <li className="nav-item">
              <div className="dropdown">
                <button
                  className="notice"
                  type="button"
                  id="dropdownMenuButton2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-4">
                    <span>
                      <i className="far fa-bell" />
                    </span>
                    <span className="badge badge-custom">5</span>
                  </span>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <NavLink className="dropdown-item" exact to="/dashboard">
                      <span>
                        <i className="far fa-user" />
                      </span>
                      <span className="ml-2">Profile</span>
                    </NavLink>

                    <div className="dropdown-divider" />
                    <NavLink className="dropdown-item" to="/dashboard/add">
                      <span>
                        <i className="fas fa-sign-out-alt" />
                      </span>
                      <span className="ml-2">Logout</span>
                    </NavLink>
                  </div>
                </button>
              </div>
            </li>
            <li className="nav-item">
              <div className="profile d-flex align-items-center">
                <div className="text-profile">
                  <p className="font-weight-bold">{datalogin.Username}</p>
                </div>
                <Dropdown className="ml-3">
                  <Dropdown.Toggle
                    variant="aaaaa"
                    id="dropdown-basic"
                    style={{ padding: 0 }}
                  >
                    <div className="image-profile">
                      <img
                        src="https://picsum.photos/id/220/45/45"
                        alt="aa"
                        style={{ borderRadius: "100%" }}
                      />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <span>
                        <i className="far fa-user" />
                      </span>
                      <span className="ml-2">Profile</span>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.logout}>
                      {" "}
                      <span>
                        <i className="fas fa-sign-out-alt" />
                      </span>
                      <span className="ml-2">Logout</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <div className="dropdown">
                  <button
                    className="button-profile dropdown-toggle d-flex align-items-center"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="image-profile">
                      <img src="https://picsum.photos/id/220/45/45" alt="aa" />
                    </div>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <NavLink className="dropdown-item" exact to="/dashboard">
                        <span>
                          <i className="far fa-user" />
                        </span>
                        <span className="ml-2">Profile</span>
                      </NavLink>

                      <div className="dropdown-divider" />
                      <NavLink className="dropdown-item" to="/dashboard/add">
                        <span>
                          <i className="fas fa-sign-out-alt" />
                        </span>
                        <span className="ml-2">Logout</span>
                      </NavLink>
                    </div>
                    <div className="text-profile">
                      <p className="font-weight-bold">{username}</p>
                    </div>
                  </button>
                </div> */}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    datalogin: state.datalogin,
    notificationlist: state.notificationlist
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteDataLogin: () => {
      dispatch(deleteDataLoginRequest());
    }
  };
};

// const mapStateToProps = (state) => {
//   return {
//     datalogin: state.datalogin
//   }
// }

export default compose(
  firestoreConnect(props => [
    {
      collection: 'notifications',
      doc: '9',
      subcollections: [{ collection: 'notification'}],
      limit: 5
    }
  ]),
  connect(
   ( state,
    props) => ({
      notifications: state.firestore.data.notifications
    })

    
)


  // firestoreConnect([{
  //   collection: 'notifications',
  //   doc: '9',
  //   subcollections: [{ collection: 'notification'}],
  //   limit: 5
  //   }]),
  // connect((mapStateToProps, mapDispatchToProps) => ({
  //   notificationlist: mapStateToProps.firestore.ordered.todos,
  // }))
)(DashboardTopMenu);

