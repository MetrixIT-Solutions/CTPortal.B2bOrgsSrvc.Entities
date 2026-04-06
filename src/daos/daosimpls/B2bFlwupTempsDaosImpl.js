/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var { v4: uuidv4 } = require('uuid');var { v4: uuidv4 } = require('uuid');
const flwupTemps = require('../../schemas/B2BFlwupTemps');
const cs = require('../../services/CommonSrvc');
const {cuType} = require('../../consts/B2bEntitiesConsts.json');

const flwTList = (reqBody, tData) => {
  const searchStr = reqBody.searchStr || '';
  const orgObj = (tData.ut !== 'App' && tData.ut !== 'Tech' && tData.ur !== 'Super Admin') ? {org: tData.org} : {};
  const utObj = tData.ut == 'Employee' ? [{$or: [
    // {org: tData.org, pTeamIDs: [], urSeq: {$gt: tData.urs}, user: null},
    // {org: tData.org, pTeamIDs: {$in: tData.ots}, urSeq: {$gt: tData.urs}, user: null},
    // {org: tData.org, urSeq: {$gt: tData.urs}, user: {$ne: null}},
    {org: tData.org, pTeamIDs: [], urSeq: tData.urs, user: null},
    {org: tData.org, pTeamIDs: {$in: tData.ots}, urSeq: tData.urs, user: null},
    // {org: tData.org, urSeq: tData.urs, user: {$ne: null}},
    {org: tData.org, user: tData.iss}]}] : [];

  const query = {
    delFlag: false,
    b2b: tData.b2b,
    ...orgObj,
    $and: [
      ...utObj,
      {$or: [
        { 'orgName': { $regex: searchStr, $options: 'i' } },
        { 'tName': { $regex: searchStr, $options: 'i' } },
        { 'userRole': { $regex: searchStr, $options: 'i' } },
        { 'uName': { $regex: searchStr, $options: 'i' } },
        { 'tempName': { $regex: searchStr, $options: 'i' } },
        { 'tStatus': { $regex: searchStr, $options: 'i' } },
      ]}
    ]
  }

  return query;
}

const flwupTemplData = (reqBody, tData) => {
  const data = setFlwupTemplData(reqBody, tData);
  return new flwupTemps(data);
}

const ftQry = (_id, tData) => {
  return {delFlag: false, _id, b2b: tData.b2b, };
}

const updateFlwTData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    tempName: reqBody.tempName,
    tempSeq: reqBody.tempSeq,
    tempNotes: reqBody.tempNotes || '',
    tStatus: reqBody.tStatus,
    tempData: reqBody.tempData,

    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  }
}

const ftAsgQry = (reqBody, tData) => {
  const tObj = {$or: [
  {org: tData.org, userRole: 'Mentor'},
  {userRole: 'Mentor', org: tData.org, team: reqBody.team},
  {userRole: 'Mentor', org: tData.org, user: reqBody.id}]};
  return {delFlag: false, b2b: tData.b2b, ...tObj};
}
 
module.exports = {
  flwTList, flwupTemplData, ftQry, updateFlwTData, ftAsgQry
}

const setFlwupTemplData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const userObj = (tData.ut !== 'App' && tData.ut !== 'Tech' && tData.ur !== 'Super Admin') ? {
    user: tData.iss,
    uName: tData.fn + ' ' + tData.ln,
    uRefID: tData.uid,
    uPrimary: tData.mp,
  } : {};

  return {
    _id: uuidv4(),
    b2b: tData.b2b,
    b2bName: tData.bn,
    b2bCode: tData.bc,
    org: reqBody.org || tData.org,
    orgName: reqBody.orgName || tData.on,
    orgCode: reqBody.orgCode || tData.oc,
    orgs: reqBody.orgs || [tData.org],
    team: reqBody.team,
    tName: reqBody.tName,
    tCode: reqBody.tCode,
    pTeamIDs: reqBody.pTeamIDs,

    ...userObj,
    urID: reqBody.urID,
    userRole: reqBody.userRole,
    urSeq: reqBody.urSeq,

    tempName: reqBody.tempName,
    tempSeq: reqBody.tempSeq,
    tempNotes: reqBody.tempNotes || '',
    tStatus: reqBody.tStatus || 'Active',

    tempData: reqBody.tempData,

    cuType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr,
    uuType: cuType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
}