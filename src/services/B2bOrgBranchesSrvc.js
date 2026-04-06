/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bobDaoimpl = require('../daos/daosimpls/B2bOrgBranchesDaosImpl');
const bobDao = require('../daos/B2bOrgBranchesDaos');
const SetRes = require('../SetRes');
const { status } = require('../consts/B2bEntitiesConsts.json');

const getB2bOrgsBrchsList = (reqBody, tData, callback) => {
  const obj = bobDaoimpl.branchesList(reqBody, tData);
  bobDao.getB2bOrgsBrchsList(obj, reqBody.pgNum, reqBody.limit, callback);
}

const getB2bOrgsTotalBrchsList = (reqBody, tData, callback) => {
  const obj = bobDaoimpl.branchesList(reqBody, tData);
  obj['obStatus'] = status;
  bobDao.getB2bOrgsTotalBrchsList(obj, callback);
}

const getB2bOrgsBrchsView = (recordId, callback) => {
  const obj = bobDaoimpl.getOrgBranch(recordId);
  bobDao.getB2bOrgsBrchsView(obj, callback);
}

const postB2bOrgsBrchsCreate = (reqBody, tData, cb) => {
  const createData = bobDaoimpl.branchData(reqBody, tData);
  bobDao.createCommonData(createData, cb);
}

const putB2bOrgBranchUpdate = (recordId, reqBody, tData, cb) => {
  const obj = bobDaoimpl.getOrgBranch(recordId);
  const updObj = bobDaoimpl.UpdatebranchData(reqBody, tData);
  bobDao.updateBranchData(obj, updObj, cb);
}

const deleteB2bOrgBranch = (recordId, reqBody, tData, callback) => {
  const qry = bobDaoimpl.getOrgBranch(recordId);
  const delObj = bobDaoimpl.deleteBranch(reqBody, tData);
  bobDao.updateBranchData(qry, delObj, resObj => {
    if(resObj.status === '200') callback(SetRes.successRes('Deleted successfully'));
    else if(resObj.status === '195') callback(SetRes.deleteFailed({}));
    else callback(resObj);
  });
}

const putB2bOrgBranchStsUpdate = (recordId, reqBody, tData, callback) => {
  const qry = bobDaoimpl.getOrgBranch(recordId);
  const updObj = bobDaoimpl.branchStatusUpdate(reqBody, tData);
  bobDao.updateBranchData(qry, updObj, callback);
}

module.exports = {
  getB2bOrgsBrchsList, getB2bOrgsTotalBrchsList, getB2bOrgsBrchsView, postB2bOrgsBrchsCreate, putB2bOrgBranchUpdate,
  deleteB2bOrgBranch, putB2bOrgBranchStsUpdate
};