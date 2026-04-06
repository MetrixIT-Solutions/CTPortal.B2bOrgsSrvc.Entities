/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const beDaoimpl = require('../daos/daosimpls/B2bEntitiesDaosImpl');
const beDao = require('../daos/B2bEntitiesDaos');
const cs = require('./CommonSrvc');
const beSrvcImpl = require('./srvcimpls/B2bEntitiesSrvcImpl');
const { status, actions } = require('../consts/B2bEntitiesConsts.json');
const SetRes = require('../SetRes');
const bobDaoimpl = require('../daos/daosimpls/B2bOrgBranchesDaosImpl');
const bobDao = require('../daos/B2bOrgBranchesDaos');

const getB2bEntsList = (reqBody, tData, callback) => {
  const obj = beDaoimpl.entsList(reqBody, tData);
  beDao.getB2bEntsList(obj, reqBody.pgNum, reqBody.limit, callback);
}

const postB2bEntCreate = (req, tData, callback) => {
  const reqBody = JSON.parse(req.body.orgData);
  const file = req.file || {};
  const orgData = beDaoimpl.entCreateData(reqBody, file, tData);
  beDao.commonCreateFunc(orgData, (resObj) => {
    if (resObj.status == '200') {
      const data = resObj.resData.result;
      const obj = beDaoimpl.entLcsCreateObj(data, actions.c);
      beDao.commonCreateFunc(obj, (resObj1) => { });
      const orgData = Object.assign({}, resObj.resData.result.toObject());
      const bData = beDaoimpl.setBranchData(orgData, reqBody);
      const createData = bobDaoimpl.branchData(bData, tData);
      bobDao.createCommonData(createData, (resObj1) => {});
    } else {
      if (req.file) {
        const filesPath = [req.file];
        cs.dltFolder(filesPath);
      }
    }
    callback(resObj);
  });
}

const getB2bEntView = (id, tData, callback) => {
  const obj = beDaoimpl.entView(id, tData);
  beDao.getB2bEntView(obj, callback);
}

const putB2bEntUpdate = (req, tData, callback) => {
  const reqBody = JSON.parse(req.body.orgData);
  const orgCode = reqBody.orgCode.replace(/\s+/g, "").toLowerCase();
  if (((req.params.recordid !== tData.b2b) || (req.params.recordid == tData.b2b && orgCode == tData.bc))) {
    const obj = beDaoimpl.setEntUpdateObj(req, reqBody, tData);
    beDao.putB2bEntUpdate(obj.query, obj.updateObj, (resObj) => {
      callback(resObj);
      beSrvcImpl.entUpdate(resObj, obj, req);
    });
  } else {
    const uf = SetRes.updateFailed({});
    callback(uf);
  }
}

const putB2bEntStatusUpdate = (reqBody, id, tData, callback) => {
  const query = beDaoimpl.entView(id, tData);
  const updateObj = beDaoimpl.entStatusUpdate(reqBody, tData);
  beDao.putB2bEntUpdate(query, updateObj, callback);
}

const getB2bEntsTotalList = (reqBody, tData, callback) => {
  const obj = beDaoimpl.entsList(reqBody, tData);
  obj['orgStatus'] = status;
  beDao.getB2bEntsTotalList(obj, callback);
}

const getB2bEntsSmptpDetails = (reqBody, callback) => {
  const obj = beDaoimpl.getSmptpDetails(reqBody);
  beDao.getB2BEntitiesSmtpData(obj.query1, obj.project, (resObj) => {
    if (resObj.status == '204') {
      beDao.getB2BEntitiesSmtpData(obj.query2, obj.project, callback);
    } else callback(resObj);
  });
}

const putB2bEntsSmptpDetailsUpdate = (req, tData, callback) => {
  const query = beDaoimpl.entView(req.params.recordid, tData);
  const updateObj = beDaoimpl.putB2bEntsSmptpDetailsUpdate(req.body, tData);
  beDao.putB2bEntUpdate(query, updateObj, callback);
}

module.exports = {
  getB2bEntsList, postB2bEntCreate, getB2bEntView, putB2bEntUpdate, putB2bEntStatusUpdate, 
  getB2bEntsTotalList, getB2bEntsSmptpDetails, putB2bEntsSmptpDetailsUpdate
};