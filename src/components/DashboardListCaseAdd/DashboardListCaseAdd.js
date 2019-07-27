import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DashboardListCaseAdd.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addCaseRequest, getOrganizationRequest } from "../../actions";
import { NavLink } from "react-router-dom";
// import Dropzone from "react-dropzone-uploader";
import Select from "react-select";
import "react-dropzone-uploader/dist/styles.css";
const $ = window.$;


class DashboardListCaseAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      signDate: "",
      txtCode: "",
      txtQDTC: "",
      files: [],
      organizationList: [],
      selectedOption: null,
      isClearable: true
    };
  }
  componentWillReceiveProps({ organizationlist }) {
    var data = [];
    organizationlist.forEach(element => {
      var newObj = {
        data: element,
        value: element.ID,
        label: element.Name
      };
      data.push(newObj);
    });
    this.setState({
      organizationList: data
    });
  }



  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
 
  };
  handleChangeSelect = selectedOption => {
    this.setState({
      selectedOption: selectedOption
    });
  };
  handleChangeStartDate = date => {
    this.setState({
      startDate: date
    });
  };
  handleChangeSignDate = date => {
    this.setState({
      signDate: date
    });
  };

  onSubmit = e => {
    var { history } = this.props;
    var { txtCode, txtQDTC, startDate, signDate, selectedOption } = this.state;
    e.preventDefault();

    var Case = {
      QDTCReceiveDate: startDate,
      QDTCNumber: txtQDTC,
      OrganizationID: selectedOption.value,
      QDTCSignDate: signDate,
      Status: 0,
      Code: txtCode
    };
    this.props.onAddCase(Case);
    history.push("/dashboard/case");
  };

  componentDidMount() {
    this.props.onGetOrganization();
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
    // const getUploadParams = ({ meta }) => {
    //   const url = "https://httpbin.org/post";
    //   const fileUrl = `${url}/${encodeURIComponent(meta.name)}`;
    //   return { url, meta: { fileUrl } };
    // };

    // const handleChangeStatus = ({ meta, file }, status) => {
    //   console.log(status, meta, file);
    // };

    // const handleSubmit = (files, allFiles) => {
    //   console.log(files.map(f => f.meta));
    //   allFiles.forEach(f => f.remove());
    // };
    const { selectedOption, isClearable, organizationList } = this.state;

    return (
      <Fragment>
        <div className="card card-custom">
          <div className="card-body">
            <div className="card-title">Add Case</div>
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="txtCode"
                      //   pattern="[0-9][0-9]{3}"
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
                      name="txtQDTC"
                      // pattern="[0-9][0-9]{3}"
                      required
                      //   pattern="[1-9][0-9]{8}"
                      onChange={this.onChange}
                    />

                    <span className="input-placeholder">QDTC Number</span>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    {/* <input
                      type="text"
                      className="form-control"
                      name="txtOrganization"
                      onChange={this.onChange}
                      required
                    /> */}
                    <Select
                      value={selectedOption}
                      onChange={this.handleChangeSelect}
                      isClearable={isClearable}
                      options={organizationList}
                      placeholder="Organization"
                    />
                    {/* <span className="input-placeholder">Organization</span> */}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChangeStartDate}
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
                <div className="col-lg-6">
                  <div className="form-group">
                    <DatePicker
                      selected={this.state.signDate}
                      onChange={this.handleChangeSignDate}
                      showTimeSelect
                      showTimeInput
                      timeInputLabel="Time:"
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy h:mm aa"
                      timeCaption="time"
                      placeholderText="Sign Date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                {/* <div className="col-lg-6">
                  
                  <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    accept="image/*,audio/*,video/*"
                  />
                </div> */}
                <div className="col-lg-6" />
              </div>

              <button type="submit" className="btn custom-button-1 mr-3">
                Submit
              </button>
              <NavLink to="/dashboard/case" className="btn custom-button-2">
                Back
              </NavLink>
              <div />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizationlist: state.organizationlist
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddCase: Case => {
      dispatch(addCaseRequest(Case));
    },
    onGetOrganization: () => {
      dispatch(getOrganizationRequest());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardListCaseAdd);
