import apiCall from "../utils/apiCaller";
import * as Types from "./../constants/ActionTypes";
import firebase from "./../config/fbConfig.js";
import jwt from "jsonwebtoken";


export const searchCase = filter => {
  return {
    type: Types.SEARCH_CASE,
    filter: filter
  };
};


export const addSampleRequest = sampleItem => {
  return dispatch => {
    return apiCall(`api/Sample`, "POST", sampleItem, null).then(res => {
      dispatch(addSample(res.data));
    });
  };
};

export const addSample = sampleItem => {
  return {
    type: Types.ADD_SAMPLE,
    sampleItem
  };
};

export const getSampleIdRequest = sampleId => {
  return dispatch => {
    return apiCall(`api/Sample?id=${sampleId}`, "GET", null, null).then(res => {
      dispatch(getSampleId(res.data));
    });
  };
};

export const getSampleId = sampleIdItem => {
  return {
    type: Types.VIEW_SAMPLE,
    sampleIdItem
  };
};

export const updateStatusSampleIdRequest = (status, sampleid) => {
  return dispatch => {
    return apiCall(`api/Samples/${sampleid}}`, "PUT", status, null).then(
      res => {
        dispatch(updateStatusSampleId(res.data));
      }
    );
  };
};
export const updateStatusSampleId = statusData => {
  return {
    type: Types.UPDATE_SAMPLE_STATUS,
    statusData
  };
};
export const searchSample = keyword => {
  return {
    type: Types.SEARCH_SAMPLE,
    keyword
  };
};

export const getResultStepBySampleIdRequestV2 = (litigantId, sampleId) => {
  return dispatch => {
    return apiCall(
      `litigant/${litigantId}/sample/${sampleId}/resultstep`,
      "GET",
      null,
      null
    ).then(res => {
      dispatch(getResultStepBySampleIdV2(res.data));
    });
  };
};
export const getResultStepBySampleIdV2 = resultStepDataFromSampleId => {
  return {
    type: Types.GET_RESULT_STEP_BY_SAMPLE_ID,
    resultStepDataFromSampleId
  };
};

export const getUsersRequest = () => {
  return dispatch => {
    return apiCall("api/Users", "GET", null, null).then(res => {
      dispatch(getUsers(res.data));
    });
  };
};

export const getUsers = userslist => {
  return {
    type: Types.GET_USERS,
    userslist
  };
};

export const getCaseRequest = () => {
  return dispatch => {
    return apiCall("api/Cases", "GET", null, null).then(res => {
      console.log(res);
      dispatch(getCase(res.data));
    });
  };
};

export const getCase = caselist => {
  return {
    type: Types.GET_CASE,
    caselist
  };
};

export const addCaseRequest = Case => {
  return dispatch => {
    return apiCall("api/Case", "POST", Case, null).then(res => {
      dispatch(addCase(res.data));
    });
  };
};

export const addCase = Case => {
  return {
    type: Types.ADD_CASE,
    Case
  };
};

export const deleteCaseRequest = caseid => {
  return dispatch => {
    return apiCall(`api/Cases/${caseid}`, "DELETE", null, null).then(res => {
      dispatch(deleteCase(caseid));
    });
  };
};

export const deleteCase = id => {
  console.log(id);
  return {
    type: Types.DELETE_CASE,
    id: id
  };
};

export const getSampleByLitigantIdRequest = litigantId => {
  return dispatch => {
    return apiCall(
      `api/Sample?litigantId=${litigantId}`,
      "GET",
      null,
      null
    ).then(res => {
      dispatch(getSampleByLitigantId(res.data));
    });
  };
};
export const getSampleByLitigantId = sampleData => {
  return {
    type: Types.GET_SAMPLE_BY_LITIGANT_ID,
    sampleData
  };
};

export const getOrganizationRequest = () => {
  return dispatch => {
    return apiCall("api/Organizations", "GET", null, null).then(res => {
      dispatch(getOrganization(res.data));
    });
  };
};

export const getOrganization = organizationlist => {
  return {
    type: Types.GET_ORGANIZATION,
    organizationlist
  };
};
export const getOrganizationByIdRequest = id => {
  return dispatch => {
    return apiCall(`api/Organizations/${id}`, "GET", null, null).then(res => {
      dispatch(getOrganizationById(res.data));
    });
  };
};

