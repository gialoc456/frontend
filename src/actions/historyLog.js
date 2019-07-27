import apiCall from "../utils/apiCaller";
import * as Types from "./../constants/ActionTypes";

// GET LOG STEP BY SAMPLE

export const getExtractLogBySampleIdRequest = (sampleId) => {
  return dispatch => {
    return apiCall(
      `ExtractLog?sampleId=${sampleId}`,
      "GET",
      null,
      null
    ).then(res => {
      if(res === undefined) {
        res = {};
        dispatch(getExtractLogBySampleId(res));
      } else {
        dispatch(getExtractLogBySampleId(res.data));
      }
      
    });
  };
};
export const getExtractLogBySampleId = logData => {
  return {
    type: Types.GET_EXTRACT_LOG_BY_SAMPLE_ID,
    logData
  };
};


export const getPCRLogBySampleIdRequest = (sampleId) => {
  return dispatch => {
    return apiCall(
      `PCRLog?sampleId=${sampleId}`,
      "GET",
      null,
      null
    ).then(res => {
      if(res === undefined) {
        res = {};
        dispatch(getPCRLogBySampleId(res));
      } else {
        dispatch(getPCRLogBySampleId(res.data));
      }
      
    });
  };
};
export const getPCRLogBySampleId = logData => {
  return {
    type: Types.GET_PCR_LOG_BY_SAMPLE_ID,
    logData
  };
};

export const getELectroLogBySampleIdRequest = (sampleId) => {
  return dispatch => {
    return apiCall(
      `ElectrophoresisLog?sampleId=${sampleId}`,
      "GET",
      null,
      null
    ).then(res => {
      if(res === undefined) {
        res = {};
        dispatch(getELectroLogBySampleId(res));
      } else {
        dispatch(getELectroLogBySampleId(res.data));
      }
      
    });
  };
};
export const getELectroLogBySampleId = logData => {
  return {
    type: Types.GET_ELECTRO_LOG_BY_SAMPLE_ID,
    logData
  };
};

export const getPurifyLogBySampleIdRequest = (sampleId) => {
  return dispatch => {
    return apiCall(
      `PurifyLog?sampleId=${sampleId}`,
      "GET",
      null,
      null
    ).then(res => {
      if(res === undefined) {
        res = {};
        dispatch(getPurifyLogBySampleId(res));
      } else {
        dispatch(getPurifyLogBySampleId(res.data));
      }
      
    });
  };
};
export const getPurifyLogBySampleId = logData => {
  return {
    type: Types.GET_PURIFY_LOG_BY_SAMPLE_ID,
    logData
  };
};


