import React, { Component, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import "./DashboardSampleClone.css";
import { getSampleByCaseIdRequest, addSampleRequest } from "../../actions";

class DashboardSampleClone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSample: [],
      test: [],
      newCode: "",
      isDisabled: true,
      isClearable: true
    };
  }

  componentWillReceiveProps({ samplelistbycaseid }) {
    let arrSample = [];
    samplelistbycaseid.forEach(sample => {
      const newObj = {
        data: sample,
        value: sample.collector,
        label: sample.collector
      };
      arrSample.push(newObj);
    });
    this.setState({
      test: arrSample
    });
  }
  componentDidMount() {
    const { match } = this.props;

    this.props.onGetSampleByCaseId(match.params.caseid);
  }

  onChangeSelect = valueSample => {
    this.setState({
      valueSample
    });
    if (valueSample) {
      this.setState({
        isDisabled: false
      });
    } else {
      this.setState({
        isDisabled: true
      });
    }
  };
  onChange = e => {
    var target = e.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    const { match, history } = this.props;
    const { valueSample } = this.state;

    e.preventDefault();
    var data = {
      amount: valueSample.data.amount,
      caseId: valueSample.data.caseId,
      code: this.state.newCode,
      collectDate: valueSample.data.collectDate,
      collector: valueSample.data.collector,
      deliverDate: valueSample.data.deliverDate,
      deliverer: valueSample.data.deliverer,
      description: valueSample.data.description,
      descriptionMan: valueSample.data.descriptionMan,
      endDate: valueSample.data.endDate,
      gdgSignal: valueSample.data.gdgSignal,
      images: valueSample.data.images,
      note: valueSample.data.note,
      photoTaker: valueSample.data.photoTaker,
      receiveDate: valueSample.data.receiveDate,
      receiver: valueSample.data.receiver,
      sampleImage: valueSample.data.sampleImage,
      saveFileDate: valueSample.data.saveFileDate,
      startDate: valueSample.data.startDate,
      status: valueSample.data.status
    };
    this.props.onAddSampleByCaseId(data, match.params.caseid);

    history.goBack();
  };
  render() {
    const { isClearable } = this.state;
    console.log(this.state.valueSample);
    return (
      <Fragment>
        <div className="clone-sample-wrapper">
          <div className="container">
            <form onSubmit={this.onSubmit}>
              <div className="row align-items-center mb-3">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="selectSample" className="input-label">
                      Select Sample
                    </label>
                    <Select
                      id="selectSample"
                      value={this.state.valueSample}
                      onChange={this.onChangeSelect}
                      name="selectSample"
                      isClearable={isClearable}
                      options={this.state.test}
                      placeholder="Select Sample"
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label htmlFor="newCode" className="input-label">
                      Code
                    </label>
                    <input
                      className="form-control"
                      id="newCode"
                      name="newCode"
                      type="text"
                      placeholder="Add new code here"
                      required
                      disabled={this.state.isDisabled}
                      onChange={this.onChange} // Prop: Puts data into state
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 text-center">
                  <div className="clone-btn">
                    <button>Clone</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    samplelistbycaseid: state.samplelistbycaseid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetSampleByCaseId: caseid => {
      dispatch(getSampleByCaseIdRequest(caseid));
    },
    onAddSampleByCaseId: (dataSample, caseid) => {
      dispatch(addSampleRequest(dataSample, caseid));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardSampleClone);
