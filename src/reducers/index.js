import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import caselist from "./CaseAction";
import filter from "./CaseActionSearch";
import filtersample from "./SampleActionSearch";
import samplelistbycaseid from "./SampleAction";
import caseiditem from "./CaseActionGetIdItem";
import sampleiditem from "./SampleViewAction";


import samplebylitigantid from "./SampleByLitigantId";

import userslist from "./UsersAction"
// IMPORT DATA FROM TOKEN
import datafromtoken from "./TokenData"
import datalogin from "./LoginDataAction"

// IMPORT EXTRACT STEP
import extractstepbysampleid from "./StepExtract";
// IMPORT LOG STEP
import extractlog from "./LogExtract"
import pcrlog from "./LogPCR";
import electrolog from "./LogElectro";
import purifylog from "./LogPurify"

// IMPORT PRC STEP
import prcstepbysampleid from "./StepPRC";

// IMPORT ELECTRO STEP
import electrostepbysampleid from "./StepElectro";

// IMPORT PURIFY STEP
import purifystepbysampleid from "./StepPurify"

// IMPORT RESULT STEP
import resultstepbysampleid from "./StepResult"

// IMPORT LITIGANT
import litigant from "./LitigantEditAction";
// IMPORT LIST LITIGANT
import litigantlist from "./LitigantAction";
// IMPORT KIT
import kit from "./KitEditAction";
// IMPORT LIST KIT
import kitlist from "./KitAction";
// IMPORT SYSTEM
import system from "./SystemEditAction";
// IMPORT SYSTEM LIST
import systemlist from "./SystemAction";
//IMPORT ORGANIZATION
import organizationbyid from "./OrganizationEditAtion";
// IMPORT ORGANIZATION LIST
import organizationlist from "./OrganizationAction";

// IMPORT FILTER DATA ORGANIZATION
import datafilterorganization from "./FilterOrganization";
import datafilterkit from "./FilterKit";
import datafiltersystem from "./FilterSystem";
import datafilterlitigant from "./FilterLitigant";

// IMPORT NOTIFICATION LIST
import notificationlist from './NotificationAction';

// IMPORT GET KIT BY STEP
import kitextract from "./KitExtractStep";
import extractadnsystem from "./SelectExtractADNSystem";
import extractextractsystem from "./SelectExtractExtractSystem";
import kitprc from "./KitPCRStep"
import prcprcsystem from "./SelectPRCPRCSystem"
import kitelectro from "./KitElectroStep";
import electroelectrosystem from "./SelectElectroElectroSystem"
import kitpurify from "./KitPurifyStep"


const myReducer = combineReducers({
  userslist,
  caselist,
  filter,
  samplelistbycaseid,
  caseiditem,
  sampleiditem,
  filtersample,
  organizationlist,
  organizationbyid,
  litigantlist,
  litigant,
  kitlist,
  kit,
  systemlist,
  system,
  samplebylitigantid,
  // GET DATA STEP
  extractstepbysampleid,
  prcstepbysampleid,
  electrostepbysampleid,
  purifystepbysampleid,
  resultstepbysampleid,

  // GET LOG
  extractlog,

  // FILTER DATA
  datafilterorganization,
  datafilterkit,
  datafiltersystem,
  datafilterlitigant,

  //NOTIFICATION LIST
  notificationlist,
  firestore: firestoreReducer,
  firebase: firebaseReducer,

  pcrlog,
  electrolog,
  purifylog,

  // DATA TOKEN
  datafromtoken,

  // LOGIN DATA
  datalogin,
  // GET KIT STEP
  kitextract,
  extractadnsystem,
  extractextractsystem,
  kitprc,
  prcprcsystem,
  kitelectro,
  electroelectrosystem,
  kitpurify
});

export default myReducer;
