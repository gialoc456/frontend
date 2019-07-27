import React, { Component } from "react";
import {connect} from "react-redux"
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StepPRC.css";
import { getValuePRCStepBySampleIdRequest } from "../../actions";
const options = [
  { value: "Kit 1", label: "Kit 1" },
  { value: "Kit 2", label: "Kit 2" },
  { value: "Kit 3", label: "Kit 3" },
  { value: "Kit 4", label: "Kit 4" },
  { value: "Kit 5", label: "Kit 5" },
  { value: "Kit 6", label: "Kit 6" }
];
class StepPRC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearable: true
    };
  }

  componentDidMount() {
    console.log("DID MOUNT PRC")
  }

  render() {
    
    const { isClearable } = this.state;
    if (this.props.currentStep !== 2) {
      return null;
    }
    return (
      <div className="row">
        {/* <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="prcSystem" className="input-label">
              PRC System
            </label>
            <input
              className="form-control"
              id="prcSystem"
              name="prcSystem"
              type="text"
              value={this.props.prcSystem} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div> */}
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="prcKit" className="input-label">
              PRC Kit
            </label>
            <Select
              id="prcKit"
              value={this.props.prcKit}
              onChange={this.props.handleChangeSelectPRC}
              name="prcKit"
              isClearable={isClearable}
              options={this.props.optionKitPCR}
              placeholder="PRC Kit"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="prcPRCSystem" className="input-label">
              Hệ thống PRC
            </label>
            <Select
              id="prcPRCSystem"
              value={this.props.prcPRCSystem}
              onChange={this.props.handleChangeSelectPRCSystem}
              name="prcPRCSystem"
              isClearable={isClearable}
              options={this.props.optionPCRSystem}
              placeholder="PRC Kit"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label
              htmlFor="prcStartDate"
              className="input-label"
              style={{ display: "block" }}
            >
              Start Date
            </label>

            <DatePicker
              id="prcStartDate"
              selected={this.props.prcStartDate}
              onChange={this.props.handleChangePRCStartDate}
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
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label
              htmlFor="prcEndDate"
              className="input-label"
              style={{ display: "block" }}
            >
              End Date
            </label>

            <DatePicker
              id="prcEndDate"
              selected={this.props.prcEndDate}
              onChange={this.props.handleChangePRCEndDate}
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
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <label htmlFor="prcNote" className="input-label">
              Note
            </label>
            <input
              className="form-control"
              id="prcNote"
              name="prcNote"
              type="text"
              value={this.props.prcNote} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div>
      </div>
    );
  }
}



export default StepPRC;
