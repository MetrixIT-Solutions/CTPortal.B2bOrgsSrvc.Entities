/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const config = require('config');

const cs = require('../../services/CommonSrvc');
const B2bEntities = require('../../schemas/B2BEntities');
const B2BEntitiesLcs = require('../../schemas/B2BEntitiesLcs');
const {cuType, orgType} = require('../../consts/B2bEntitiesConsts.json');

const entsList = (reqBody, tData) => {
  const searchStr = reqBody.searchStr || '';
  return {
    delFlag: false,
    pOrg: tData.b2b,
    $or: [
      { 'orgName': { $regex: searchStr, $options: 'i' } },
      { 'orgCode': { $regex: searchStr, $options: 'i' } },
      { 'city': { $regex: searchStr, $options: 'i' } },
      { 'area': { $regex: searchStr, $options: 'i' } },
      { 'zip': { $regex: searchStr, $options: 'i' } },
      { 'state': { $regex: searchStr, $options: 'i' } }
    ]
  };
}

const entCreateData = (reqBody, file, tData) => {
  const iObj = file?.filename ? setIconObj(file, reqBody) : { orgIcon: '', oiPath: '', oiActualName: '' };
  const orgData = setOrgData(reqBody, iObj, tData)
  const createObj = new B2bEntities(orgData);
  return createObj;
}

const entLcsCreateObj = (resData, value) => {
  const obj = setEntLcsCreateData(resData, value);
  const createObj = new B2BEntitiesLcs(obj);
  return createObj;
}

const entView = (_id, tData) => {
  return { _id, pOrg: tData.b2b, delFlag: false };
}

const setEntUpdateObj = (req, reqBody, tData) => {
  const file = req.file; const _id = req.params.recordid;
  const iObj = file?.filename ? setIconObj(file, reqBody) : !reqBody.iconPath ? { orgIcon: '', oiPath: '', oiActualName: '' } : {};
  const updateObj = setEntUpdateData(reqBody, iObj, tData);
  const query = { _id, delFlag: false };
  return { query, updateObj };
}

const setB2bEntsLcsUpdate = (data, action, resData) => {
  const currentUTC = cs.currUTCObj();
  const query = { org: resData._id };
  const updateObj = {
    action,
    ...data,

    uUser: resData.uUser,
    uuName: resData.uuName,
    uDate: currentUTC.currUTCDtTm,
    uDtStr: currentUTC.currUTCDtTmStr,
  };
  return { query, updateObj };
}

const entStatusUpdate = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    orgStatus: reqBody.orgStatus,
    uuType: tData.ut,
    uUser: tData.iss,
    uuName: tData.un,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  }
}

const setBranchData = (orgData, reqBody) => {
  return {
    ...orgData,
    org: orgData._id,
    obName: reqBody.branchName,
    obCode: reqBody.branchCode,
    obEmID: orgData.orgEmID,
    obMobCc: orgData.orgMobCc,
    obMobNum: orgData.orgMobNum,
    obMobCcNum: orgData.orgMobCcNum,
    obAltEmID: orgData.orgAltEmID,
    obAltMobNum: orgData.orgAltMobCc,
    obAltMobCcNum: orgData.orgAltMobCcNum,
    obStatus: orgData.orgStatus,
    obNotes: orgData.orgNotes,
    obSeq: orgData.orgSeq,
    obWs: orgData.orgWs,
    obGst: orgData.orgGst,
    obPan: orgData.orgPan,
    obCin: orgData.orgCin,
    obTin: orgData.orgTin,
    obSsn: orgData.orgSsn,
    obEin: orgData.orgEin,
    obItin: orgData.orgItin,
    obTan: orgData.orgTan,
  }
}

const getSmptpDetails = (reqBody) => {
  const query1 = { delFlag: false, _id: reqBody.org };
  const query2 = { delFlag: false, pOrg: reqBody.b2b };
  const project = { senderMail: 1, senderMailPswd: 1, smtp: 1, smtpPort: 1, service: 1, from: 1 };
  return { query1, query2, project };
}

const putB2bEntsSmptpDetailsUpdate = (reqBody, tData) => {
  const cUtc = cs.currUTCObj();

  return {
    senderMail: reqBody.senderMail,
    senderMailPswd: reqBody.senderMailPswd,
    smtp: reqBody.smtp,
    smtpPort: reqBody.smtpPort,
    service: reqBody.service || '',
    from: reqBody.fromMail,

    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: cUtc.currUTCDtTm,
    uDtStr: cUtc.currUTCDtTmStr,
  };
}

module.exports = {
  entsList, entCreateData, entLcsCreateObj, entView, setEntUpdateObj, setB2bEntsLcsUpdate, entStatusUpdate, 
  setBranchData, getSmptpDetails, putB2bEntsSmptpDetailsUpdate
}

const setIconObj = (file, reqBody) => {
  const orgIcon = reqBody.orgCode.replace(/\s+/g, "").toLowerCase() +  '.jpg';
  const ciPath = file.destination + '/' + orgIcon;
  fs.renameSync(file.path, ciPath);
  return { orgIcon, oiPath: config.apiHost + ciPath, oiActualName: file.filename };
}