export const getOrganizationById = dataOrganization => {
  return {
    type: Types.GET_ORGANIZATION_BY_ID,
    dataOrganization
  };
};

export const getCaseIdRequest = caseId => {
  return dispatch => {
    return apiCall(`api/Case?id=${caseId}`, "GET", null, null).then(res => {
      dispatch(getCaseId(res.data));
    });
  };
};

export const getCaseId = caseIdItem => {
  return {
    type: Types.GET_CASE_ID,
    caseIdItem
  };
};

export const getSampleByCaseIdRequest = caseId => {
  return dispatch => {
    return apiCall(`api/Samples?caseID=${caseId}`, "GET", null, null).then(
      res => {
        dispatch(getSampleByCaseId(res.data));
      }
    );
  };
};

export const getSampleByCaseId = samplelistbycaseid => {
  return {
    type: Types.GET_SAMPLE_BY_CASE_ID,
    samplelistbycaseid
  };
};

export const updateStatusCaseIdRequest = (status, caseId, username) => {
  return dispatch => {
    return apiCall(
      `api/Cases/${caseId}?userName=${username}`,
      "PUT",

      status,
      null
    );
  };
};

// HANDLE GET

export const getExtractStepBySampleIdRequest = sampleId => {
  return dispatch => {
    return apiCall(
      `ExtractProcess?sampleId=${sampleId}`,
      "GET",
      null,
      null
    ).then(res => {
      if(res === undefined) {
        res = {}
        dispatch(getExtractStepBySampleId(res));
      } else {
        dispatch(getExtractStepBySampleId(res.data));
      }
     
      
    });
  };
};
export const getExtractStepBySampleId = extractStepDataFromSampleId => {
  return {
    type: Types.GET_EXTRACT_STEP_BY_SAMPLE_ID,
    extractStepDataFromSampleId
  };
};
export const getPRCStepBySampleIdRequest = sampleId => {
  return dispatch => {
    return apiCall(`PCRProcess?sampleId=${sampleId}`, "GET", null, null).then(
      res => {
        if(res === undefined) {
          res = {}
          dispatch(getPRCStepBySampleId(res))
        } else {
          dispatch(getPRCStepBySampleId(res.data));
        }
       
      }
    );
  };
};
export const getPRCStepBySampleId = prcStepDataFromSampleId => {
  return {
    type: Types.GET_PRC_STEP_BY_SAMPLE_ID,
    prcStepDataFromSampleId
  };
};
export const getElectroStepBySampleIdRequest = sampleId => {
  return dispatch => {
    return apiCall(
      `Electrophoresis?sampleId=${sampleId}`,
      "GET",
      null,
      null
    ).then(res => {
      if(res === undefined) {
        res = {}
        dispatch(getElectroStepBySampleId(res));
      } else {
        dispatch(getElectroStepBySampleId(res.data));
      }
     
    });
  };
};
export const getElectroStepBySampleId = electroStepDataFromSampleId => {
  return {
    type: Types.GET_ELECTRO_STEP_BY_SAMPLE_ID,
    electroStepDataFromSampleId
  };
};
export const getPurifyStepBySampleIdRequest = sampleId => {
  return dispatch => {
    return apiCall(
      `PurifyProcess?sampleId=${sampleId}`,
      "GET",
      null,
      null
    ).then(res => {
      if(res === undefined) {
        res = {}
        dispatch(getPurifyStepBySampleId(res));
      } else {
        dispatch(getPurifyStepBySampleId(res.data));
      }
     
    });
  };
};
export const getPurifyStepBySampleId = purifyStepDataFromSampleId => {
  return {
    type: Types.GET_PURIFY_STEP_BY_SAMPLE_ID,
    purifyStepDataFromSampleId
  };
};
export const getResultStepBySampleIdRequest = sampleId => {
  return dispatch => {
    return apiCall(`api/Result?sampleId=${sampleId}`, "GET", null, null).then(
      res => {
        if(res === undefined) {
          res = []
          dispatch(getResultStepBySampleId(res));
        } else {
          dispatch(getResultStepBySampleId(res.data));
        }
        
      }
    );
  };
};
export const getResultStepBySampleId = resultStepDataFromSampleId => {
  return {
    type: Types.GET_RESULT_STEP_BY_SAMPLE_ID,
    resultStepDataFromSampleId
  };
};

// HANDLE ADD

