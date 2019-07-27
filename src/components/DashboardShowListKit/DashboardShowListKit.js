import React, { Component, Fragment } from "react";
import Pagination from "react-js-pagination";
import DashboardListKit from "./../DashboardListKit/DashboardListKit";
import "./DashboardShowListKit.css";
import { connect } from "react-redux";
import DashboardListKitItem from "../DashboardListKitItem/DashboardListKitItem";
import { getKitRequest,filterByNameKit } from "../../actions";

class DashboardShowListKit extends Component {
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
        this.props.onGetKitList();
    }

    componentWillReceiveProps(){
        this.setState({
            activePage: 1
        });
    }

    onShowKitList = kitlist => {
        var result = null;
        if (kitlist.length > 0) {
            result = kitlist.map((kit, index) => {
                return <DashboardListKitItem key={index} kit={kit} />;
            });
            return result;
        }
    };

    render() {
        var { kitlist,datafilterkit } = this.props;
        if(datafilterkit) {
            if(datafilterkit.name){
                kitlist = kitlist.filter((a,i)=>{
                    return a.Name.toLowerCase().indexOf(datafilterkit.name.toLowerCase()) !== -1;
                })
            }
        }
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedKits = kitlist.slice(indexOfFirstTodo, indexOfLastTodo);
        return (
            <Fragment>
                <DashboardListKit>
                    {this.onShowKitList(renderedKits)}
                </DashboardListKit>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={kitlist.length}
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
        kitlist: state.kitlist,
        datafilterkit: state.datafilterkit
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetKitList: () => {
            dispatch(getKitRequest());
        },
        onFilterByNameKit: (dataName) => {
            dispatch(filterByNameKit(dataName))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardShowListKit);