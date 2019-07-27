import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./DashboardListSystemItem.css";

class DashboardListSystemItem extends Component {

    render() {
        var { system } = this.props;
        return (
            <tr>
                <td>
                    {system.Name}
                </td>
                <td>
                    {system.Category === "PCRStep" ? "PCR" : ""}
                    {system.Category === "ExtractStep" ? "Ly trích" : ""}
                    {system.Category === "ElectrophoresisStep" ? "Điện di" : ""}
                    {system.Category === "PurifyStep" ? "Tinh Sạch" : ""}
                </td>
                <td>
                    <div className="action-wrapper d-flex justify-content-center align-items-center">
                        <div className="edit-btn mr-2">
                            <NavLink to={`/dashboard/system/update/${system.ID}`}>Cập Nhật</NavLink>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

}

export default DashboardListSystemItem;
