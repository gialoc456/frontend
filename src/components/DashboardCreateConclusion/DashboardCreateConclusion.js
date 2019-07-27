import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./DashboardCreateConclusion.css";
import {
  getLitigantRequest,
  getSampleByLitigantIdRequest,
  getResultStepBySampleIdRequestV2,
  getUsersRequest
} from "../../actions";
// import Axios from "axios";
// const options = [
//   { value: "Kit 1", label: "Kit 1" },
//   { value: "Kit 2", label: "Kit 2" },
//   { value: "Kit 3", label: "Kit 3" },
//   { value: "Kit 4", label: "Kit 4" },
//   { value: "Kit 5", label: "Kit 5" }
// ];

class DashboardCreateConclusion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearable: true,
      isDisabled: true,
      valueLitigant: [],
      valueSample: [],
      valueUser:[],
      optionsLitigant: [],
      optionsSample: [],
      optionsUsers: []
    };
  }

  componentWillReceiveProps({ litigantlist, samplebylitigantid, userslist },nextProps) {

    let arrLitigant = [];
    let arrSample = [];
    let arrUsers = [];
    console.log(nextProps)
    userslist.forEach(element => {
      const newObj = {  
        data: element,
        value: element.ID,
        label: element.Name
      };
      arrUsers.push(newObj);
    });
    litigantlist.forEach(element => {
      const newObj = {
        data: element,
        value: element.ID,
        label: element.Name
      };
      arrLitigant.push(newObj);
    });
    samplebylitigantid.forEach(element => {
      const newObj = {  
        data: element,
        value: element.ID,
        label: element.Name
      };
      arrSample.push(newObj);
    });
    this.setState({
      optionsUsers: arrUsers,
      optionsSample: arrSample,
      optionsLitigant: arrLitigant
    });
  
  }

  componentDidMount() {
    //    Axios.get("https://5d009f68d021760014b75103.mockapi.io/litigant").then((res) => {
    //        this.setState({
    //            options:res.data
    //        })
    //    })
    this.props.onGetLitigant();
    this.props.onGetUsers();
  }
  handleChangeSelectLitigant = valueLitigant => {
    this.setState({
      valueLitigant
    });

    if (valueLitigant) {
      this.props.onGetSampleByLitigantId(valueLitigant.data.ID);
      this.setState({
        isDisabled: false,
        valueSample: null
      });
    } else {
      this.setState({
        isDisabled: true,
        valueSample: null
      });
    }
  };
  handleChangeSelectSample = valueSample => {
    this.setState({
      valueSample
    },() => {
      console.log(this.state.valueSample)
    });
    // Axios.get(`https://5d009f68d021760014b75103.mockapi.io/litigant/${va}/sample/:id/resultstep`)
    // ")
  };
  handleChangeSelectUser = (valueUser) => {
    this.setState({
      valueUser
    },() => {
      console.log(this.state.valueUser)
    })
  }

  onSubmit = e => {
    const { history } = this.props;
    e.preventDefault();
    history.push({
      pathname: "/dashboard/conclusion/generate",
      dataLitigant: this.state.valueLitigant,
      dataSample: this.state.valueSample,
      dataUser:this.state.valueUser
    });
    // console.log(this.state.valueLitigant)
    // console.log(this.state.valueSample)
  };

  render() {
 
    const {
      isClearable,
      optionsLitigant,
      optionsSample,
      optionsUsers,
      valueLitigant,
      valueSample,
      valueUser,
      isDisabled
    } = this.state;
    return (
      <Fragment>
        <div className="create-conclusion-wrapper">
          <div className="container">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="selectLitigant" className="input-label">
                      Select Litigant
                    </label>
                    <Select
                      id="selectLitigant"
                      value={valueLitigant}
                      onChange={this.handleChangeSelectLitigant}
                      name="selectLitigant"
                      isClearable={isClearable}
                      options={optionsLitigant}
                      placeholder="Select Litigant"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="selectSample" className="input-label">
                      Select Sample
                    </label>
                    <Select
                      id="selectSample"
                      value={valueSample}
                      onChange={this.handleChangeSelectSample}
                      name="selectSample"
                      isClearable={isClearable}
                      options={optionsSample}
                      placeholder="Select Sample"
                      isDisabled={isDisabled}
                      isMulti
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="selectUsers" className="input-label">
                      Select Users
                    </label>
                    <Select
                      id="selectUsers"
                      value={valueUser}
                      onChange={this.handleChangeSelectUser}
                      name="selectUsers"
                      isClearable={isClearable}
                      options={optionsUsers}
                      placeholder="Select Users"
                      isDisabled={isDisabled}
                      isMulti
                    />
                  </div>
                </div>

                <div className="generate-btn">
                  <button>Generate</button>
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
    userslist: state.userslist,
    litigantlist: state.litigantlist,
    samplebylitigantid: state.samplebylitigantid,
    resultstepbysampleid: state.resultstepbysampleid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetLitigant: () => {
      dispatch(getLitigantRequest());
    },
    onGetUsers: () => {
      dispatch(getUsersRequest())
    },
    onGetSampleByLitigantId: litigantId => {
      dispatch(getSampleByLitigantIdRequest(litigantId));
    },
    onGetResultStepBySampleId: (litigantId, sampleId) => {
      dispatch(getResultStepBySampleIdRequestV2(litigantId, sampleId));
    },
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardCreateConclusion);
