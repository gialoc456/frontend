import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ExcelRenderer } from "react-excel-renderer";

import Steps, { Step } from "rc-steps";
import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";
import StepExtract from "./../StepExtract/StepExtract";
import StepElectro from "./../StepElectro/StepElectro";
import StepPRC from "./../StepPRC/StepPRC";
import StepPurify from "./../StepPurify/StepPurify";
import StepResult from "./../StepResult/StepResult";
import "./DashboardListSampleAddStep.css";
import {
  getSampleIdRequest,
  updateStatusSampleIdRequest,
  addExtractStepBySampleIdRequest,
  getExtractStepBySampleIdRequest,
  editExtractStepBySampleIdRequest,
  addPRCStepBySampleIdRequest,
  getPRCStepBySampleIdRequest,
  editPRCStepBySampleIdRequest,
  getElectroStepBySampleIdRequest,
  editElectroStepBySampleIdRequest,
  addElectroStepBySampleIdRequest,
  // getValueExtractStepBySampleIdRequest,
  addPurifyStepBySampleIdRequest,
  getPurifyStepBySampleIdRequest,
  editPurifyStepBySampleIdRequest,
  getResultStepBySampleIdRequest,
  addResultStepBySampleIdRequest,
  editResultStepBySampleIdRequest,
  getKitRequest,
  getKitUpdateRequest,
  getKitExtractStepRequest,
  getKitPRCStepRequest,
  getKitElectroStepRequest,
  getKitPurifyStepRequest,
  getSystemRequest,
  getSelectExtractADNSystemRequest,
  getSelectExtractExtractSystemRequest,
  getSelectPRCPRCSystemRequest,
  getSelectElectroElectroSystemRequest
} from "../../actions";
import {
  addExtractLogRequest,
  getExtractLogBySampleIdRequest,
  getPCRLogBySampleIdRequest
} from "../../actions/historyLog";
class DashboardListSampleAddStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: [
        {
          title: "Extract Step"
        },
        {
          title: "PRC Step"
        },
        {
          title: "Electrophoresis Step"
        },
        {
          title: "Purify Step"
        },
        {
          title: "Result Step"
        }
      ],
      testStep: "",
      idExtractStep: "",
      idPRCStep: "",
      idElectroStep: "",
      idPurifyStep: "",
      idResultStep: "",
      //Extract Step
      extractGdgSignal: "",
      extractStartDate: new Date(),
      extractEndDate: new Date(),
      // extractSystem: "",
      extractKit: "",
      extractADNSystem: "",
      extractExtractSystem: "",
      extractAmount: "",
      extractNote: "",
      extractStatus: 0,
      extractStepPosition: "",
      //PRC Step
      prcStartDate: new Date(),
      prcEndDate: new Date(),
      prcPRCSystem: "",
      prcNote: "",
      prcKit: "",
      prcStatus: 0,
      prcStepPosition: "",
      //Electrophoresis Step
      electroStartDate: new Date(),
      electroEndDate: new Date(),
      electroElectroSystem: "",
      electroGelsName: "",
      electroStatus: 0,
      electroStepPosition: "",
      electroKit: "",
      //Purify Step
      purifyStartDate: new Date(),
      purifyEndDate: new Date(),
      purifyNote: "",
      purifyStatus: 0,
      purifyStepPosition: "",
      purifyKit: "",
      //Result Step
      resultStartDate: new Date(),
      resultEndDate: new Date(),
      resultNote: "",
      // resultStepPosition: "",
      resultSoftware: "",
      resultFile: {},

      done: false,
      currentStep: 1,
      optionKitExtract: [],
      optionKitPCR:[],
      optionExtractSystem: [],
      optionPCRSystem: [],
      optionElectroSystem:[],
      optionKitPurify:[] // Default is Step 1
    };
  }

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { match } = this.props;
    const {
      extractstepbysampleid,
      prcstepbysampleid,
      electrostepbysampleid,
      purifystepbysampleid,
      resultstepbysampleid,
      kitlist,
      systemlist,
      kit
    } = nextProps;
   
    if (this.props.kitlist !== nextProps.kitlist) {
      var dataKitExtract = kitlist.filter((a,i) => {
        return a.Category === "ExtractStep"
      })
      var dataKitPCR = kitlist.filter((a,i) => {
        return a.Category === "PCRStep"
      })
      var dataKitPurify = kitlist.filter((a,i) => {
        return a.Category === "PurifyStep"
      })
      var optionKitExtract = [];
      var optionKitPCR = [];
      var optionKitPurify = [];
      dataKitExtract.forEach(elem => {
        var newObjKitExtract = {
          data: elem,
          value: elem.ID,
          label: elem.Name
        };
        optionKitExtract.push(newObjKitExtract);
      });
      dataKitPCR.forEach(elem => {
        var newObjKitPCR = {
          data: elem,
          value: elem.ID,
          label: elem.Name
        };
        optionKitPCR.push(newObjKitPCR);
      });
      dataKitPurify.forEach(elem => {
        var newObjKitPurify = {
          data: elem,
          value: elem.ID,
          label: elem.Name
        };
        optionKitPurify.push(newObjKitPurify);
      });
      this.setState(
        {
          optionKitExtract: optionKitExtract,
          optionKitPCR:optionKitPCR,
          optionKitPurify:optionKitPurify
        }
      );
    }
    if (this.props.systemlist !== nextProps.systemlist) {
      var dataExtractSystem = systemlist.filter((a, i) => {
        return a.Category === "ExtractStep";
      });
      var dataPCRSystem = systemlist.filter((a, i) => {
        return a.Category === "PCRStep";
      });
      var dataElectroSystem = systemlist.filter((a, i) => {
        return a.Category === "ElectrophoresisStep";
      });
      var optionExtractSystem = [];
      var optionPCRSystem = [];
      var optionElectroSystem = [];
      dataExtractSystem.forEach(elem => {
        var newObjExtractSystem = {
          data: elem,
          value: elem.ID,
          label: elem.Name
        };
        optionExtractSystem.push(newObjExtractSystem);
      });
      dataPCRSystem.forEach(elem => {
        var newObjPCRSystem = {
          data: elem,
          value: elem.ID,
          label: elem.Name
        };
        optionPCRSystem.push(newObjPCRSystem);
      });
      dataElectroSystem.forEach(elem => {
        var newObjELectroSystem = {
          data: elem,
          value: elem.ID,
          label: elem.Name
        };
        optionElectroSystem.push(newObjELectroSystem);
      });
  
      this.setState(
        {
          optionExtractSystem: optionExtractSystem,
          optionPCRSystem: optionPCRSystem,
          optionElectroSystem: optionElectroSystem
        }
      );
    }
    if (this.props.extractstepbysampleid !== nextProps.extractstepbysampleid) {
      if (this.isEmpty(extractstepbysampleid)) {
      } else {
        this.props.onGetKitExtract(extractstepbysampleid.KitID);
        this.props.onGetSelectExtractADNSystem(extractstepbysampleid.SystemIDADN);
        this.props.onGetSelectExtractExtractSystem(extractstepbysampleid.SystemIDExtract)
      }
    }
    if (this.props.prcstepbysampleid !== nextProps.prcstepbysampleid) {
      if (this.isEmpty(prcstepbysampleid)) {
      } else {
        this.props.onGetKitPRC(prcstepbysampleid.KitID);
        this.props.onGetSelectPRCPRCSystem(prcstepbysampleid.SystemID)
      }
    }
    if (this.props.electrostepbysampleid !== nextProps.electrostepbysampleid) {
      if (this.isEmpty(electrostepbysampleid)) {
      } else {
        this.props.onGetSelectElectroElectroSystem(electrostepbysampleid.SystemID);
      }
    }
    if (this.props.purifystepbysampleid !== nextProps.purifystepbysampleid) {
      if (this.isEmpty(purifystepbysampleid)) {
      } else {
        this.props.onGetKitPurify(purifystepbysampleid.KitID);
      }
    }
    // if (this.props.prcstepbysampleid !== nextProps.prcstepbysampleid) {
    //     if (prcstepbysampleid) {
    //       this.props.onGetKitById(prcstepbysampleid.KitID);
    //     }
    //   }

    // console.log("WILL RECEIVE PROPS");
    if (
      extractstepbysampleid ||
      prcstepbysampleid ||
      electrostepbysampleid ||
      purifystepbysampleid ||
      resultstepbysampleid.length > 0
    ) {
      if (this.isEmpty(extractstepbysampleid)) {
        // console.log("CHẠY Vào EXTRACT");
        this.setState({
          currentStep: 1
        });
      } else if (this.isEmpty(prcstepbysampleid)) {
        // console.log("CHẠY Vào PRC");
        this.setState({
          currentStep: 2
        });
      } else if (this.isEmpty(electrostepbysampleid)) {
        console.log("CHẠY VÀO ELECTRON");
        this.setState({
          currentStep: 3
        });
      } else if (this.isEmpty(purifystepbysampleid)) {
        console.log("CHẠY VÀO PURIFY");
        this.setState({
          currentStep: 4
        });
      } else {
        this.setState({
          currentStep: 5
        });
        console.log("KHÔNG CHẠY");
      }
    }
  }

  componentDidMount() {
    console.log("DID");
    var { match } = this.props;

    // this.props.onGetSampleId(match.params.caseid, match.params.sampleid);

    this.props.onGetExtractStepBySampleId(match.params.sampleid);
    this.props.onGetPRCStepBySampleId(match.params.sampleid);
    this.props.onGetElectroStepBySampleId(match.params.sampleid);
    this.props.onGetPurifyStepBySampleId(match.params.sampleid);
    this.props.onGetResultStepBySampleId(match.params.sampleid);
    
    this.props.onGetKit();
    this.props.onGetSystems();

    this.props.onGetExtractLogBySampleId(match.params.sampleid)
    this.props.onGetPCRLogBySampleId(match.params.sampleid)
    // this.props.onGetResultStepBySampleId(
    //   match.params.sampleid
    // );
    // this.props.onGetExtractLog(
    //   match.params.caseid,
    //   match.params.sampleid,
    //   this.state.idExtractStep
    // );
  }
  next = () => {
    // console.log("NEXT");
    const {
      match,
      extractstepbysampleid,
      prcstepbysampleid,
      electrostepbysampleid,
      purifystepbysampleid,
      datafromtoken,
      datalogin
    } = this.props;
    const {
      // EXTRACT STEP
      extractGdgSignal,
      extractKit,
      extractADNSystem,
      extractExtractSystem,
      extractSystem,
      extractStartDate,
      extractEndDate,
      extractAmount,
      extractNote,
      extractStatus,
      // extractStepPosition,

      // PRC STEP
      prcStartDate,
      prcEndDate,
      prcPRCSystem,
      
      prcNote,
      prcStatus,
      prcKit,
      // prcStepPosition

      // ELECTROPHORESIS STEP
      electroStartDate,
      electroEndDate,
      electroElectroSystem,
      electroGelsName,
      electroStatus,
      // electroStepPosition,
      electroKit,

      // PURIFY STEP
      purifyStartDate,
      purifyEndDate,
      purifyNote,
      purifyStatus,
      // purifyStepPosition,
      purifyKit
    } = this.state;
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 4 ? 5 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
    console.log(datalogin);
    // var status = {
    //   status: 0
    // };
    // this.props.onUpdateStatusSampleId(
    //   status,
    //   match.params.sampleid
    // );
    if (this.state.currentStep === 1) {
      if (this.isEmpty(extractstepbysampleid)) {
        console.log("ADD dc");
        this.props.onAddExtractStepBySampleId({
          GDGSignal: extractGdgSignal,
          StartDate: extractStartDate,
          EndDate: extractEndDate,
          // ExtractSystem: extractSystem,
          Amount: extractAmount,
          Note: extractNote,
          Status: 2,
          StepPosition: 1,
          UserID: datafromtoken.userId,
          KitID: extractKit.value,
          SamplesID: parseInt(match.params.sampleid),
          SystemIDADN: extractADNSystem.value,
          SystemIDExtract:extractExtractSystem.value,
          ExtractLogID: 1
        });
      } else {
        console.log("PUT dc");
        this.props.onEditExtractStepBySampleId(
          {
            ID: extractstepbysampleid.ID,
            GDGSignal: extractGdgSignal,
            StartDate: extractStartDate,
            EndDate: extractEndDate,
            // ExtractSystem: extractSystem,
            Amount: extractAmount,
            Note: extractNote,
            Status: 2,
            StepPosition: 1,
            UserID: datafromtoken.userId,
            KitID: extractKit.value,
            SamplesID: parseInt(match.params.sampleid),
            SystemIDADN: extractADNSystem.value,
          SystemIDExtract:extractExtractSystem.value,
            ExtractLogID: 1
          },
          extractstepbysampleid.ID,
          datalogin.Username
        );
      }
    } else if (this.state.currentStep === 2) {
      if (this.isEmpty(prcstepbysampleid)) {
        this.props.onAddPRCStepBySampleId({
          StartDate: prcStartDate,
          EndDate: prcEndDate,
          Note: prcNote,
          Status: 2,
          StepPosition: 2,
          SamplesID: parseInt(match.params.sampleid),
          KitID: prcKit.value,
          UserID: datafromtoken.userId,
          SystemID: prcPRCSystem.value
        });
      } else {
        this.props.onEditPRCStepBySampleId(
          {
            ID: prcstepbysampleid.ID,
            StartDate: prcStartDate,
            EndDate: prcEndDate,
            Note: prcNote,
            Status: 2,
            StepPosition: 2,
            SamplesID: parseInt(match.params.sampleid),
            KitID: prcKit.value,
            UserID: datafromtoken.userId,
            SystemID: prcPRCSystem.value
          },
          prcstepbysampleid.ID,
          datalogin.Username
        );
      }
    } else if (this.state.currentStep === 3) {
      if (this.isEmpty(electrostepbysampleid)) {
        this.props.onAddElectroStepBySampleId({
          StartDate: electroStartDate,
          EndDate: electroEndDate,
         
          GelName: electroGelsName,
          Status: 2,
          StepPosition: 3,
          UserID: datafromtoken.userId,
          // KitID: electroKit.value,
          SamplesID: parseInt(match.params.sampleid),
          SystemID: electroElectroSystem.value
        });
      } else {
        this.props.onEditElectroStepBySampleId(
          {
            ID: electrostepbysampleid.ID,
            StartDate: electroStartDate,
            EndDate: electroEndDate,
           
            GelName: electroGelsName,
            Status: 2,
            StepPosition: 3,
            UserID: datafromtoken.userId,
            // KitID: electroKit.value,
            SamplesID: parseInt(match.params.sampleid),
            SystemID:  electroElectroSystem.value
          },
          electrostepbysampleid.ID,
          datalogin.Username
        );
      }
    } else if (this.state.currentStep === 4) {
      console.log("PURIFY STEPPPPPPP");
      if (this.isEmpty(purifystepbysampleid)) {
        this.props.onAddPurifyStepBySampleId({
          StartDate: purifyStartDate,
          EndDate: purifyEndDate,
          Note: purifyNote,
          KitID: purifyKit.value,
          Status: 2,
          StepPosition: 4,
          UserID: datafromtoken.userId,
          SamplesID: parseInt(match.params.sampleid)
        });
      } else {
        this.props.onEditPurifyStepBySampleId(
          {
            ID: purifystepbysampleid.ID,
            StartDate: purifyStartDate,
            EndDate: purifyEndDate,
            Note: purifyNote,
            KitID: purifyKit.value,
            Status: 2,
            StepPosition: 4,
            UserID: datafromtoken.userId,
            SamplesID: parseInt(match.params.sampleid)
          },
          purifystepbysampleid.ID,
          datalogin.Username
        );
      }
    }
  };

  prev = () => {
    let { currentStep } = this.state;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };
  historyBtn = () => {
    let { currentStep } = this.state;
    if (currentStep !== 1) {
      return (
        <button type="button" className="btn btn-primary" onClick={this.prev}>
          Back
        </button>
      );
    } else {
      return null;
    }
  };
  prevBtn = () => {
    let { currentStep } = this.state;
    if (currentStep !== 1) {
      return (
        <button type="button" className="btn btn-primary" onClick={this.prev}>
          Back
        </button>
      );
    } else {
      return null;
    }
  };

  nextBtn = () => {
    let { currentStep } = this.state;
    if (currentStep < 5) {
      return (
        <button
          type="button"
          className="btn btn-success ml-auto"
          onClick={this.next}
        >
          Next
        </button>
      );
    } else {
      return null;
    }
  };
  submitBtn = () => {
    let { currentStep } = this.state;
    if (currentStep === 5) {
      return (
        <button
          type="button"
          className="btn btn-success ml-auto"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      );
    } else {
      return null;
    }
  };
  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };
  handleChangeClick = () => {
    this.setState(
      {
        done: !this.state.done
      },
      () => {
        console.log(this.state.done);
      }
    );
  };
  fileHandler = e => {
    let fileObj = e.target.files[0];
    console.log(fileObj);
    //just pass the fileObj as parameter
    if (fileObj) {
      ExcelRenderer(fileObj, (err, resp) => {
        console.log(resp);
        if (err) {
          console.log(err);
        } else {
          this.setState({
            resultFile: resp
          });
        }
      });
    }
  };

  // Handle Select

  handleChangeSelectExtract = extractKit => {
    this.setState({
      extractKit
    });
  };
  handleChangeSelectExtractADNSystem = extractADNSystem => {
    this.setState({
      extractADNSystem
    });
  };
  handleChangeSelectExtractExtractSystem = extractExtractSystem => {
    this.setState({
      extractExtractSystem
    });
  };
  handleChangeSelectPRC = prcKit => {
    this.setState({
      prcKit
    });
  };
  handleChangeSelectPRCSystem = prcPRCSystem => {
    this.setState({
      prcPRCSystem
    });
  };
 
  handleChangeSelectElectro = electroKit => {
    this.setState({
      electroKit
    });
  };
  handleChangeSelectElectroSystem = electroElectroSystem => {
    this.setState({
      electroElectroSystem
    });
  };
  handleChangeSelectPurify = purifyKit => {
    this.setState({
      purifyKit
    });
  };

  // Handle Date

  handleChangeExtractStartDate = date => {
    this.setState({
      extractStartDate: date
    });
  };
  handleChangeExtractEndDate = date => {
    this.setState({
      extractEndDate: date
    });
  };
  handleChangePRCStartDate = date => {
    this.setState({
      prcStartDate: date
    });
  };
  handleChangePRCEndDate = date => {
    this.setState({
      prcEndDate: date
    });
  };
  handleChangeElectroStartDate = date => {
    this.setState({
      electroStartDate: date
    });
  };
  handleChangeElectroEndDate = date => {
    this.setState({
      electroEndDate: date
    });
  };
  handleChangePurifyStartDate = date => {
    this.setState({
      purifyStartDate: date
    });
  };
  handleChangePurifyEndDate = date => {
    this.setState({
      purifyEndDate: date
    });
  };
  handleChangeResultStartDate = date => {
    this.setState({
      resultStartDate: date
    });
  };
  handleChangeResultEndDate = date => {
    this.setState({
      resultEndDate: date
    });
  };

  // Hande Submit

  handleSubmit = e => {
    const { resultstepbysampleid, datalogin, datafromtoken } = this.props;
    const {
      // RESULT STEP
      resultStartDate,
      resultEndDate,
      resultNote,
      done,
      // resultStepPosition,
      resultSoftware,
      resultFile
    } = this.state;
    var { match, history } = this.props;
    e.preventDefault();
    if (this.state.currentStep === 5) {
      console.log("RESULT STEPPPPPPP");
      if (resultstepbysampleid.length > 0) {
        this.props.onEditResultStepBySampleId(
          {
            ID: resultstepbysampleid[0].ID,
            StartDate: resultStartDate,
            EndDate: resultEndDate,
            Note: resultNote,
            Software: resultSoftware,
            Files: resultFile,
            Status: done === true ? 1 : 0,
            UserID: datafromtoken.userId,
            SamplesID: parseInt(match.params.sampleid)
          },
          resultstepbysampleid[0].ID
          // datalogin.Username
        );
      } else {
        console.log("Nhỏ hơn 0 ");
        this.props.onAddResultStepBySampleId({
          StartDate: resultStartDate,
          EndDate: resultEndDate,
          Note: resultNote,
          Software: resultSoftware,
          Files: resultFile,
          Status: done === true ? 1 : 0,
          UserID: datafromtoken.userId,
          SamplesID: parseInt(match.params.sampleid)
        });
      }
    }

    // var status = {
    //   status: this.state.done === 1 ? 1 : 0
    // };
    // this.props.onUpdateStatusSampleId(
    //   status,
    //   match.params.sampleid
    // );

    history.push(`/dashboard/case/${match.params.caseid}`);
  };

  setCurrent = index => {
    this.setState({
      currentStep: index
    });
  };

  componentDidUpdate(prevProps) {
    console.log(prevProps);

    if (this.props.kitextract !== prevProps.kitextract) {
      var newObjExtract = {
        data: this.props.kitextract,
        value: this.props.kitextract.ID,
        label: this.props.kitextract.Name
      };

      this.setState({
        extractKit: newObjExtract
      });
    }
    if (this.props.extractadnsystem !== prevProps.extractadnsystem) {
      var newObjSelectADN = {
        data: this.props.extractadnsystem,
        value: this.props.extractadnsystem.ID,
        label: this.props.extractadnsystem.Name
      };

      this.setState({
        extractADNSystem: newObjSelectADN
      });
    }
    if (this.props.extractextractsystem !== prevProps.extractextractsystem) {
      var newObjSelectExtract = {
        data: this.props.extractextractsystem,
        value: this.props.extractextractsystem.ID,
        label: this.props.extractextractsystem.Name
      };

      this.setState({
        extractExtractSystem: newObjSelectExtract
      });
    }
    if (this.props.kitprc !== prevProps.kitprc) {
      var newObjPRC = {
        data: this.props.kitprc,
        value: this.props.kitprc.ID,
        label: this.props.kitprc.Name
      };

      this.setState({
        prcKit: newObjPRC
      });
    }
    if (this.props.prcprcsystem !== prevProps.prcprcsystem) {
      var newObjSelectPRC = {
        data: this.props.prcprcsystem,
        value: this.props.prcprcsystem.ID,
        label: this.props.prcprcsystem.Name
      };

      this.setState({
        prcPRCSystem: newObjSelectPRC
      });
    }
    if (this.props.electroelectrosystem !== prevProps.electroelectrosystem) {
      var newObjSelectElectro = {
        data: this.props.electroelectrosystem,
        value: this.props.electroelectrosystem.ID,
        label: this.props.electroelectrosystem.Name
      };

      this.setState({
        electroElectroSystem: newObjSelectElectro
      });
    }
    // if (this.props.kitelectro !== prevProps.kitelectro) {
    //   var newObjElectro = {
    //     data: this.props.kitelectro,
    //     value: this.props.kitelectro.ID,
    //     label: this.props.kitelectro.Category
    //   };

    //   this.setState({
    //     electroKit: newObjElectro
    //   });
    // }
    if (this.props.kitpurify !== prevProps.kitpurify) {
      var newObjPurify = {
        data: this.props.kitpurify,
        value: this.props.kitpurify.ID,
        label: this.props.kitpurify.Name
      };

      this.setState({
        purifyKit: newObjPurify
      });
    }

    if (this.props.extractstepbysampleid !== prevProps.extractstepbysampleid) {
      var currentValueExtractStep = this.props.extractstepbysampleid;
      if (this.isEmpty(currentValueExtractStep)) {
        this.setState({
          extractAmount: "",
          extractEndDate: new Date(),
          extractStartDate: new Date(),
          extractKit: "",
          extractADNSystem:"",
          extractExtractSystem:"",
          // extractSystem: "",
          extractGdgSignal: "",
          extractNote: "",
          extractStatus: 0
        });
      } else {
        console.log("here");
        console.log(currentValueExtractStep);
        this.setState({
          extractAmount: currentValueExtractStep.Amount,
          extractEndDate: new Date(currentValueExtractStep.EndDate),
          extractStartDate: new Date(currentValueExtractStep.StartDate),
          extractKit: currentValueExtractStep.extractKit,
          extractADNSystem:currentValueExtractStep.extractADNSystem,
          extractExtractSystem:currentValueExtractStep.extractExtractSystem,
          // extractSystem: currentValueExtractStep.ExtractSystem,
          extractGdgSignal: currentValueExtractStep.GDGSignal,
          extractNote: currentValueExtractStep.Note
        });
      }
    } else if (this.props.prcstepbysampleid !== prevProps.prcstepbysampleid) {
      var currentValuePRCStep = this.props.prcstepbysampleid;
      if (this.isEmpty(currentValuePRCStep)) {
        this.setState({
          prcStartDate: new Date(),
          prcEndDate: new Date(),
          //   prcSystem: "",
          prcPRCSystem:"",
          prcNote: "",
          prcKit: "",
          prcStatus: 0
        });
      } else {
        this.setState({
          prcStartDate: new Date(currentValuePRCStep.StartDate),
          prcEndDate: new Date(currentValuePRCStep.EndDate),
          prcPRCSystem: currentValuePRCStep.prcPRCSystem,
          //   prcSystem: currentValuePRCStep.System,
          prcNote: currentValuePRCStep.Note,
          prcKit: currentValuePRCStep.KitID
        });
      }
    } else if (
      this.props.electrostepbysampleid !== prevProps.electrostepbysampleid
    ) {
      var currentValueElectroStep = this.props.electrostepbysampleid;
      if (this.isEmpty(currentValueElectroStep)) {
        this.setState({
          electroStartDate: new Date(),
          electroEndDate: new Date(),
          electroElectroSystem: "",
          electroGelsName: "",
          // electroKit: "",
          electroStatus: 0
        });
      } else {
        this.setState({
          electroStartDate: new Date(currentValueElectroStep.StartDate),
          electroEndDate: new Date(currentValueElectroStep.EndDate),
          electroElectroSystem: currentValueElectroStep.electroElectroSystem,
          electroGelsName: currentValueElectroStep.GelName
          // electroKit: currentValueElectroStep.KitID
        });
      }
    } else if (
      this.props.purifystepbysampleid !== prevProps.purifystepbysampleid
    ) {
      var currentValuePurifyStep = this.props.purifystepbysampleid;
      if (this.isEmpty(currentValuePurifyStep)) {
        this.setState({
          purifyStartDate: new Date(),
          purifyEndDate: new Date(),
          purifyNote: "",
          purifyKit: "",
          purifyStatus: 0
        });
      } else {
        this.setState({
          purifyStartDate: new Date(currentValuePurifyStep.StartDate),
          purifyEndDate: new Date(currentValuePurifyStep.EndDate),
          purifyNote: currentValuePurifyStep.Note,

          purifyKit: currentValuePurifyStep.purifyKit
        });
      }
    } else if (
      this.props.resultstepbysampleid[0] !== prevProps.resultstepbysampleid[0]
    ) {
      var currentValueResultStep = this.props.resultstepbysampleid[0];
      console.log(currentValueResultStep);
      if (currentValueResultStep) {
        this.setState({
          resultStartDate: new Date(currentValueResultStep.StartDate),
          resultEndDate: new Date(currentValueResultStep.EndDate),
          resultNote: currentValueResultStep.Note,
          resultSoftware: currentValueResultStep.Software,
          resultFile: currentValueResultStep.Files,
          done: currentValueResultStep.Status === 1 ? true : false
        });
      } else {
        this.setState({
          resultStartDate: new Date(),
          resultEndDate: new Date(),
          resultNote: "",
          resultSoftware: "",
          resultFile: {},
          done: this.state.done === true ? true : false
        });
      }
    }
  }
  //    setValueExtractStep = (data) => {
  //     //  console.log("SET VALUE EXTRACT STEP")
  //     // var extract = data[0];
  //     // console.log(extract)
  // console.log(data)
  //     if (data) {
  //      this.setState({

  //         extractAmount: data.amount,
  //         extractEndDate: new Date(data.endDate),
  //         extractStartDate: new Date(data.startDate),
  //         extractKit: data.extractKit,
  //         extractSystem: data.extractSystem,
  //         extractGdgSignal: data.gdgSignal,
  //         extractNote: data.note,
  //         extractStatus: data.status,
  //         extractStepPosition: data.stepPosition

  //      });
  //     }
  //   }
  // setValuePRCStep = data => {
  //   var prc = data[0];
  //   // console.log(prc)
  //   if (data.length > 0) {
  //     this.setState({
  //       prcStartDate: new Date(prc.startDate),
  //       prcEndDate: new Date(prc.endDate),
  //       prcSystem: prc.system,
  //       prcKit: prc.prcKit,
  //       prcNote: prc.note,
  //       prcStatus: prc.status,
  //       prcStepPosition: prc.stepPosition
  //     });
  //   }
  // };
  render() {
    console.log(this.props.kit);
    console.log("RENDER");
    console.log(this.state.resultFile);
    var { match } = this.props;

    const {
      // Extract Step
      idExtractStep,
      extractGdgSignal,
      extractKit,
      extractADNSystem,
      extractExtractSystem,
      extractSystem,
      extractStartDate,
      extractEndDate,
      extractAmount,
      extractNote,
      // extractStatus,
      // extractStepPosition,
      // PRC Step
      idPRCStep,
      prcStartDate,
      prcEndDate,
      prcPRCSystem,
      prcNote,
      prcKit,
      // prcStatus,
      // prcStepPosition
      // Eletrophoresis Step
      idElectroStep,
      electroStartDate,
      electroEndDate,
      electroElectroSystem,
      electroGelsName,
      electroKit,
      // electroStatus,
      // electroStepPosition,
      // Purify Step
      idPurifyStep,
      purifyStartDate,
      purifyEndDate,
      purifyNote,
      purifyKit,
      // purifyStatus,
      // purifyStepPosition,
      // RESULT STEP
      idResultStep,
      resultStartDate,
      resultEndDate,
      resultNote,
      // resultStepPosition,
      resultSoftware,
      resultFile,
      done
    } = this.state;
    this.stepsRefs = [];
    var { currentStep } = this.state;
    var { steps } = this.state;

    return (
      <div className="card card-custom2">
        <div className="card-title mt-5">
          <div className="exit-btn">
            <NavLink to={`/dashboard/case/${match.params.caseid}`}>
              <i className="fas fa-times" />
            </NavLink>
          </div>
          <Steps labelPlacement="vertical" current={currentStep - 1}>
            {steps.map((step, index) => {
              return (
                <Step
                  ref={c => (this.stepsRefs[index] = c)}
                  key={index}
                  title={step.title}
                  onClick={() => this.setCurrent(index + 1)}
                />
              );
            })}
          </Steps>
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <StepExtract
              optionKitExtract={this.state.optionKitExtract}
              optionExtractSystem={this.state.optionExtractSystem}
              match={match}
              currentStep={currentStep}
              handleChange={this.handleChange}
              handleChangeSelectExtract={this.handleChangeSelectExtract}
              handleChangeSelectExtractExtractSystem={
                this.handleChangeSelectExtractExtractSystem
              }
              handleChangeSelectExtractADNSystem={
                this.handleChangeSelectExtractADNSystem
              }
              handleChangeExtractStartDate={this.handleChangeExtractStartDate}
              handleChangeExtractEndDate={this.handleChangeExtractEndDate}
              extractGdgSignal={extractGdgSignal}
              extractKit={extractKit}
              extractADNSystem={extractADNSystem}
              extractExtractSystem={extractExtractSystem}
              extractSystem={extractSystem}
              extractStartDate={extractStartDate}
              extractEndDate={extractEndDate}
              extractAmount={extractAmount}
              extractNote={extractNote}
              idExtractStep={idExtractStep}
              setValueExtractStep={this.setValueExtractStep}
              // extractStatus={extractStatus}
              // extractStepPosition={extractStepPosition}
            />
            <StepPRC
            optionPCRSystem={this.state.optionPCRSystem}
              optionKitPCR={this.state.optionKitPCR}
              match={match}
              currentStep={currentStep}
              handleChange={this.handleChange}
              handleChangeSelectPRC={this.handleChangeSelectPRC}
              handleChangeSelectPRCSystem={this.handleChangeSelectPRCSystem}
              handleChangePRCStartDate={this.handleChangePRCStartDate}
              handleChangePRCEndDate={this.handleChangePRCEndDate}
              prcStartDate={prcStartDate}
              prcEndDate={prcEndDate}
              prcPRCSystem={prcPRCSystem}
              prcNote={prcNote}
              prcKit={prcKit}
              idPRCStep={idPRCStep}
              setValuePRCStep={this.setValuePRCStep}
            />
            <StepElectro
            optionElectroSystem={this.state.optionElectroSystem}
              // optionKit={this.state.optionKit}
              match={match}
              currentStep={currentStep}
              handleChange={this.handleChange}
              handleChangeSelectElectro={this.handleChangeSelectElectro}
              handleChangeSelectElectroSystem={this.handleChangeSelectElectroSystem}
              handleChangeElectroStartDate={this.handleChangeElectroStartDate}
              handleChangeElectroEndDate={this.handleChangeElectroEndDate}
              electroStartDate={electroStartDate}
              electroEndDate={electroEndDate}
              electroElectroSystem={electroElectroSystem}
              electroGelsName={electroGelsName}
              electroKit={electroKit}
              idElectroStep={idElectroStep}
              setValueElectroStep={this.setValueElectroStep}
            />
            <StepPurify
              optionKitPurify={this.state.optionKitPurify}
              match={match}
              currentStep={currentStep}
              handleChange={this.handleChange}
              handleChangeSelectPurify={this.handleChangeSelectPurify}
              handleChangePurifyStartDate={this.handleChangePurifyStartDate}
              handleChangePurifyEndDate={this.handleChangePurifyEndDate}
              purifyStartDate={purifyStartDate}
              purifyEndDate={purifyEndDate}
              purifyNote={purifyNote}
              purifyKit={purifyKit}
              idPurifyStep={idPurifyStep}
              setValuePurifyStep={this.setValuePurifyStep}
            />
            <StepResult
              match={match}
              currentStep={currentStep}
              handleChange={this.handleChange}
              handleChangeResultStartDate={this.handleChangeResultStartDate}
              handleChangeResultEndDate={this.handleChangeResultEndDate}
              handleChangeClick={this.handleChangeClick}
              resultStartDate={resultStartDate}
              resultEndDate={resultEndDate}
              resultNote={resultNote}
              resultSoftware={resultSoftware}
              resultFile={resultFile}
              fileHandler={this.fileHandler}
              done={done}
              idResultStep={idResultStep}
            />
            <div className="navigate-btn d-flex justify-content-between ">
              {this.prevBtn()}
              {this.nextBtn()}
              {this.submitBtn()}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // sampleiditem: state.sampleiditem,
    extractstepbysampleid: state.extractstepbysampleid,
    prcstepbysampleid: state.prcstepbysampleid,
    electrostepbysampleid: state.electrostepbysampleid,
    purifystepbysampleid: state.purifystepbysampleid,
    resultstepbysampleid: state.resultstepbysampleid,
    extractlog: state.extractlog,
    datafromtoken: state.datafromtoken,
    datalogin: state.datalogin,
    kitlist: state.kitlist,
    kit: state.kit,
    kitextract: state.kitextract,
    extractadnsystem: state.extractadnsystem,
    extractextractsystem: state.extractextractsystem,
    kitprc: state.kitprc,
    prcprcsystem:state.prcprcsystem,
    kitelectro: state.kitelectro,
    electroelectrosystem:state.electroelectrosystem,
    kitpurify: state.kitpurify,
    systemlist: state.systemlist
    // valueextractstepbysampleid: state.valueextractstepbysampleid
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetSampleId: (caseId, sampleId) => {
      dispatch(getSampleIdRequest(caseId, sampleId));
    },
    onUpdateStatusSampleId: (status, sampleId, username) => {
      dispatch(updateStatusSampleIdRequest(status, sampleId, username));
    },
    // GET SYSTEM
    onGetSystems: () => {
      dispatch(getSystemRequest());
    },

    // ADD STEP
    onAddExtractStepBySampleId: extractData => {
      dispatch(addExtractStepBySampleIdRequest(extractData));
    },
    onAddPRCStepBySampleId: prcData => {
      dispatch(addPRCStepBySampleIdRequest(prcData));
    },
    onAddElectroStepBySampleId: electroData => {
      dispatch(addElectroStepBySampleIdRequest(electroData));
    },
    onAddPurifyStepBySampleId: purifyData => {
      dispatch(addPurifyStepBySampleIdRequest(purifyData));
    },
    onAddResultStepBySampleId: resultData => {
      dispatch(addResultStepBySampleIdRequest(resultData));
    },

    // GET STEP
    onGetExtractStepBySampleId: sampleId => {
      dispatch(getExtractStepBySampleIdRequest(sampleId));
    },
    onGetPRCStepBySampleId: sampleId => {
      dispatch(getPRCStepBySampleIdRequest(sampleId));
    },
    onGetElectroStepBySampleId: sampleId => {
      dispatch(getElectroStepBySampleIdRequest(sampleId));
    },
    onGetPurifyStepBySampleId: sampleId => {
      dispatch(getPurifyStepBySampleIdRequest(sampleId));
    },
    onGetResultStepBySampleId: sampleId => {
      dispatch(getResultStepBySampleIdRequest(sampleId));
    },

    // EDIT STEP
    onEditExtractStepBySampleId: (extractDataEdit, extractId, username) => {
      dispatch(
        editExtractStepBySampleIdRequest(extractDataEdit, extractId, username)
      );
    },
    onEditPRCStepBySampleId: (prcDataEdit, prcId, username) => {
      dispatch(editPRCStepBySampleIdRequest(prcDataEdit, prcId, username));
    },
    onEditElectroStepBySampleId: (electroDataEdit, prcId, username) => {
      dispatch(
        editElectroStepBySampleIdRequest(
          electroDataEdit,

          prcId,
          username
        )
      );
    },
    onEditPurifyStepBySampleId: (
      purifyDataEdit,

      purifyId,
      username
    ) => {
      dispatch(
        editPurifyStepBySampleIdRequest(
          purifyDataEdit,

          purifyId,
          username
        )
      );
    },
    onEditResultStepBySampleId: (
      resultDataEdit,

      resultId
      // username
    ) => {
      dispatch(
        editResultStepBySampleIdRequest(
          resultDataEdit,

          resultId
          // username
        )
      );
    },

    // GET LOG
    onGetExtractLogBySampleId: (sampleid) => {
      dispatch(getExtractLogBySampleIdRequest(sampleid));
    },
    onGetPCRLogBySampleId: (sampleid) => {
      dispatch(getPCRLogBySampleIdRequest(sampleid))
    },

    // GET KIT
    onGetKit: () => {
      dispatch(getKitRequest());
    },
    onGetKitById: id => {
      dispatch(getKitUpdateRequest(id));
    },

    // GET KIT STEP BY ID

    onGetKitExtract: id => {
      dispatch(getKitExtractStepRequest(id));
    },
    onGetSelectExtractADNSystem: id => {
      dispatch(getSelectExtractADNSystemRequest(id));
    },
    onGetSelectExtractExtractSystem: id => {
      dispatch(getSelectExtractExtractSystemRequest(id));
    },
    onGetKitPRC: id => {
      dispatch(getKitPRCStepRequest(id));
    },
    onGetSelectPRCPRCSystem: id => {
      dispatch(getSelectPRCPRCSystemRequest(id))
    },
    onGetKitElectro: id => {
      dispatch(getKitElectroStepRequest(id));
    },
    onGetSelectElectroElectroSystem: id => {
      dispatch(getSelectElectroElectroSystemRequest(id))
    },
    onGetKitPurify: id => {
      dispatch(getKitPurifyStepRequest(id));
    }

    // onGetValueExtractStepBySampleId: (caseId, sampleId, extractId) => {
    //   dispatch(
    //     getValueExtractStepBySampleIdRequest(caseId, sampleId, extractId)
    //   );
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardListSampleAddStep);