export const addExtractStepBySampleIdRequest = extractData => {
  console.log(extractData);
  return dispatch => {
    return apiCall("api/ExtractProcesses", "POST", extractData, null).then(
      res => {
        dispatch(addExtractStepBySampleId(res.data));
      }
    );
  };
};
export const addExtractStepBySampleId = extractStepData => {
  return {
    type: Types.ADD_EXTRACT_STEP_BY_SAMPLE_ID,
    extractStepData
  };
};
export const addPRCStepBySampleIdRequest = prcData => {
  console.log(prcData)
  return dispatch => {
    return apiCall("api/PCRProcesses", "POST", prcData, null).then(res => {
      dispatch(addPRCStepBySampleId(res.data));
    });
  };
};
export const addPRCStepBySampleId = prcStepData => {
  return {
    type: Types.ADD_PRC_STEP_BY_SAMPLE_ID,
    prcStepData
  };
};
export const addElectroStepBySampleIdRequest = electroData => {
  return dispatch => {
    return apiCall(
      "api/ElectrophoresisProcesses",
      "POST",
      electroData,
      null
    ).then(res => {
      dispatch(addElectroStepBySampleId(res.data));
    });
  };
};
export const addElectroStepBySampleId = electroStepData => {
  return {
    type: Types.ADD_ELECTRO_STEP_BY_SAMPLE_ID,
    electroStepData
  };
};
export const addPurifyStepBySampleIdRequest = purifyData => {
  return dispatch => {
    return apiCall("api/PurifyProcesses", "POST", purifyData, null).then(
      res => {
        dispatch(addPurifyStepBySampleId(res.data));
      }
    );
  };
};
export const addPurifyStepBySampleId = purifyStepData => {
  return {
    type: Types.ADD_PURIFY_STEP_BY_SAMPLE_ID,
    purifyStepData
  };
};
export const addResultStepBySampleIdRequest = (
  resultData,
 
) => {
  console.log(resultData)
  return dispatch => {
    return apiCall(
      `api/Results`,
      "POST",
      resultData,
      null
    ).then(res => {
      console.log(res);
    if(res === undefined) {
      res=[];
      dispatch(addResultStepBySampleId(res));
    } else {
      dispatch(addResultStepBySampleId(res.data));
    }
      
    });
  };
};
export const addResultStepBySampleId = resultStepData => {
  return {
    type: Types.ADD_RESULT_STEP_BY_SAMPLE_ID,
    resultStepData
  };
};

// HANDLE PUT(EDIT)

export const editExtractStepBySampleIdRequest = (
  extractStepDataEdit,
  extractId,
  username
) => {
  console.log(extractStepDataEdit);
  return dispatch => {
    return apiCall(
      `api/ExtractProcesses/${extractId}?userName=${username}`,
      "PUT",
      extractStepDataEdit,
      null
    ).then(res => {
      console.log(res);
      dispatch(editExtractStepBySampleId(extractStepDataEdit));
    });
  };
};
export const editExtractStepBySampleId = extractStepDataEdit => {
  return {
    type: Types.EDIT_EXTRACT_STEP_BY_SAMPLE_ID,
    extractStepDataEdit
  };
};
export const editPRCStepBySampleIdRequest = (prcStepDataEdit, prcId,username) => {
  console.log(prcStepDataEdit)
  return dispatch => {
    return apiCall(
      `api/PCRProcesses/${prcId}?userName=${username}`,
      "PUT",
      prcStepDataEdit,
      null
    ).then(res => {
      dispatch(editPRCStepBySampleId(res.data));
    });
  };
};
export const editPRCStepBySampleId = prcStepDataEdit => {
  return {
    type: Types.EDIT_PRC_STEP_BY_SAMPLE_ID,
    prcStepDataEdit
  };
};
export const editElectroStepBySampleIdRequest = (
  electroStepDataEdit,
  electroId,
  username
) => {
  return dispatch => {
    return apiCall(
      `api/ElectrophoresisProcesses/${electroId}?userName=${username}`,
      "PUT",
      electroStepDataEdit,
      null
    ).then(res => {
      dispatch(editElectroStepBySampleId(res.data));
    });
  };
};
export const editElectroStepBySampleId = electroStepDataEdit => {
  return {
    type: Types.EDIT_ELECTRO_STEP_BY_SAMPLE_ID,
    electroStepDataEdit
  };
};
export const editPurifyStepBySampleIdRequest = (
  purifyStepDataEdit,
  purifyId,
  username
) => {
  return dispatch => {
    return apiCall(
      `api/PurifyProcesses/${purifyId}?userName=${username}`,
      "PUT",
      purifyStepDataEdit,
      null
    ).then(res => {
      dispatch(editPurifyStepBySampleId(res.data));
    });
  };
};
export const editPurifyStepBySampleId = purifyStepDataEdit => {
  return {
    type: Types.EDIT_PURIFY_STEP_BY_SAMPLE_ID,
    purifyStepDataEdit
  };
};
export const editResultStepBySampleIdRequest = (
  resultStepDataEdit,
  resultId
) => {
  console.log(resultStepDataEdit);
  console.log(resultId);
  return dispatch => {
    return apiCall(
      `api/Results/${resultId}`,
      "PUT",
      resultStepDataEdit,
      null
    ).then(res => {
      dispatch(editResultStepBySampleId(res.data));
    });
  };
};
export const editResultStepBySampleId = resultStepDataEdit => {
  return {
    type: Types.EDIT_RESULT_STEP_BY_SAMPLE_ID,
    resultStepDataEdit
  };
};

