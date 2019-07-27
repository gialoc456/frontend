import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StepExtract.css";
import { getValueExtractStepBySampleIdRequest, getExtractStepBySampleIdRequest } from "../../actions";
const options = [
  { value: "Kit 1", label: "Kit 1" },
  { value: "Kit 2", label: "Kit 2" },
  { value: "Kit 3", label: "Kit 3" },
  { value: "Kit 4", label: "Kit 4" },
  { value: "Kit 5", label: "Kit 5" },
  { value: "Kit 6", label: "Kit 6" }
];
class StepExtract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearable: true,
      test: []
    };
  }


    
  render() {
    const { isClearable } = this.state;
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="extractGdgSignal" className="input-label">
              GDG Signal
            </label>
            <input
              className="form-control"
              id="extractGdgSignal"
              name="extractGdgSignal"
              type="text"
              value={this.props.extractGdgSignal} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="extractAmount" className="input-label">
              Amount
            </label>
            <input
              className="form-control"
              id="extractAmount"
              name="extractAmount"
              type="text"
              value={this.props.extractAmount} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="extractKit" className="input-label">
              Extration Kit
            </label>
            <Select
              id="extractKit"
              value={this.props.extractKit}
              onChange={this.props.handleChangeSelectExtract}
              name="extractKit"
              isClearable={isClearable}
              options={this.props.optionKitExtract}
              placeholder="Extration Kit"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="extractADNSystem" className="input-label">
              Hệ thống đo ADN
            </label>
            <Select
              id="extractADNSystem"
              value={this.props.extractADNSystem}
              onChange={this.props.handleChangeSelectExtractADNSystem}
              name="extractADNSystem"
              isClearable={isClearable}
              options={this.props.optionExtractSystem}
              placeholder="Hệ thống đo ADN"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="extractExtractSystem" className="input-label">
              Hệ thống ly trích
            </label>
            <Select
              id="extractExtractSystem"
              value={this.props.extractExtractSystem}
              onChange={this.props.handleChangeSelectExtractExtractSystem}
              name="extractExtractSystem"
              isClearable={isClearable}
              options={this.props.optionExtractSystem}
              placeholder="Hệ thống ly trích"
            />
          </div>
        </div>
        {/* <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="extractSystem" className="input-label">
              Extraction System
            </label>
            <input
              className="form-control"
              id="extractSystem"
              name="extractSystem"
              type="text"
              value={this.props.extractSystem} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div> */}

        <div className="col-lg-6">
          <div className="form-group">
            <label
              htmlFor="extractStartDate"
              className="input-label"
              style={{ display: "block" }}
            >
              Start Date
            </label>

            <DatePicker
              id="extractStartDate"
              selected={this.props.extractStartDate}
              onChange={this.props.handleChangeExtractStartDate}
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
              htmlFor="extractEndDate"
              className="input-label"
              style={{ display: "block" }}
            >
              End Date
            </label>

            <DatePicker
              id="extractEndDate"
              selected={this.props.extractEndDate}
              onChange={this.props.handleChangeExtractEndDate}
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
            <label htmlFor="extractNote" className="input-label">
              Note
            </label>
            <input
              className="form-control"
              id="extractNote"
              name="extractNote"
              type="text"
              value={this.props.extractNote} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div>
      </div>
    );
  }
}


export default StepExtract;
