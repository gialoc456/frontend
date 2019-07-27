import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StepElectro.css";
const options = [
  { value: "Kit 1", label: "Kit 1" },
  { value: "Kit 2", label: "Kit 2" },
  { value: "Kit 3", label: "Kit 3" },
  { value: "Kit 4", label: "Kit 4" },
  { value: "Kit 5", label: "Kit 5" },
  { value: "Kit 6", label: "Kit 6" }
];
class StepElectro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearable: true
    };
  }
  render() {
    const { isClearable } = this.state;
    if (this.props.currentStep !== 3) {
      return null;
    }
    return (
      <div className="row">
        {/* <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="electroSystem" className="input-label">
              Electrophoresis System
            </label>
            <input
              className="form-control"
              id="electroSystem"
              name="electroSystem"
              type="text"
              value={this.props.electroSystem} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div> */}
        {/* <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="electroKit" className="input-label">
              Electrophoresis Kit
            </label>
            <Select
              id="electroKit"
              value={this.props.electroKit}
              onChange={this.props.handleChangeSelectElectro}
              name="electroKit"
              isClearable={isClearable}
              options={this.props.optionKit}
              placeholder="Electrophoresis Kit"
            />
          </div>
        </div> */}
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="electroKit" className="input-label">
              Hệ thống Electrophoresis
            </label>
            <Select
              id="electroKit"
              value={this.props.electroElectroSystem}
              onChange={this.props.handleChangeSelectElectroSystem}
              name="electroKit"
              isClearable={isClearable}
              options={this.props.optionElectroSystem}
              placeholder="Electrophoresis Kit"
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <label htmlFor="electroGelsName" className="input-label">
              Gel's Name
            </label>
            <input
              className="form-control"
              id="electroGelsName"
              name="electroGelsName"
              type="text"
              value={this.props.electroGelsName} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label
              htmlFor="electroStartDate"
              className="input-label"
              style={{ display: "block" }}
            >
              Start Date
            </label>

            <DatePicker
              id="electroStartDate"
              selected={this.props.electroStartDate}
              onChange={this.props.handleChangeElectroStartDate}
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
              htmlFor="electroEndDate"
              className="input-label"
              style={{ display: "block" }}
            >
              End Date
            </label>

            <DatePicker
              id="electroEndDate"
              selected={this.props.electroEndDate}
              onChange={this.props.handleChangeElectroEndDate}
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
      </div>
    );
  }
}

export default StepElectro;