const setOrgData = (reqBody, iObj, tData) => {
  const curUtc = cs.currUTCObj();
  const cCode = reqBody.countryCode ? reqBody.countryCode : 'IND';
  const sCode = reqBody.stateCode ? reqBody.stateCode : 'TS';
  return {
    _id: uuidv4(),

    idSeq: {
      seq: cCode + sCode + curUtc.currUTCYear + curUtc.currUTCMnt + curUtc.currUTCDay,
      cCode,
      sCode,
      year: curUtc.currUTCYear,
      month: curUtc.currUTCMnt,
      day: curUtc.currUTCDay
    },

    pOrg: tData.b2b,
    poCode: tData.bc,
    orgType,

    orgName: reqBody.orgName,
    orgCode: reqBody.orgCode.replace(/\s+/g, "").toLowerCase(),
    orgSeq: reqBody.orgSeq,
    orgNotes: reqBody.orgNotes || '',
    orgStatus: reqBody.orgStatus,

    orgEmID: reqBody.orgEmID,
    orgMobCc: reqBody.orgMobCc || '',
    orgMobNum: reqBody.orgMobNum || '',
    orgMobCcNum: reqBody.orgMobCcNum || '',
    orgAltEmID: reqBody.orgAltEmID || '',
    orgAltMobCc: reqBody.orgAltMobCc || '',
    orgAltMobNum: reqBody.orgAltMobNum || '',
    orgAltMobCcNum: reqBody.orgAltMobCcNum || '',
    orgStatus: reqBody.orgStatus,

    orgWs: reqBody.orgWs || '',
    orgGst: reqBody.orgGst || '',
    orgPan: reqBody.orgPan || '',
    orgCin: reqBody.orgCin || '',
    orgTin: reqBody.orgTin || '',
    orgSsn: reqBody.orgSsn || '',
    orgEin: reqBody.orgEin || '',
    orgItin: reqBody.orgItin || '',
    orgTan: reqBody.orgTan || '',
    orgsWs: reqBody.orgsWs || '', 

    ...iObj,

    hNum: reqBody.hNum || '',
    area: reqBody.area || '',
    aLocality: reqBody.aLocality || '',
    zip: reqBody.zip || '',
    state: reqBody.state || '',
    stateCode: reqBody.stateCode || '',
    city: reqBody.city || '',
    cityCode: reqBody.cityCode || '',
    country: reqBody.country || '',
    countryCode: reqBody.countryCode || '',

    plusCode: reqBody.plusCode || '',
    geocoordinates: reqBody.geocoordinates || {},

    cuType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr,
    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  }
}

const setEntLcsCreateData = (resData, value) => {
  const cUtc = cs.currUTCObj();
  return {
    _id: uuidv4(),

    idSeq: resData.idSeq,

    org: resData._id,
    pOrg: resData.pOrg,
    poCode: resData.poCode,
    orgCode: resData.orgCode,

    action: value,
    oldObj: null,
    newObj: resData,

    delFlag: false,
    cuType: resData.cuType,
    cUser: resData.cUser,
    cuName: resData.cuName,
    cDate: cUtc.currUTCDtTm,
    cDtStr: cUtc.currUTCDtTmStr,

    uuType: resData.uuType,
    uUser: resData.uUser,
    uuName: resData.uuName,
    uDate: cUtc.currUTCDtTm,
    uDtStr: cUtc.currUTCDtTmStr,
  };
}

const setEntUpdateData = (reqBody, iObj, tData) => {
  const curUtc = cs.currUTCObj();
  const cCode = reqBody.countryCode ? reqBody.countryCode : 'IND';
  const sCode = reqBody.stateCode ? reqBody.stateCode : 'TS';

  return {
   
    idSeq: {
      seq: cCode + sCode + curUtc.currUTCYear + curUtc.currUTCMnt + curUtc.currUTCDay,
      cCode,
      sCode,
      year: curUtc.currUTCYear,
      month: curUtc.currUTCMnt,
      day: curUtc.currUTCDay
    },

    orgName: reqBody.orgName,
    orgCode: reqBody.orgCode.replace(/\s+/g, "").toLowerCase(),
    orgSeq: reqBody.orgSeq,
    orgNotes: reqBody.orgNotes,

    orgEmID: reqBody.orgEmID,
    orgMobCc: reqBody.orgMobCc,
    orgMobNum: reqBody.orgMobNum,
    orgMobCcNum: reqBody.orgMobCcNum,
    orgAltEmID: reqBody.orgAltEmID,
    orgAltMobCc: reqBody.orgAltMobCc,
    orgAltMobNum: reqBody.orgAltMobNum,
    orgAltMobCcNum: reqBody.orgAltMobCcNum,
    orgStatus: reqBody.orgStatus,

    orgWs: reqBody.orgWs,
    orgGst: reqBody.orgGst,
    orgPan: reqBody.orgPan,
    orgCin: reqBody.orgCin,
    orgTin: reqBody.orgTin,
    orgSsn: reqBody.orgSsn,
    orgEin: reqBody.orgEin,
    orgItin: reqBody.orgItin,
    orgTan: reqBody.orgTan,
    orgsWs: reqBody.orgsWs, 
    
    ...iObj,

    hNum: reqBody.hNum,
    area: reqBody.area,
    aLocality: reqBody.aLocality,
    zip: reqBody.zip,
    country: reqBody.country,
    countryCode: reqBody.countryCode,
    state: reqBody.state,
    stateCode: reqBody.stateCode,
    city: reqBody.city,
    cityCode: reqBody.cityCode,

    plusCode: reqBody.plusCode,
    geocoordinates: reqBody.geocoordinates,

    uUser: tData.iss,
    uuName: tData.un,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  }
}