export const getKitRequest = () => {
  return dispatch => {
    return apiCall("api/Kits", "GET", null, null).then(res => {
      dispatch(getKit(res.data));
    });
  };
};

export const getKit = kitlist => {
  return {
    type: Types.GET_KIT,
    kitlist
  };
};

export const addKitRequest = kit => {
  return dispatch => {
    return apiCall("api/Kits", "POST", kit, null).then(res => {
      dispatch(addKit(res.data));
    });
  };
};

export const addKit = kit => {
  return {
    type: Types.ADD_KIT,
    kit
  };
};


export const updateKitRequest = (kit) => {
  return dispatch => {
    return apiCall(`api/Kits/${kit.ID}`, "PUT", kit, null).then(res =>{
      dispatch(updateKit(kit))
    });
  };
};

export const updateKit = kit => {
  return {
    type: Types.UPDATE_KIT,
    kit
  };
};

export const getKitUpdateRequest = id => {
  return dispatch => {
    return apiCall(`api/Kits/${id}`, "GET", null, null).then(res => {
      dispatch(getKitUpdate(res.data));
    });
  };
};

export const getKitUpdate = kit => {
  return {
    type: Types.EDIT_KIT,
    kit
  };
};




                                                                                    // GET KIT STEP BY ID 

export const getKitExtractStepRequest = id => {
  return dispatch => {
    return apiCall(`api/Kits/${id}`, "GET", null, null).then(res => {
      dispatch(getKitExtractStep(res.data));
    });
  };
};

export const getKitExtractStep = kit => {
  return {
    type: Types.GET_KIT_EXTRACT_BY_ID,
    kit
  };
};
export const getSelectExtractADNSystemRequest = id => {
  return dispatch => {
    return apiCall(`api/Systems/${id}`, "GET", null, null).then(res => {
      dispatch(getSelectExtractADNSystem(res.data));
    });
  };
};

export const getSelectExtractADNSystem = kit => {
  return {
    type: Types.GET_SELECT_EXTRACT_ADN_SYSTEM_BY_ID,
    kit
  };
};
export const getSelectExtractExtractSystemRequest = id => {
  return dispatch => {
    return apiCall(`api/Systems/${id}`, "GET", null, null).then(res => {
      dispatch(getSelectExtractExtractSystem(res.data));
    });
  };
};

export const getSelectExtractExtractSystem = kit => {
  return {
    type: Types.GET_SELECT_EXTRACT_EXTRACT_SYSTEM_BY_ID,
    kit
  };
};

export const getKitPRCStepRequest = id => {
  return dispatch => {
    return apiCall(`api/Kits/${id}`, "GET", null, null).then(res => {
      dispatch(getKitPRCStep(res.data));
    });
  };
};

export const getKitPRCStep = kit => {
  return {
    type: Types.GET_KIT_PRC_BY_ID,
    kit
  };
};

export const getSelectPRCPRCSystemRequest = id => {
  return dispatch => {
    return apiCall(`api/Systems/${id}`, "GET", null, null).then(res => {
      dispatch(getSelectPRCPRCSystem(res.data));
    });
  };
};

