import React, { Component, Fragment } from "react";
import Pagination from "react-js-pagination";
import DashboardListSystem from "./../DashboardListSystem/DashboardListSystem";
import "./DashboardShowListSystem.css";
import { getSystemRequest,filterByNameSystem } from "../../actions";
import { connect } from "react-redux";
import DashboardListSystemItem from "../DashboardListSystemItem/DashboardListSystemItem";

class DashboardShowListSystem extends Component {
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
        this.props.onGetSystemList();
    }

    onShowSystemList = systemlist => {
        var result = null;
        if (systemlist.length > 0) {
            result = systemlist.map((system, index) => {
                return <DashboardListSystemItem key={index} system={system} />
            });
            return result;
        }
    }

    componentWillReceiveProps(){
        this.setState({
            activePage: 1
        });
    }

    render() {
        var { systemlist,datafiltersystem } = this.props;
        if(datafiltersystem) {
            if(datafiltersystem.name){
                systemlist = systemlist.filter((a,i)=>{
                    return a.Name.toLowerCase().indexOf(datafiltersystem.name.toLowerCase()) !== -1;
                })
            }
        }
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedSystems = systemlist.slice(indexOfFirstTodo, indexOfLastTodo);
        return (
            <Fragment>
                <DashboardListSystem>
                    {this.onShowSystemList(renderedSystems)}
                </DashboardListSystem>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={systemlist.length}
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
        systemlist: state.systemlist,
        datafiltersystem: state.datafiltersystem
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetSystemList: () => {
            dispatch(getSystemRequest());
        },
        onFilterByNameSystem: (dataName) => {
            dispatch(filterByNameSystem(dataName))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardShowListSystem);