import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./DashboardMenu.css";
const $ = window.$;

class DashboardMenu extends Component {
  componentDidMount() {
    $(".menu-exit-btn").on("click", () => {
      $(".dashboard-menu-left").removeClass("show");
      $(".overlay").removeClass("show");
    });
  }
  render() {
    return (
      <Fragment>
        <div className="dashboard-menu-left">
          <div className="dashboard-menu-left-wrapper d-flex flex-column">
            <div className="menu-left-logo">
              Capst<span style={{ color: "#3beaf5" }}>one.</span>
              <div className="menu-exit-btn">
                <i className="fas fa-times" />
              </div>
            </div>
            <div className="menu-left-content">
              <ul className="text-left">
                <li className="menu-left-item nav-item">
                  <NavLink
                    to="/dashboard"
                    exact
                    activeClassName="active"
                    className="nav-link main-menu"
                  >
                    <i className="fas fa-home" />
                    <span className="spanname">Dashboard</span>
                  </NavLink>
                </li>
                <li className="menu-left-item nav-item">
                  <a
                    className="nav-link collapsed main-menu menu-item-drop"
                    href="#submenu1"
                    data-toggle="collapse"
                    data-target="#submenu1"
                  >
                    <i className="fas fa-home" />
                    <span className="spanname">Manage Cases</span>
                  </a>
                  <div className="collapse" id="submenu1" aria-expanded="false">
                    <ul className="d-flex flex-column">
                      <li className="nav-item">
                        <NavLink
                          to="/dashboard/case/add"
                          className="nav-link sub-menu"
                          activeClassName="active"
                        >
                          <i className="far fa-circle" />
                          <span className="spanname">Add Case</span>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          to="/dashboard/case"
                          exact
                          className="nav-link sub-menu"
                          activeClassName="active"
                        >
                          <i className="far fa-circle" />
                          <span className="spanname">View List Case</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="menu-left-item">
                  <NavLink to="/dashboard/conclusion" className="main-menu">
                    <i className="fas fa-home" />
                    <span className="spanname">Manage Conclusion</span>
                  </NavLink>
                </li>
                <li className="menu-left-item">
                  <NavLink to="/dashboard/litigant" className="main-menu">
                    <i className="fas fa-home" />
                    <span className="spanname">Quản lý đương sự</span>
                  </NavLink>
                </li>
                <li className="menu-left-item">
                    <NavLink to="/dashboard/kit" className="main-menu">
                      <i className="fas fa-home"></i>
                      <span className="spanname">Quản lý kit</span>
                    </NavLink>
                </li>
                <li className="menu-left-item">
                    <NavLink to="/dashboard/system" className="main-menu">
                      <i className="fas fa-home"></i>
                      <span className="spanname" >Quản lý hệ thống máy</span>
                    </NavLink>
                </li>
                <li className="menu-left-item">
                    <NavLink to="/dashboard/organization" className="main-menu">
                      <i className="fas fa-home"></i>
                      <span className="spanname" >Quản lý cơ quan</span>
                    </NavLink>
                </li>
                {/* <li className="menu-left-item">
                  <NavLink to="/dashboard/code/add" className="main-menu">
                    <i className="fas fa-home" />
                    <span className="spanname">Manage Công An </span>
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DashboardMenu;
