/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const B2bEntities = require('../schemas/B2BEntities');
const B2BEntitiesLcs = require('../schemas/B2BEntitiesLcs');
const {pgLimit} = require('../consts/B2bEntitiesConsts.json');

const getB2bEntsList = (query, pgNum, limit, callback) => {
  let resultObj = { orgsListCount: 0, orgsList: [] };
  B2bEntities.find(query).skip((pgNum - 1) * limit).limit(limit).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      orgsTotalCount(query, resObj, callback);
    } else {
      const noData = SetRes.noData(resultObj);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bEntitiesDao.js, at getB2bEntsList:' + error);
    const err = SetRes.unKnownErr(resultObj);
    callback(err);
  });
}

const commonCreateFunc = (creatData, callback) => {
  creatData.save().then((resObj) => {
    if (resObj && resObj._id) {
      const sr = SetRes.successRes(resObj);
      callback(sr);
    } else {
      const uf = SetRes.createFailed({});
      callback(uf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.orgName || error.keyPattern && error.keyPattern.orgCode) {
      const uniq = error.keyPattern.orgName ? 'Organisation Name': 'Organisation Code';
      logger.error('Uniqueness Error in daos/B2bEntitiesDao.js, at commonCreateFunc:' + error);
      const err = SetRes.uniqueErr(uniq + ' Already Exists');
      callback(err);
    } else {
      logger.error('Un-known Error in daos/B2bEntitiesDao.js, at commonCreateFunc:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
    }
  });
}

const getB2bEntView = (query, callback) => {
  B2bEntities.findOne(query).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData({});
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bEntitiesDao.js, at getB2bEntView:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  })
}

const putB2bEntUpdate = (query, updateObj, callback) => {
  B2bEntities.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.orgName || error.keyPattern && error.keyPattern.orgCode) {
      const uniq = error.keyPattern.orgName ? 'Organization Name': 'Organization Code';
      logger.error('Uniqueness Error in daos/B2bEntitiesDao.js, at commonCreateFunc:' + error);
      const err = SetRes.uniqueErr(uniq + 'Already Exists');
      callback(err);
    } else {
      logger.error('Un-known Error in daos/B2bEntitiesDao.js, at putB2bEntUpdate:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
    }
  })
}

const putB2bEntLcsUpdate = (query, updateObj, callback) => {
  B2BEntitiesLcs.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bEntitiesDao.js, at putB2bEntLcsUpdate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  })
}

const getB2bEntsTotalList = (query, callback) => {
  B2bEntities.find(query).limit(pgLimit).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      const noData = SetRes.successRes(resObj);
      callback(noData);
    } else {
      const noData = SetRes.noData([]);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bEntitiesDao.js, at getB2bEntsTotalList:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

const getB2BEntitiesSmtpData = (query, project, callback) => {
  B2bEntities.findOne(query, project).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData({});
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bEntitiesDao.js, at getB2BEntitiesSmtpData:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  })
}

module.exports = {
  getB2bEntsList, commonCreateFunc, getB2bEntView, putB2bEntUpdate, putB2bEntLcsUpdate, getB2bEntsTotalList, getB2BEntitiesSmtpData
};

const orgsTotalCount = (query, resObj, callback) => {
  let resultObj = { orgsListCount: resObj.length, orgsList: resObj };
  B2bEntities.countDocuments(query).then((resultCount) => {
    if (resultCount) {
      resultObj = { orgsListCount: resultCount, orgsList: resObj };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const result = SetRes.successRes(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bEntitiesDao.js, at orgsTotalCount:' + error);
    const result = SetRes.successRes(resultObj);
    callback(result);
  });
}