export const getSelectPRCPRCSystem = kit => {
  return {
    type: Types.GET_SELECT_PRC_PRC_SYSTEM_BY_ID,
    kit
  };
};


export const getKitElectroStepRequest = id => {
  return dispatch => {
    return apiCall(`api/Kits/${id}`, "GET", null, null).then(res => {
      dispatch(getKitElectroStep(res.data));
    });
  };
};

export const getKitElectroStep = kit => {
  return {
    type: Types.GET_KIT_ELECTRO_BY_ID,
    kit
  };
};
export const getSelectElectroElectroSystemRequest = id => {
  return dispatch => {
    return apiCall(`api/Systems/${id}`, "GET", null, null).then(res => {
      dispatch(getSelectElectroElectroSystem(res.data));
    });
  };
};

export const getSelectElectroElectroSystem = kit => {
  return {
    type: Types.GET_SELECT_ELECTRO_ELECTRO_SYSTEM_BY_ID,
    kit
  };
};


export const getKitPurifyStepRequest = id => {
  return dispatch => {
    return apiCall(`api/Kits/${id}`, "GET", null, null).then(res => {
      dispatch(getKitPurifyStep(res.data));
    });
  };
};

export const getKitPurifyStep = kit => {
  return {
    type: Types.GET_KIT_PURIFY_BY_ID,
    kit
  };
};












export const getLitigantRequest = () => {
  return dispatch => {
    return apiCall("api/Litigants", "GET", null, null).then(res => {
      dispatch(getLitigant(res.data));
    });
  };
};

export const getLitigant = litigantlist => {
  return {
    type: Types.GET_LITIGANT,
    litigantlist
  };
};

export const addLitigantRequest = litigant => {
  return dispatch => {
    return apiCall("api/Litigant", "POST", litigant, null).then(res => {
      dispatch(addLitigant(res.data));
    });
  };
};

export const addLitigant = litigant => {
  return {
    type: Types.ADD_LITIGANT,
    litigant
  };
};

export const getSystemRequest = () => {
  return dispatch => {
    return apiCall("api/Systems", "GET", null, null).then(res => {
      dispatch(getSystem(res.data));
    });
  };
};

export const getSystem = systemlist => {
  return {
    type: Types.GET_SYSTEM,
    systemlist
  };
};

export const addSystemRequest = system => {
  console.log(system);
  return dispatch => {
    return apiCall("api/Systems", "POST", system, null).then(res => {
      dispatch(addSystem(res.data));
    });
  };
};

export const addSystem = system => {
  return {
    type: Types.ADD_SYSTEM,
    system
  };
};

export const updateSystemRequest = system => {
  return dispatch => {
    return apiCall(`api/Systems/${system.ID}`, "PUT", system, null).then(
      res => {
        dispatch(updateSystem(res.data));
      }
    );
  };
};

export const updateSystem = system => {
  return {
    type: Types.UPDATE_SYSTEM,
    system
  };
};

export const getSystemUpdateRequest = id => {
  return dispatch => {
    return apiCall(`api/Systems/${id}`, "GET", null, null).then(res => {
      dispatch(getSystemUpdate(res.data));
    });
  };
};

export const getSystemUpdate = system => {
  return {
    type: Types.EDIT_SYSTEM,
    system
  };
};


export const updateLitigantRequest = (litigant) => {
  return dispatch => {
    return apiCall(`api/Litigants/${litigant.ID}?userName=thanh`, "PUT", litigant, null).then(res => {
      console.log(res.data);
      dispatch(updateLitigant(litigant));
    })
  }
}


export const updateLitigant = litigant => {
  return {
    type: Types.UPDATE_LITIGANT,
    litigant
  };
};

export const getLitigantUpdateRequest = id => {
  return dispatch => {
    return apiCall(`api/Litigant?id=${id}`, "GET", null, null).then(res => {
      dispatch(getLitigantUpdate(res.data));
    });
  };
};

export const getLitigantUpdate = litigant => {
  return {
    type: Types.EDIT_LITIGANT,
    litigant
  };
};

export const searchLitigantRequest = keyword => {
  return dispatch => {
    return apiCall(`api/Litigants?name=${keyword}`, "GET", null, null).then(
      res => {
        dispatch(searchLitigant(res.data));
      }
    );
  };
};

