/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */


var { v4: uuidv4 } = require('uuid');
var moment = require('moment');

const cs = require('../../services/CommonSrvc');
const B2BOrgTeams = require('../../schemas/B2BOrgTeams');
const { cuType } = require('../../consts/B2bEntitiesConsts.json');

const orgTeamsListObj = (reqBody, tData) => {
  const searchStr = reqBody.searchStr || '';
  const org = (tData.ut !== 'App' && tData.ut !== 'Tech' && tData.ur !== 'Super Admin') ? {org: tData.org} : (reqBody?.orgID ? {org: reqBody.orgID} : {});

  return {
    delFlag: false,
    b2b: tData.b2b,
    ...org,
    $or: [
      { 'orgName': { $regex: searchStr, $options: 'i' } },
      { 'orgCode': { $regex: searchStr, $options: 'i' } },
      { 'potLevel': { $regex: searchStr, $options: 'i' } },
      { 'oTeam': { $regex: searchStr, $options: 'i' } },
      { 'otCode': { $regex: searchStr, $options: 'i' } },
    ]
  };
}

const orgTeamCreateObj = (reqBody, tData) => {
  const teamData = setTeamData(reqBody, tData);
  const createObj = new B2BOrgTeams(teamData);
  return createObj;
}

const getOrgTeam = (_id, tData) => {
  const org = (tData.ut !== 'App' && tData.ut !== 'Tech' && tData.ur !== 'Super Admin') ? {org: tData.org} : {};
  return {_id, delFlag: false, b2b: tData.b2b, ...org};
}

const orgTeamUpdateObj = (reqBody, tData) => {
  return setOrgTeamUpdateObj(reqBody, tData);
}

const deleteTeam = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const delDtTm = moment.utc().format('YYYYMMDDHHmmss');
  return {
    oTeam: reqBody.oTeam + '_DEL_' + delDtTm,
    otCode: reqBody.otCode + '_DEL_' + delDtTm,

    delFlag: true,
    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
}

const getOrgPIDTeam = (potId) => {
  return {delFlag: false, potId, _id: {$nin: [potId]}};
}

const teamStatusUpdate = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    otStatus: reqBody.status,
    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
}

module.exports = {
  orgTeamsListObj, orgTeamCreateObj, getOrgTeam, orgTeamUpdateObj, deleteTeam, getOrgPIDTeam, teamStatusUpdate
}

const setTeamData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const cCode = reqBody.countryCode ? reqBody.countryCode : '';
  const sCode = reqBody.stateCode ? reqBody.stateCode : '';
  const otCode = reqBody.otCode.replace(/\s+/g, '').toUpperCase();
  const _id = uuidv4();

  return {
    _id,

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

    org: reqBody.org,
    orgName: reqBody.orgName,
    orgCode: reqBody.orgCode,
    // oBranch: reqBody.oBranch || '',
    // obName: reqBody.obName || '',
    // obCode: reqBody.obCode || '',

    potId: reqBody.potId ? reqBody.potId : '',
    potName: reqBody.potName ? reqBody.potName : '',
    potCode: reqBody.potCode ? reqBody.potCode : '',
    potLevel: reqBody.potLevel || '',
    potlIds: reqBody.potlIds || [],
    oTeam: reqBody.oTeam,
    otCode,
    otNotes: reqBody.otNotes || '',
    otStatus: reqBody.otStatus,

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

const setOrgTeamUpdateObj = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const otCode = reqBody.otCode.replace(/\s+/g, '').toUpperCase();
  return {
    // org: reqBody.org,
    // orgName: reqBody.orgName,
    // orgCode: reqBody.orgCode,
    // oBranch: reqBody.oBranch || '',
    // obName: reqBody.obName || '',
    // obCode: reqBody.obCode || '',

    potId: reqBody.potId ? reqBody.potId : '',
    potName: reqBody.potName ? reqBody.potName: '',
    potCode: reqBody.potCode ? reqBody.potCode : '',
    potLevel: reqBody.potLevel || '',
    potlIds: reqBody.potlIds || [],
    oTeam: reqBody.oTeam,
    otCode,
    otNotes: reqBody.otNotes || '',
    otStatus: reqBody.otStatus,

    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  };
}