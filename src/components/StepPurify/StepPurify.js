import React, { Component} from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./StepPurify.css";
const options = [
  { value: "Kit 1", label: "Kit 1" },
  { value: "Kit 2", label: "Kit 2" },
  { value: "Kit 3", label: "Kit 3" },
  { value: "Kit 4", label: "Kit 4" },
  { value: "Kit 5", label: "Kit 5" },
  { value: "Kit 6", label: "Kit 6" }
];
class StepPurify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearable: true
    };
  }
  render() {
    const { isClearable } = this.state;
    if (this.props.currentStep !== 4) {
      return null;
    }
    return (
      <div className="row">
        
        <div className="col-lg-6">
          <div className="form-group">
            <label htmlFor="purifyKit" className="input-label">
              Purify Kit
            </label>
            <Select
              id="purifyKit"
              value={this.props.purifyKit}
              onChange={this.props.handleChangeSelectPurify}
              name="purifyKit"
              isClearable={isClearable}
              options={this.props.optionKitPurify}
              placeholder="Purify Kit"
            />
          </div>
        </div>
        <div className="col-lg-6">

        </div>
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
              id="purifyStartDate"
              selected={this.props.purifyStartDate}
              onChange={this.props.handleChangePurifyStartDate}
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
              id="purifyEndDate"
              selected={this.props.purifyEndDate}
              onChange={this.props.handleChangePurifyEndDate}
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
            <label htmlFor="purifyNote" className="input-label">
              Note
            </label>
            <input
              className="form-control"
              id="purifyNote"
              name="purifyNote"
              type="text"
              value={this.props.purifyNote} // Prop: The email input data
              onChange={this.props.handleChange} // Prop: Puts data into state
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StepPurify;
