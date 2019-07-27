import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import "./DashboardShowListCase.css";
import DashboardListCase from "../DashboardListCase/DashboardListCase";
import DashboardListCaseItem from "../DashboardListCaseItem/DashboardListCaseItem";
import { getCaseRequest, getOrganizationRequest } from "../../actions";
class DashboardShowListCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 5
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.setState({
        activePage: 1
      });
    }
  }

  componentDidMount() {
    this.props.onGetCaseList();
    this.props.onGetOrganization();
  }
  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  };
  onShowCaseList = (caselist, organizationlist) => {
    var result = null;
    if (caselist.length > 0) {
      result = caselist.map((Case, index) => {
        return (
          <DashboardListCaseItem
            key={index}
            Case={Case}
            Organization={organizationlist}
          />
        );
      });
      return result;
    }
  };

  render() {
    var { caselist, filter, organizationlist } = this.props;
    if (filter) {
      if (filter.name) {
        caselist = caselist.filter((Case, index) => {
          return Case.Code.indexOf(filter.name) !== -1;
        });
      }
    }
    var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
    var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
    var renderedProjects = caselist.slice(indexOfFirstTodo, indexOfLastTodo);

    return (
      <Fragment>
        <DashboardListCase>
          {this.onShowCaseList(renderedProjects, organizationlist)}
        </DashboardListCase>
        <div className="d-flex justify-content-center">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={caselist.length}
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
    caselist: state.caselist,
    filter: state.filter,
    organizationlist: state.organizationlist
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetCaseList: () => {
      dispatch(getCaseRequest());
    },
    onGetOrganization: () => {
      dispatch(getOrganizationRequest());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardShowListCase);
