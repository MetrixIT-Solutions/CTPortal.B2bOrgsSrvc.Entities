/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var { v4: uuidv4 } = require('uuid');
var moment = require('moment');

const b2bOrBnch = require('../../schemas/B2BOrgBranches');
const cs = require('../../services/CommonSrvc');
const { cuType, obType } = require('../../consts/B2bEntitiesConsts.json');

const branchesList = (reqBody, tData) => {
  const searchStr = reqBody.searchStr || '';
  const org = reqBody.orgID ? { org: reqBody.orgID } : {};
  return {
    delFlag: false,
    ...org,
    b2b: tData.b2b,
    $or: [
      { 'obName': { $regex: searchStr, $options: 'i' } },
      { 'obCode': { $regex: searchStr, $options: 'i' } },
      { 'orgCode': { $regex: searchStr, $options: 'i' } },
      { 'city': { $regex: searchStr, $options: 'i' } },
      { 'area': { $regex: searchStr, $options: 'i' } },
      { 'zip': { $regex: searchStr, $options: 'i' } },
      { 'state': { $regex: searchStr, $options: 'i' } }
    ]
  };
}

const getOrgBranch = (_id) => {
  return {delFlag: false, _id};
}

const branchData = (reqBody, tData) => {
  const data = setBranchData(reqBody, tData);
  return new b2bOrBnch(data);
}

const UpdatebranchData = (reqBody, tData) => {
  return commonBranchData(reqBody, tData);
}

const deleteBranch = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const delDtTm = moment.utc().format('YYYYMMDDHHmmss');
  return {
    obName: reqBody.obName + '_DEL_' + delDtTm,
    obCode: reqBody.obCode + '_DEL_' + delDtTm,

    delFlag: true,
    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
}

const branchStatusUpdate = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    obStatus: reqBody.status,
    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
}

module.exports = {
  branchesList, getOrgBranch, branchData, UpdatebranchData, deleteBranch, branchStatusUpdate
}

const setBranchData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const cCode = reqBody.countryCode ? reqBody.countryCode : '';
  const sCode = reqBody.stateCode ? reqBody.stateCode : '';
  const data = commonBranchData(reqBody, tData);
  const _id = uuidv4();

  return {
    _id,
    org: reqBody.org,
    orgName: reqBody.orgName,
    orgCode: reqBody.orgCode,
    idSeq: {
      seq: cCode + sCode + curUtc.currUTCYear + curUtc.currUTCMnt + curUtc.currUTCDay,
      cCode, sCode,
      year: curUtc.currUTCYear,
      month: curUtc.currUTCMnt,
      day: curUtc.currUTCDay
    },

    b2b: tData.b2b,
    b2bName: tData.bn,
    b2bCode: tData.bc,
    ...data,

    cuType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr
  };
}

const commonBranchData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    obType: obType.branch,
    obName: reqBody.obName,
    obCode: reqBody.obCode,
    obEmID: reqBody.obEmID || '',
    obMobCc: reqBody.obMobCc || '',
    obMobNum: reqBody.obMobNum || '',
    obMobCcNum: reqBody.obMobNum ? reqBody.obMobCc + ' ' + reqBody.obMobNum : '',
    obAltEmID: reqBody.obAltEmID || '',
    obAltMobCc: reqBody.obAltMobCc || '',
    obAltMobNum: reqBody.obAltMobNum || '',
    obAltMobCcNum: reqBody.obAltMobNum ? reqBody.obAltMobCc + ' ' + reqBody.obAltMobNum : '',
    obNotes: reqBody.obNotes || '',
    obStatus: reqBody.obStatus,

    obWs: reqBody.obWs || '',
    obGst: reqBody.obGst || '',
    obPan: reqBody.obPan || '',
    obCin: reqBody.obCin || '',
    obTin: reqBody.obTin || '',
    obSsn: reqBody.obSsn || '',
    obEin: reqBody.obEin || '',
    obItin: reqBody.obItin || '',
    obTan: reqBody.obTan || '',

    hNum: reqBody.hNum || '',
    area: reqBody.area || '',
    zip: reqBody.zip || '',
    city: reqBody.city || '',
    state: reqBody.state || '',
    stateCode: reqBody.stateCode || '',
    country: reqBody.country || '',
    countryCode: reqBody.countryCode || '',
    plusCode: reqBody.plusCode || {},
    geocoordinates: reqBody.geocoordinates || {},

    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  };
}
