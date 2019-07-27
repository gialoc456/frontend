import React, { Component, Fragment } from "react";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import "./DashboardListSample.css";
import {
  getCaseIdRequest,
  searchSample,
  getSampleByCaseIdRequest,
  addSampleRequest
} from "../../actions";
class DashboardListSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      showModal: false,
      valueSample: [],
      test: [],
      newCode: "",
      isDisabled: false,
      isClearable: true
    };
  }


  componentDidMount() {
    const { match } = this.props;
    this.props.onGetSampleByCaseId(match.params.caseid);
  }

  componentWillReceiveProps({ samplelistbycaseid }) {
    let arrSample = [];
    samplelistbycaseid.forEach(sample => {
      const newObj = {
        data: sample,
        value: sample.ID,
        label: sample.Name
      };
      arrSample.push(newObj);
    });
    this.setState({
      test: arrSample
    });
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

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  };
  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };
  onSubmit = e => {
    const { valueSample } = this.state;
    console.log(valueSample)
    e.preventDefault();
    var data = {
      Code: this.state.newCode,
      Amount: valueSample.data.Amount,
      CollectDate: valueSample.data.CollectDate,
      Collector: valueSample.data.Collector,
      DeliverDate: valueSample.data.DeliverDate,
      Deliverer: valueSample.data.Deliverer,
      Description: valueSample.data.Description,
      DescriptionMan: valueSample.data.DescriptionMan,
      EndDate: valueSample.data.EndDate,
      GDGSignal: valueSample.data.GDGSignal,
      // images: valueSample.data.images,
      Note: valueSample.data.Note,
      PhotoTaker: valueSample.data.PhotoTaker,
      ReceiveDate: valueSample.data.ReceiveDate,
      Receiver: valueSample.data.Receiver,
      // sampleImage: valueSample.data.sampleImage,
      SaveFileDate: valueSample.data.SaveFileDate,
      StartDate: valueSample.data.StartDate,
      Status: valueSample.data.Status,
      UserID:valueSample.data.UserID,
      CaseID:valueSample.data.CaseID,
      LitigantID:valueSample.data.LitigantID,
      Reference:valueSample.data.Reference,
      Quantity:valueSample.data.Quantity,
      CodeKT:valueSample.data.CodeKT
    };
    this.props.onAddSample(data);

    this.handleCloseModal();
  };
  onChange = e => {
    const { value, name } = e.target;
    this.props.onFilter({
      keyword: name === "keyword" ? value : this.state.keyword
    });
    this.setState({
      [name]: value
    });
  };
  render() {
    var { match } = this.props;
    return (
      <Fragment>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
          closeTimeoutMS={200}
        >
          <div className="clone-sample-wrapper">


            <header className="d-flex header-clone">
              <div style={{ color: "rgb(44, 44, 44)", fontWeight: "500", fontSize: "16px" }}>Clone Sample</div>
              <div className="exit-clone">
                <button onClick={this.handleCloseModal}>
                  <i className="fas fa-times" />
                </button>

              </div>
            </header>
            <div className="row align-items-center content-clone">
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="selectSample" className="input-label">
                    Select Sample
                      </label>
                  <Select
                    id="selectSample"
                    value={this.state.valueSample}
                    onChange={this.onChangeSelect}
                    name="selectSample"
                    isClearable={this.state.isClearable}
                    options={this.state.test}
                    placeholder="Select Sample"
                  />
                </div>
              </div>
              <div className="col-lg-12">
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

                    disabled={this.state.isDisabled}
                    onChange={this.onChange} // Prop: Puts data into state
                  />
                </div>
              </div>
            </div>
            <footer className="d-flex justify-content-end footer-clone">
              <div className="clone-btn">
                <button onClick={this.onSubmit}>Clone</button>
              </div>
              <div className="cancel-btn ml-2">
                <button onClick={this.handleCloseModal}>Cancel</button>
              </div>
            </footer>

          </div>

        </ReactModal>
        <div className="list-code-wrapper">
          <div className="breadcrumb-wrapper d-flex justify-content-start align-items-center mb-5">
            <div className="breadcrumb-header">
              <h2> View Samples</h2>
            </div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard">
                    <i className="fas fa-home" />
                  </NavLink>
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard">Manage Case</NavLink>
                </li>
                <li className="breadcrumb-item">
                  <NavLink to="/dashboard/case">View List Case</NavLink>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  View Samples
                </li>
              </ol>
            </nav>
          </div>
          <div className="list-code-option-bar-wrapper d-flex justify-content-between align-items-center">
            <div className="add-option d-flex justify-content-between align-items-center">

              <div className="btn-add-code mr-4">
                <NavLink to={`/dashboard/case/${match.params.caseid}/add`}>
                  <i className="fas fa-plus mr-2" />
                  Add New Sample
                </NavLink>
              </div>
              <div className="btn-add-code">
                <button onClick={this.handleOpenModal}>
                  <i className="fas fa-plus mr-2" />
                  Clone Sample
                </button>
              </div>
            </div>

            <div className="search-option">
              <input
                type="text"
                name="keyword"
                className="input-search"
                onChange={this.onChange}
                placeholder="Search sample code"
              />
              <button type="button">
                <i className="fas fa-search" onClick={this.onSearch} />
              </button>
            </div>
          </div>

          <div className="list-code-content">
            <div className="table-responsive">
              <table className="table table-borderless table-custom">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Code</th>
                    <th scope="col">Collector</th>

                    <th scope="col">Deliverer</th>

                    <th scope="col">Receiver</th>

                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{this.props.children}</tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    caseiditem: state.caseiditem,
    samplelistbycaseid: state.samplelistbycaseid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetIdItem: caseId => {
      dispatch(getCaseIdRequest(caseId));
    },
    onFilter: keyword => {
      dispatch(searchSample(keyword));
    },
    onGetSampleByCaseId: caseid => {
      dispatch(getSampleByCaseIdRequest(caseid));
    },
    onAddSample: (dataSample) => {
      dispatch(addSampleRequest(dataSample));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardListSample);
