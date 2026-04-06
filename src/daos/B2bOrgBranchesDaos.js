/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const B2BOrgBranches = require('../schemas/B2BOrgBranches');
const { pgLimit } = require('../consts/B2bEntitiesConsts.json');

const getB2bOrgsBrchsList = (query, pgNum, limit, callback) => {
  let resultObj = { orgBranchesListCount: 0, orgBranchesList: [] };
  B2BOrgBranches.find(query).skip((pgNum - 1) * limit).limit(limit).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      orgBranchesTotalCount(query, resObj, callback);
    } else {
      const noData = SetRes.noData(resultObj);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bOrgBranchesDao.js, at getB2bOrgsBrchsList:' + error);
    const err = SetRes.unKnownErr(resultObj);
    callback(err);
  });
}

const getB2bOrgsTotalBrchsList = (query, callback) => {
  B2BOrgBranches.find(query).limit(pgLimit).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData([]);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bOrgBranchesDao.js, at getB2bOrgsTotalBrchsList:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

const getB2bOrgsBrchsView = (query, callback) => {
  B2BOrgBranches.findOne(query).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData({});
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bOrgBranchesDao.js, at getB2bOrgsBrchsView:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const createCommonData = (createData, callback) => {
  createData.save().then((resObj) => {
    if (resObj && resObj._id) {
      const sr = SetRes.successRes(resObj);
      callback(sr);
    } else {
      const uf = SetRes.createFailed({});
      callback(uf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.obName || error.keyPattern && error.keyPattern.obCode) {
      const uniq = error.keyPattern.obName ? 'Branch Name' : 'Branch Code';
      logger.error('Uniqueness Error in daos/B2bOrgBranchesDao.js, at createCommonData:' + error);
      const err = SetRes.uniqueErr(uniq + ' Already Exists');
      callback(err);
    } else {
      logger.error('Un-known Error in daos/B2bOrgBranchesDao.js, at createCommonData:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
    }
  });
}

const updateBranchData = (query, updateObj, callback) => {
  B2BOrgBranches.findOneAndUpdate(query, { $set: updateObj }, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const resMsg = SetRes.successRes(resObj);
      callback(resMsg);
    } else {
      const uf = SetRes.updateFailed();
      callback(uf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.obName || error.keyPattern && error.keyPattern.obCode) {
      const uniq = error.keyPattern.obName ? 'Branch Name' : 'Branch Code';
      logger.error('Uniqueness Error in daos/B2bOrgBranchesDao.js, at updateBranchData:' + error);
      const err = SetRes.uniqueErr(uniq + ' Already Exists');
      callback(err);
    } else {
      logger.error('Un-known Error in daos/B2bOrgBranchesDao.js, at updateBranchData:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
    }
  });
}

module.exports = {
  getB2bOrgsBrchsList, getB2bOrgsTotalBrchsList, getB2bOrgsBrchsView, createCommonData, updateBranchData
};

const orgBranchesTotalCount = (query, resObj, callback) => {
  let resultObj = { orgBranchesListCount: resObj.length, orgBranchesList: resObj };
  B2BOrgBranches.countDocuments(query).then((resultCount) => {
    if (resultCount) {
      resultObj = { orgBranchesListCount: resultCount, orgBranchesList: resObj };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const result = SetRes.successRes(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bOrgBranchesDao.js, at orgBranchesTotalCount:' + error);
    const result = SetRes.successRes(resultObj);
    callback(result);
  });
}
