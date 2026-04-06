/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const B2BFlwupTemps = require('../schemas/B2BFlwupTemps');

const getB2bFlwupTempList = (query, pgNum, limit, callback) => {
  let resultObj = { ftListCount: 0, ftList: [] };
  B2BFlwupTemps.find(query).skip((pgNum - 1) * limit).limit(limit).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      flwupTempsTotalCount(query, resObj, callback);
    } else {
      const noData = SetRes.noData(resultObj);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsDaos.js, at getB2bFlwupTempList:' + error);
    const err = SetRes.unKnownErr(resultObj);
    callback(err);
  });
}

const postB2bFlwupTempCreate = (createData, callback) => {
  createData.save().then((resObj) => {
    if (resObj && resObj._id) {
      const sr = SetRes.successRes(resObj);
      callback(sr);
    } else {
      const uf = SetRes.createFailed({});
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsDaos.js, at postB2bFlwupTempCreate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const getB2bFlwupTempView = (query, callback) => {
  B2BFlwupTemps.findOne(query).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData({});
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsDaos.js, at getB2bFlwupTempView:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  })
}

const putB2bFlwupTempUpdate = (query, updateObj, callback) => {
  B2BFlwupTemps.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsDaos.js, at putB2bFlwupTempUpdate:' + error);
    const err = SetRes.unKnownErr({});
    callback(err);
  });
}

const getB2bFlwupTempAssignList = (query, callback) => {
  B2BFlwupTemps.find(query).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      const sr = SetRes.successRes(resObj);
      callback(sr);
    } else {
      const noData = SetRes.noData(resObj);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsDaos.js, at getB2bFlwupTempAssignList:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

module.exports = {
  getB2bFlwupTempList, postB2bFlwupTempCreate, getB2bFlwupTempView, putB2bFlwupTempUpdate, getB2bFlwupTempAssignList
}

const flwupTempsTotalCount = (query, resObj, callback) => {
  let resultObj = { ftListCount: resObj.length, ftList: resObj };
  B2BFlwupTemps.countDocuments(query).then((resultCount) => {
    if (resultCount) {
      resultObj = { ftListCount: resultCount, ftList: resObj };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const result = SetRes.successRes(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bFlwupTempsDaos.js, at flwupTempsTotalCount:' + error);
    const result = SetRes.successRes(resultObj);
    callback(result);
  });
}
