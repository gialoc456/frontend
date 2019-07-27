import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

import { connect } from "react-redux";
import "./DashboardListCaseItem.css";
import { deleteCaseRequest, getOrganizationByIdRequest } from "../../actions";
class DashboardListCaseItem extends Component {
  onDelete = id => {
    this.props.onDeleteCase(id);
  };

  render() {
    var { Case, Organization } = this.props;
    return (
      <tr>
        <td style={{ fontWeight: "500" }}>{Case.Code}</td>
        {Organization.map((a, i) => {
          if (a.ID === Case.OrganizationID) {
            return (
              <td key={i} style={{ fontWeight: "500" }}>{a.Name}</td>
            );
          } 
        })}

        <td>{Case.QDTCNumber}</td>
        <td>{moment(Case.QDTCReceiveDate).format("DD/MM/YYYY, hh:mm a")}</td>
        <td>{moment(Case.QDTCSignDate).format("DD/MM/YYYY, hh:mm a")}</td>
        <td>
          <div
            className={`status-wrapper ${
              Case.Status === 1
                ? "done"
                : Case.Status === 0
                ? "notyet"
                : "doing"
            }`}
          >
            {Case.Status === 1
              ? "Done"
              : Case.Status === 0
              ? "Not yet"
              : "Doing"}
          </div>
        </td>
        <td>
          <div className="action-wrapper d-flex justify-content-center align-items-center">
            <div className="edit-btn mr-2">
              <NavLink to={`/dashboard/case/${Case.ID}`}>View Sample</NavLink>
            </div>
            <div className="delete-btn">
              <button
                type="button"
                className="btn custom-btn-delete"
                onClick={() => this.onDelete(Case.ID)}
              >
                Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizationbyid: state.organizationbyid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteCase: id => {
      dispatch(deleteCaseRequest(id));
    },
    onGetOrganizationById: id => {
      dispatch(getOrganizationByIdRequest(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardListCaseItem);
