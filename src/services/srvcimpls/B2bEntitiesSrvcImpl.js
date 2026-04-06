/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
const cs = require('../CommonSrvc');
const beDaoimpl = require('../../daos/daosimpls/B2bEntitiesDaosImpl');
const beDao = require('../../daos/B2bEntitiesDaos');
const { actions } = require('../../consts/B2bEntitiesConsts.json');

const entUpdate = (resObj, obj, req) => {
  const reqBody = JSON.parse(req.body.orgData);
  if (resObj.status !== '200' && obj.updateObj.oiPath) {
    const filesPath = [req.file];
    cs.dltFolder(filesPath);
  } else if (resObj.status == '200') {
    const pathData = reqBody.iPath ? reqBody.iPath.split(config.apiHost) : '';
    const path = pathData.length ? pathData[1] : '';
    const folderData = path.split(req.params.imgid);
    const folder = folderData.length ? folderData[0] : ''
    const filesPath = [{ destination: folder + req.params.imgid }];
    if ((req.file && req.params.imgid !== reqBody.orgCode.replace(/\s+/g, "").toLowerCase()) || (reqBody.iPath && !obj.updateObj.oiPath)) {
      cs.dltFolder(filesPath);
    } 
    updateB2bEntsLcs(resObj.resData.result, reqBody.entObj);
  }
};

module.exports = {
  entUpdate
};

const updateB2bEntsLcs = (resData, oldObj) => {
  const newObj = {
    orgName: resData.orgName, orgCode: resData.orgCode, orgStatus: resData.orgStatus, orgSeq: resData.orgSeq,
    orgIcon: resData.orgIcon, orgNotes: resData.orgNotes, oiActualName: resData.oiActualName, oiPath: resData.oiPath,
    hNum: resData.hNum, area: resData.area, aLocality: resData.aLocality, zip: resData.zip,
    state: resData.state, stateCode: resData.stateCode, city: resData.city, plusCode: resData.plusCode, 
    orgEmID: resData.orgEmID, orgMobCc: resData.orgMobCc, orgMobNum: resData.orgMobNum, orgMobCcNum: resData.orgMobCcNum,
    orgWs: resData.orgWs, orgGst: resData.orgGst, orgPan: resData.orgPan, orgCin: resData.orgCin,  orgTin: resData.orgTin, orgSsn: resData.orgSsn, orgEin: resData.orgEin, orgItin: resData.orgItin, orgTan: resData.orgTan,
  };
  const data = findOddKeyValues(oldObj, newObj);
  const obj = beDaoimpl.setB2bEntsLcsUpdate(data, actions.u, resData);
  beDao.putB2bEntLcsUpdate(obj.query, obj.updateObj, (resObj) => { });
}

const findOddKeyValues = (obj1, obj2) => {
  const oldObj = {}; const newObj = {};
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      oldObj[key] = obj1[key], newObj[key] = obj2[key]
    }
  }
  return { oldObj, newObj };
}