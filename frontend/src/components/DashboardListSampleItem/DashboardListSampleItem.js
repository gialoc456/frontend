import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./DashboardListSampleItem.css";
import moment from "moment";
class DashboardListSampleItem extends Component {
 

  render() {
    var { sample,match} = this.props;
    return (
      <tr>
        <td>{sample.Code}</td>
        <td>{sample.Collector}</td>
        <td>{sample.Deliverer}</td>
        <td>{sample.Receiver}</td>
        <td>{moment(sample.StartDate).format("DD/MM/YYYY, hh:mm a")}</td>
        <td>{moment(sample.EndDate).format("DD/MM/YYYY, hh:mm a")}</td>
        <td>
          <div
            className={`status-wrapper ${
              sample.Status === 1
                ? "done"
                : sample.Status === 0
                ? "notyet"
                : "doing"
            }`}
          >
            {sample.Status === 1
              ? "Done"
              : sample.Status === 0
              ? "Not yet"
              : "Doing"}
          </div>
        </td>
        <td>
          <div className="action-wrapper d-flex justify-content-center align-items-center">
            <div className="edit-btn mr-2">
              <NavLink to={`/dashboard/case/${match.params.caseid}/sample/${sample.ID}`}  >
                Add Process
              </NavLink>
            </div>
            <div className="view-btn">
              <NavLink to={`/dashboard/case/${match.params.caseid}/sample/${sample.ID}/view`}>
                View Info
              </NavLink>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default DashboardListSampleItem;
