import React, { Component } from 'react';
import "./DashboardListOrganizationItem.css"
import { addOrganizationRequest } from '../../actions';
import moment from 'moment';
import { NavLink } from "react-router-dom";

class DashboardListOrganizationItem extends Component {
    render() {
        var { organization } = this.props;

        return (
            <tr>
                <td>{organization.Name}</td>
                <td>{organization.Location}</td>
                <td>{organization.PhoneNumber}</td>
                <td>
                    <div className="action-wrapper d-flex justify-content-center align-items-center">
                        <div className="edit-btn mr-2">
                            <NavLink to={`/dashboard/organization/update/${organization.ID}`}>Cập Nhật</NavLink>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}

export default DashboardListOrganizationItem;