import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./DashboardContent.css";
import "./../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";
// import PerfectScrollbar from "perfect-scrollbar";
import DashboardHomePage from "./../DashboardHomePage/DashboardHomePage";
import DashboardTopMenu from "./../DashboardTopMenu/DashboardTopMenu";
import DashboardShowListCase from "./../DashboardShowListCase/DashboardShowListCase";
import DashboardListCaseAdd from "./../DashboardListCaseAdd/DashboardListCaseAdd";
import DashboardListSampleAdd from "./../DashboardListSampleAdd/DashboardListSampleAdd";
import DashboardSampleClone from "./../DashboardSampleClone/DashboardSampleClone"
import DashboardListSampleAddStep from "./../DashboardListSampleAddStep/DashboardListSampleAddStep";
import DashboardViewSample from "./../DashboardViewSample/DashboardViewSample";
import DashboardShowListSample from "./../DashboardShowListSample/DashboardShowListSample";
import DashboardCreateConclusion from "../DashboardCreateConclusion/DashboardCreateConclusion";
import DashboardGenerateConclusion from "./../DashboardGenerateConclusion/DashboardGenerateConclusion";
import DashboardShowListLitigant from "./../DashboardShowListLitigant/DashboardShowListLitigant";
import DashboardListLitigantAdd from "./../DashboardListLitigantAdd/DashboardListLitigantAdd";
import DashboardShowListKit from "./../DashboardShowListKit/DashboardShowListKit";
import DashboardListKitAdd from "./../DashboardListKitAdd/DashboardListKitAdd";
import DashboardListKitUpdate from "./../DashboardListKitUpdate/DashboardListKitUpdate";
import DashboardShowListSystem from "./../DashboardShowListSystem/DashboardShowListSystem";
import DashboardListSystemAdd from "./../DashboardListSystemAdd/DashboardListSystemAdd";
import DashboardListSystemUpdate from "../DashboardListSystemUpdate/DashboardListSystemUpdate";
import DashboardListLitigantUpdate from "../DashboardListLitigantUpdate/DashboardListLitigantUpdate";
import DashboardShowListOrganization from "../DashboardShowListOrganization/DashboardShowListOrganization";
import DashboardListOrganizationAdd from "../DashboardListOrganizationAdd/DashboardListOrganizationAdd";
import DashboardListOrganizationUpdate from "../DashboardListOrganizationUpdate/DashboardListOrganizationUpdate";
import { CSSTransition, TransitionGroup } from "react-transition-group";
class DashboardContent extends Component {
  // componentDidMount() {
  //   new PerfectScrollbar(".dashboard-content", {
  //     // wheelPropagation: true,
  //     maxScrollbarLength: 200
  //     // swipeEasing :true
  //   });
  // }
  render() {
    return (
      <Fragment>
        <div className="dashboard-content">
          <DashboardTopMenu history={this.props.history} />
          {/* <div className="dashboard-content-wrapper"> */}
          <Route
            render={({ location, match }) => (
              <TransitionGroup className="dashboard-content-wrapper">
                <CSSTransition
                  key={location.key}
                  timeout={{ enter: 300, exit: 300 }}
                  classNames="fade"
                >
                  <Switch location={location} match={match}>
                    <Route
                      path="/dashboard"
                      exact
                      component={DashboardHomePage}
                    />
                    <Route
                      path="/dashboard/case"
                      exact
                      component={DashboardShowListCase}
                    />
                    <Route
                      path="/dashboard/case/add"
                      component={DashboardListCaseAdd}
                    />
                    <Route
                      path="/dashboard/case/:caseid/sample/:sampleid"
                      exact
                      component={DashboardListSampleAddStep}
                    />
                    <Route
                      path="/dashboard/case/:caseid/clone"
                      component={DashboardSampleClone}
                    />
                    <Route
                      path="/dashboard/case/:caseid/add"
                      component={DashboardListSampleAdd}
                    />
                    <Route
                      path="/dashboard/case/:caseid"
                      exact
                      component={DashboardShowListSample}
                    />
                    <Route
                      path="/dashboard/case/:caseid/sample/:sampleid/view"
                      component={DashboardViewSample}
                    />
                    <Route
                      path="/dashboard/conclusion"
                      exact
                      component={DashboardCreateConclusion}
                    />
                     <Route
                      path="/dashboard/conclusion/generate"
                      component={DashboardGenerateConclusion}
                    />
                    <Route
                      path="/dashboard/litigant"
                      exact
                      component={DashboardShowListLitigant}
                    />
                    <Route
                      path="/dashboard/litigant/add"
                      component={DashboardListLitigantAdd}
                    />
                    <Route
                      path="/dashboard/kit"
                      exact
                      component={DashboardShowListKit}
                    />
                    <Route
                      path="/dashboard/kit/add"
                      component={DashboardListKitAdd}
                    />
                    <Route
                      path="/dashboard/system"
                      exact
                      component={DashboardShowListSystem}
                    />
                    <Route
                      path="/dashboard/system/add"
                      component={DashboardListSystemAdd}
                    />
                    <Route
                      path="/dashboard/kit/update/:id"
                      component={DashboardListKitUpdate}
                    />
                    <Route
                      path="/dashboard/system/update/:id"
                      component={DashboardListSystemUpdate}
                    />
                    <Route
                      path="/dashboard/litigant/update/:id"
                      component={DashboardListLitigantUpdate}
                    />
                    <Route
                      path="/dashboard/organization"
                      exact
                      component={DashboardShowListOrganization}
                    />
                    <Route
                      path="/dashboard/organization/add"
                      component={DashboardListOrganizationAdd}
                    />
                    <Route
                      path="/dashboard/organization/update/:id"
                      component={DashboardListOrganizationUpdate}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </div>
        {/* </div> */}
      </Fragment>
    );
  }
}

export default DashboardContent;
