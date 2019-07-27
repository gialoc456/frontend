import React, { Component, Fragment} from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import "./DashboardShowListLitigant.css";
import DashboardListLitigant from "./../DashboardListLitigant/DashboardListLitigant";
import { getLitigantRequest,filterByNameLitigant } from "../../actions";
import DashboardListLitigantItem from "../DashboardListLitigantItem/DashboardListLitigantItem";

class DashboardShowListLitigant extends Component {
    constructor(props){
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
    
    componentDidMount(){
        this.props.onGetLitigantList();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            activePage: 1
        });
    }

    onShowLitigantList = litigantlist =>{
        var result = null;
        if(litigantlist.length > 0){
            result = litigantlist.map((litigant, index) =>{
                return <DashboardListLitigantItem key={index} litigant={litigant}/>
            })
            return result;
        }
    };


    render(){
        var { litigantlist,datafilterlitigant } = this.props;
        if(datafilterlitigant) {
            if(datafilterlitigant.name){
                litigantlist = litigantlist.filter((a,i)=>{
                    return a.Name.toLowerCase().indexOf(datafilterlitigant.name.toLowerCase()) !== -1;
                })
            }
        }
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedLitigants = litigantlist.slice(indexOfFirstTodo,indexOfLastTodo);
        return(
            <Fragment>
                <DashboardListLitigant>
                    {this.onShowLitigantList(renderedLitigants)}
                </DashboardListLitigant>
                <div className="d-flex justify-content-center">
                <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={litigantlist.length}
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

const mapStateToProps = state =>{
    return{
        litigantlist : state.litigantlist,
        datafilterlitigant: state.datafilterlitigant
    };
};

const mapDispatchToProps = (dispatch,props) =>{
    return{
        onGetLitigantList: () =>{
            dispatch(getLitigantRequest());
        },
        onFilterByNameLitigant: (dataName) => {
            dispatch(filterByNameLitigant(dataName))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (DashboardShowListLitigant);