export const searchLitigant = litigantlist => {
  return {
    type: Types.SEARCH_LITIGANT,
    litigantlist
  };
};

export const searchKitRequest = keyword => {
  return dispatch => {
    return apiCall(`api/Kits?name=${keyword}`, "GET", null, null).then(res => {
      dispatch(searchKit(res.data));
    });
  };
};

export const searchKit = kitlist => {
  return {
    type: Types.SEARCH_KIT,
    kitlist
  };
};

export const searchSystemRequest = keyword => {
  return dispatch => {
    return apiCall(`api/Systems?name=${keyword}`, "GET", null, null).then(
      res => {
        dispatch(searchSystem(res.data));
      }
    );
  };
};

export const searchSystem = systemlist => {
  return {
    type: Types.SEARCH_SYSTEM,
    systemlist
  };
};

export const searchOrganizationRequest = keyword => {
  return dispatch => {
    return apiCall(`api/Organizations?name=${keyword}`, "GET", null, null).then(
      res => {
        dispatch(searchOrganization(res.data));
      }
    );
  };
};

export const searchOrganization = organizationlist => {
  return {
    type: Types.SEARCH_ORGANIZATION,
    organizationlist
  };
};

export const addOrganizationRequest = system => {
  console.log(system);
  return dispatch => {
    return apiCall("api/Organizations", "POST", system, null).then(res => {
      dispatch(addOrganization(res.data));
    });
  };
};
export const addOrganization = organization => {
  return {
    type: Types.ADD_ORGANIZATION,
    organization
  };
};
export const getOrganizationUpdateRequest = id => {
  return dispatch => {
    return apiCall(`api/Organizations/${id}`, "GET", null, null).then(res => {
      dispatch(getOrganizationUpdate(res.data));
    });
  };
};

export const getOrganizationUpdate = organization => {
  return {
    type: Types.EDIT_ORGANIZATION,
    organization
  };
};

export const updateOrganizationRequest = (organization) => {
  return dispatch => {
    return apiCall(`api/Organizations/${organization.ID}`, "PUT", organization, null).then(res => {
      dispatch(updateOrganization(organization))
    })
  }

}

export const updateOrganization = (organization) => {
  return {
    type: Types.UPDATE_ORGANIZATION,
    organization
  }
}


// FILTER HERE
export const filterByNameOrganization = (dataName) => {
  return {
    type: Types.FILTER_BY_NAME_ORGANIZATION,
    dataName
  };
};

export const filterByNameKit = (dataName) => {
  return{
    type: Types.FILTER_BY_NAME_KIT,
    dataName
  };
};

export const filterByNameSystem = (dataName) => {
  return{
    type: Types.FILTER_BY_NAME_SYSTEM,
    dataName
  };
};

export const filterByNameLitigant = (dataName) => {
  return{
    type: Types.FILTER_BY_NAME_LITIGANT,
    dataName
  };
};

export const createNotificationRequest = (notification) => {
  return dispatch => {
    console.log(firebase.firestore().collection('notifications').doc('9').collection('notification'));
    firebase.firestore().collection('notifications').doc('9').collection('notification').add({
      ...notification,
      authorName: 'Tuấn',
      createAt: new Date()
    }).then(() =>{
      dispatch(createNotification(notification));
    }).catch((err) =>{
      dispatch(errorNotification(err));
    })
  }
};

export const createNotification = (notification) => {
  return{
    type: Types.CREATE_NOTIFICATION,
    notification
  };
};

export const errorNotification = (error) => {
  return{
    type: Types.CREATE_NOTIFICATION_ERROR,
    error
  }
}

export const deleteDataLoginRequest = () => {
  return {
    type: Types.DELETE_DATA_LOGIN
  };
};

export const loginUserRequest = dataLogin => {
  return dispatch => {
    return apiCall(`Login`, "POST", dataLogin, null).then(res => {
      console.log(res);
      if (res === undefined) {
        alert("Wrong username or password!!");
      } else {
        var datatoken = jwt.decode(res.data.JwtString);
        dispatch(loginUser(res.data));
        dispatch(decodeToken(datatoken));
      }
    });
  };
};

export const loginUser = dataLogin => {
  return {
    type: Types.DATA_LOGIN,
    dataLogin
  };
};

export const decodeToken = dataToken => {
  return {
    type: Types.DATA_FROM_TOKEN,
    dataToken
  };
};
