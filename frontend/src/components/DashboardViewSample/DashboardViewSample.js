import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import moment from "moment";
// import Dropzone from "react-dropzone-uploader";
// import Select from "react-select";
// import axios from "axios";
import "react-dropzone-uploader/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./DashboardViewSample.css";
import {
  getSampleIdRequest,
  getCaseIdRequest,
  getCaseRequest
} from "../../actions";

const $ = window.$;
class DashboardViewSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      note: "",
      status: "",
      sampleImage: "",
      collectDate: "",
      collector: "",
      receiveDate: "",
      receiver: "",
      deliverDate: "",
      deliverer: "",
      userId: "",
      caseId: "",
      litigantId: "",
      typeId: "",
      gdgSignal: "",
      amount: "",
      startDate: "",
      endDate: "",
      descriptionMan: "",
      photoTaker: "",
      description: "",

      files: [],

      selectedOption: null,
      isClearable: true
    };
  }
 
  componentDidMount() {
    var { match } = this.props;

    this.props.onGetSampleId(match.params.caseid,match.params.sampleid);
    this.props.onGetCase();
    $(".form-control").each(function() {
      $(this).on("keyup", function() {
        if (
          $(this)
            .val()
            .trim() !== ""
        ) {
          $(this).addClass("has-val");
          $(this)
            .next("span")
            .css({ visibility: "hidden", opacity: "0" });
        } else {
          $(this).removeClass("has-val");
          $(this)
            .next("span")
            .css({ visibility: "visible", opacity: "1" });
        }
      });
    });
  }

  render() {
    var { sampleiditem,match } = this.props;
  

    return (
      <Fragment>    
        <div className="card card-custom" style={{ marginTop: "100px" }}>
          <div className="card-body">
            <div className="card-title">View Sample</div>
            <form onSubmit={this.onSubmit}>
              <div className="row mb-3">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      //   pattern="[0-9][0-9]{3}"
                      value={sampleiditem.code}
                      required
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Code</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="note"
                      //   pattern="[0-9][0-9]{3}"
                      required
                      value={sampleiditem.note}
                      onChange={this.onChange}
                    />
                    <span className="input-placeholder">Note</span>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="collector"
                      required
                      value={sampleiditem.collector}
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Collector</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="receiver"
                      required
                      value={sampleiditem.receiver}
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Receiver</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="deliverer"
                      required
                      value={sampleiditem.deliverer}
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Deliverer</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="photoTaker"
                      required
                      value={sampleiditem.photoTaker}
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Photo Taker</span>
                  </div>
                </div>

                {/* <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtOrganization"
                      onChange={this.onChange}
                      required
                    />
                    <Select
                      value={selectedOption}
                      onChange={this.handleChangeSelect}
                      name="concac"
                      isClearable={isClearable}
                      options={options}
                      placeholder="Organization"
                    />
                    <span className="input-placeholder">Organization</span>
                  </div>
                </div> */}
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChangeStartDate}
                      value={moment(sampleiditem.startDate).format("DD/MM/YYYY, hh:mm a")}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="Start Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleChangeEndDate}
                      value={moment(sampleiditem.endDate).format("DD/MM/YYYY, hh:mm a")}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="End Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.collectDate}
                      onChange={this.handleChangeCollectDate}
                      value={moment(sampleiditem.collectDate).format("DD/MM/YYYY, hh:mm a")}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="Collect Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.deliverDate}
                      onChange={this.handleChangeDeliverDate}
                      value={moment(sampleiditem.deliverDate).format("DD/MM/YYYY, hh:mm a")}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="Deliver Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.receiveDate}
                      onChange={this.handleChangeReceiveDate}
                      value={moment(sampleiditem.receiveDate).format("DD/MM/YYYY, hh:mm a")}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="Receive Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <textarea
                      type="text"
                      className="form-control"
                      name="description"
                      required
                      value={sampleiditem.description}
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">Description</span>
                  </div>
                </div>

                {/* <div className="col-lg-12">
                  <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    accept="image/*,audio/*,video/*"
                  />
                </div> */}
              </div>

              {/* <button type="submit" className="btn custom-button-1 mr-3">
                Submit
              </button> */}
              <NavLink
                to={`/dashboard/case/${match.params.caseid}`}
                className="btn custom-button-2"
              >
                Back
              </NavLink>
              <div />
              {/* <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  accept='image/*'
                  onChange={this.handleImageChange}
                  multiple
                />
              
              </div> */}
            </form>
            {/* {imagesPreviewUrls.map(function(imagePreviewUrl, i){
                    return <img key={i} src={imagePreviewUrl} alt="" />
                })} */}
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    caseiditem: state.caseiditem,
    sampleiditem: state.sampleiditem,
    caselist: state.caselist
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetCaseId: caseId => {
      dispatch(getCaseIdRequest(caseId));
    },
    onGetSampleId: (caseId,sampleId) => {
      dispatch(getSampleIdRequest(caseId,sampleId));
    },
    onGetCase: () => {
      dispatch(getCaseRequest());
    }
    // onAddSample: sampleItem => {
    //   dispatch(addSampleRequest(sampleItem));
    // }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardViewSample);
