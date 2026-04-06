/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const B2BOrgTeams = require('../schemas/B2BOrgTeams');
const {pgLimit} = require('../consts/B2bEntitiesConsts.json');

const getB2bOrgTeamsList = (query, pgNum, limit, callback) => {
  let resultObj = { orgTeamsListCount: 0, orgTeamsList: [] };
  B2BOrgTeams.find(query).skip((pgNum - 1) * limit).limit(limit).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      orgTeamsTotalCount(query, resObj, callback);
    } else {
      const noData = SetRes.noData(resultObj);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bOrgTeamsDao.js, at getB2bOrgTeamsList:' + error);
    const err = SetRes.unKnownErr(resultObj);
    callback(err);
  });
}

const postB2bOrgTeamCreate = (createData, callback) => {
  createData.save().then((resObj) => {
    if (resObj && resObj._id) {
      const sr = SetRes.successRes(resObj);
      callback(sr);
    } else {
      const uf = SetRes.createFailed({});
      callback(uf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.oTeam || error.keyPattern && error.keyPattern.otCode) {
      const uniq = error.keyPattern.oTeam ? 'Team Name' : 'Team Code';
      logger.error('Uniqueness Error in daos/B2bOrgTeamsDao.js, at postB2bOrgTeamCreate:' + error);
      const err = SetRes.uniqueErr(uniq + ' Already Exists');
      callback(err);
    } else {
      logger.error('Un-known Error in daos/B2bOrgTeamsDao.js, at postB2bOrgTeamCreate:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
    }
  });
}

const getB2bOrgTeamsTotalList = (query, callback) => {
  B2BOrgTeams.find(query).limit(pgLimit).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      const noData = SetRes.successRes(resObj);
      callback(noData);
    } else {
      const noData = SetRes.noData([]);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bOrgTeamsDao.js, at getB2bOrgTeamsTotalList:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

const updateOrgTeamData = (query, updateObj, callback) => {
  B2BOrgTeams.findOneAndUpdate(query, { $set: updateObj }, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const resMsg = SetRes.successRes(resObj);
      callback(resMsg);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.oTeam || error.keyPattern && error.keyPattern.otCode) {
      const uniq = error.keyPattern.oTeam ? 'Team Name' : 'Team Code';
      logger.error('Uniqueness Error in daos/B2bOrgTeamsDao.js, at updateOrgTeamData:' + error);
      const err = SetRes.uniqueErr(uniq + ' Already Exists');
      callback(err);
    } else {
      logger.error('Un-known Error in daos/B2bOrgTeamsDao.js, at updateOrgTeamData:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
    }
  });
}

const getB2bOrgTeamData = (query, callback) => {
  B2BOrgTeams.findOne(query).then((resObj) => {
    if (resObj && resObj._id) {
      const resMsg = SetRes.successRes(resObj);
      callback(resMsg);
    } else {
      const uf = SetRes.noData({});
      callback(uf);
    }
  }).catch((err) => {
    logger.error('Unknown Error in daos/B2bOrgTeamsDao.js.js at getB2bOrgTeamData: ' + err);
    const errMsg = SetRes.unKnownErr({});
    callback(errMsg);
  });
}

module.exports = {
  getB2bOrgTeamsList, postB2bOrgTeamCreate, getB2bOrgTeamsTotalList, updateOrgTeamData, getB2bOrgTeamData
};

const orgTeamsTotalCount = (query, resObj, callback) => {
  let resultObj = { orgTeamsListCount: resObj.length, orgTeamsList: resObj };
  B2BOrgTeams.countDocuments(query).then((resultCount) => {
    if (resultCount) {
      resultObj = { orgTeamsListCount: resultCount, orgTeamsList: resObj };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const result = SetRes.successRes(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bOrgTeamsDao.js, at orgTeamsTotalCount:' + error);
    const result = SetRes.successRes(resultObj);
    callback(result);
  });
}
