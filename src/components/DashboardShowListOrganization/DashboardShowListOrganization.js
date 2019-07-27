import React, { Component, Fragment } from "react";
import Pagination from "react-js-pagination";
import DashboardListOrganization from "./../DashboardListOrganization/DashboardListOrganization";
import "./DashboardShowListOrganization.css";
import { getOrganizationRequest,filterByNameOrganization } from "../../actions";
import { connect } from "react-redux";
import DashboardListOrganizationItem from "../DashboardListOrganizationItem/DashboardListOrganizationItem";

class DashboardShowListOrganization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            itemPerPage: 5
        }
    }

    handlePageChange = pageNumber => {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    };

    componentDidMount() {
        this.props.onGetOrganizationList();
    }

    componentWillReceiveProps(){
        this.setState({
            activePage: 1
        });
    }

    onShowOrganizationList = organizationlist => {
        var result = null;
        if (organizationlist.length > 0) {
            result = organizationlist.map((organization, index) => {
                return <DashboardListOrganizationItem key={index} organization={organization} />
            });
            return result;
        }
    }

    render() {
        var { organizationlist,datafilterorganization } = this.props;
        if(datafilterorganization) {
            if(datafilterorganization.name){
                organizationlist = organizationlist.filter((a,i)=>{
                    return a.Name.toLowerCase().indexOf(datafilterorganization.name.toLowerCase()) !== -1;
                })
            }
        }
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedOrganizations = organizationlist.slice(indexOfFirstTodo, indexOfLastTodo);
        return (
            <Fragment>
                <DashboardListOrganization>
                    {this.onShowOrganizationList(renderedOrganizations)}
                </DashboardListOrganization>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={organizationlist.length}
                        pageRangeDisplayed={5}
                        itemClass="page-item"
                        linkClass="page-link"
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        organizationlist: state.organizationlist,
        datafilterorganization: state.datafilterorganization
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetOrganizationList: () => {
            dispatch(getOrganizationRequest()); 
        }, 
        onFilterByNameOrganization: (dataName) => {
            dispatch(filterByNameOrganization(dataName))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardShowListOrganization);