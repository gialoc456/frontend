import React, { Component } from 'react';
import "./DashboardListLitigantItem.css"
import moment from 'moment';
import { NavLink } from "react-router-dom";

class DashboardListLitigantItem extends Component {
    render() {
        var { litigant } = this.props;
        var DoB = this.props.litigant.DoB;
        const Date = DoB !== null ? DoB.split('T') : 'unavailable';
        return (
            <tr>
                <td>{litigant.Name}</td>
                <td>{
                    litigant.Sex === true ? "Nữ" : "Nam"
                }</td>
                <td>{moment(Date[0]).format("DD/MM/YYYY")}</td>
                <td>{litigant.HomeTown}</td>
                <td>{litigant.Nation}</td>
                <td>
                    <div className="action-wrapper d-flex justify-content-center align-items-center">
                        <div className="edit-btn mr-2">
                            <NavLink to={`/dashboard/litigant/update/${litigant.ID}`}>Cập Nhật</NavLink>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }
}

export default DashboardListLitigantItem;