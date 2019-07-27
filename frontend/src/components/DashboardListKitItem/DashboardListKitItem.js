import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import "./DashboardListKitItem.css"

class DashboardListKitItem extends Component {


    render() {
        var { kit } = this.props;
        console.log(kit);
        return (
            <tr>
                <td style={{ fontWeight: "500" }}>
                    {kit.Name}
                </td>
                <td style={{ fontWeight: "500" }}>
                    {kit.Category === "PCRStep" ? "PCR" : ""}
                    {kit.Category === "ExtractStep" ? "Ly trích" : ""}
                    {kit.Category === "ElectrophoresisStep" ? "Điện di" : ""}
                    {kit.Category === "PurifyStep" ? "Tinh Sạch" : ""}
                </td>
                <td>
                    <div className="action-wrapper d-flex justify-content-center align-items-center">
                        <div className="edit-btn mr-2">
                            <NavLink to={`/dashboard/kit/update/${kit.ID}`}>Cập Nhật</NavLink>
                        </div>
                    </div>
                </td>
            </tr>
        );

    }
}

export default DashboardListKitItem;