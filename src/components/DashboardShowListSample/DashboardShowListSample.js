import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import DashboardListSample from "./../DashboardListSample/DashboardListSample";
import DashboardListSampleItem from "./../DashboardListSampleItem/DashboardListSampleItem";
import {
  updateStatusCaseIdRequest,
  getSampleByCaseIdRequest,
  getCaseIdRequest
} from "../../actions";

class DashboardShowListSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemPerPage: 5,
      status: null,
      countStatus: null,
      filter: []
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
    var { match } = this.props;
    this.props.onGetSampleByCaseId(match.params.caseid);
    this.props.onGetCaseId(match.params.caseid);
  }

  onShowCaseList = samplelistbycaseid => {
    var { match } = this.props;
    var result = null;
    result = samplelistbycaseid.map((sample, index) => {
      return (
        <DashboardListSampleItem key={index} sample={sample} match={match} />
      );
    });
    return result;
  };

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };

  render() {
   
    var { samplelistbycaseid, match, filtersample, caseiditem,datafromtoken,datalogin } = this.props;
    if (filtersample) {
      if (filtersample.keyword) {
        samplelistbycaseid = samplelistbycaseid.filter(sample => {
          if(sample.Code) {
            return sample.Code.indexOf(filtersample.keyword) !== -1;
          }
          
        });
      }
    }

    var trueCount = 0;
    var falseCount = 0;
    var nullCount = 0;
    samplelistbycaseid.filter(a => {
      return a.Status === 1
        ? trueCount++
        : a.Status === 0
        ? falseCount++
        : nullCount++;
    });

    if (trueCount === samplelistbycaseid.length) {
      this.props.onChangeStatusCaseId(
        {
          ID: match.params.caseid,
          Code: caseiditem.Code,
          QDTCReceiveDate: caseiditem.QDTCReceiveDate,
          QDTCNumber: caseiditem.QDTCNumber,
          QDTCSignDate: caseiditem.QDTCSignDate,
          OrganizationID:caseiditem.OrganizationID,
          Status: 1,
         
        },
        match.params.caseid,
        datalogin.Username
      );
    } else if (falseCount === samplelistbycaseid.length) {
      this.props.onChangeStatusCaseId(
        {ID: match.params.caseid,
          Code: caseiditem.Code,
          QDTCReceiveDate: caseiditem.QDTCReceiveDate,
          QDTCNumber: caseiditem.QDTCNumber,
          QDTCSignDate: caseiditem.QDTCSignDate,
          OrganizationID:caseiditem.OrganizationID,
          Status: 0,},
        match.params.caseid,
        datalogin.Username
      );
    } else {
      this.props.onChangeStatusCaseId(
        { ID: match.params.caseid,
          Code: caseiditem.Code,
          QDTCReceiveDate: caseiditem.QDTCReceiveDate,
          QDTCNumber: caseiditem.QDTCNumber,
          QDTCSignDate: caseiditem.QDTCSignDate,
          OrganizationID:caseiditem.OrganizationID,
          Status: 2, },
        match.params.caseid,
        datalogin.Username
      );
    }

    var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
    var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
    var renderedProjects = samplelistbycaseid.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    return (
      <Fragment>
        <DashboardListSample match={match}>
          {this.onShowCaseList(renderedProjects)}
        </DashboardListSample>
        <div className="d-flex justify-content-center">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={samplelistbycaseid.length}
            pageRangeDisplayed={5}
            itemClass="page-item"
            linkClass="page-link"
            onChange={this.handlePageChange}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    caseiditem: state.caseiditem,
    samplelistbycaseid: state.samplelistbycaseid,
    filtersample: state.filtersample,
    datafromtoken:state.datafromtoken,
    datalogin :state.datalogin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetSampleByCaseId: caseId => {
      dispatch(getSampleByCaseIdRequest(caseId));
    },
    onGetCaseId: (caseid) => {
      dispatch(getCaseIdRequest(caseid))
    },
    onChangeStatusCaseId: (status, caseId, username) => {
      dispatch(updateStatusCaseIdRequest(status, caseId, username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardShowListSample);
