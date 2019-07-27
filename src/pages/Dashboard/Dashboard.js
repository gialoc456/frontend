import React, { Component } from "react";
import "./Dashboard.css";
import DashboardContent from "./../../components/DashboardContent/DashboardContent";
import DashboardMenu from "./../../components/DashboardMenu/DashboardMenu";

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid dashboard-wrapper no-padding">
      
          <div className="overlay">
          </div>
          <DashboardMenu />
          <DashboardContent
            history={this.props.history}
            match={this.props.match}
          />
     
      </div>
    );
  }
}

export default Dashboard;
