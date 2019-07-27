import React, { Component, Fragment } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./StepResult.css";
class StepResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearable: true
    };
  }

  render() {
    // const { isClearable } = this.state;
    if (this.props.currentStep !== 5) {
      return null;
    }
    // console.log(this.props.resultFile)
    return (
      <Fragment>
        <div className="col-lg-6">
          <div className="form-group">
            <label
              htmlFor="purifyStartDate"
              className="input-label"
              style={{ display: "block" }}
            >
              Start Date
            </label>

            <DatePicker
              id="resultStartDate"
              selected={this.props.resultStartDate}
              onChange={this.props.handleChangeResultStartDate}
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
              htmlFor="purifyEndDate"
              className="input-label"
              style={{ display: "block" }}
            >
              End Date
            </label>

            <DatePicker
              id="resultEndDate"
              selected={this.props.resultEndDate}
              onChange={this.props.handleChangeResultEndDate}
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
            <label htmlFor="resultSoftware" className="input-label">
              Software
            </label>
            <input
              className="form-control"
              id="resultSoftware"
              name="resultSoftware"
              type="text"
              value={this.props.resultSoftware} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <label htmlFor="resultNote" className="input-label">
              Note
            </label>
            <input
              className="form-control"
              id="resultNote"
              name="resultNote"
              type="text"
              value={this.props.resultNote} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div>

        <div className="form-group">
          <div className="done-control custom-control custom-checkbox ">
            <input
              className="custom-control-input"
              type="checkbox"
              value=""
              onChange={this.props.handleChangeClick}
              id="customCheck1"
              checked={this.props.done === true ? true : null}
            />
            <label
              className="custom-control-label d-flex align-items-center"
              htmlFor="customCheck1"
            >
              Đã hoàn thành
            </label>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <label htmlFor="resultFile" className="input-label">
              Import Excel File
            </label>
            <input
              className="form-control"
              id="resultFile"
              name="resultFile"
              type="file"
              onChange={this.props.fileHandler} // Prop: Puts data into state
            />
          </div>
        </div>
          
      </Fragment>
    );
  }
}

export default StepResult;
