/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bFlwTSrvc = require('../services/B2bFlwupTempsSrvc');
const beCv = require('./apiVldns/B2bEntitiesCtrlVldns');
const bfTCv = require('./apiVldns/B2bFlwupTempsCtrlVldn');
const tokens = require('../tokens');
const util = require('../lib/util');

const getB2bFlwupTempList = (req, res) => {
  const vds = beCv.entsListVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        bFlwTSrvc.getB2bFlwupTempList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const postB2bFlwupTempCreate = (req, res) => {
  const vds = bfTCv.flwTmCreateVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        bFlwTSrvc.postB2bFlwupTempCreate(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const getB2bFlwupTempView = (req, res) => {
  const vds = bfTCv.flwTmViewCVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        bFlwTSrvc.getB2bFlwupTempView(req.params.recordId, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bFlwupTempUpdate = (req, res) => {
  const vds = bfTCv.flwTmUpdateCVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        bFlwTSrvc.putB2bFlwupTempUpdate(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const getB2bFlwupTempAssignList = (req, res) => {
  const vds = bfTCv.flwTmAssignCVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        bFlwTSrvc.getB2bFlwupTempAssignList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

module.exports = {
  getB2bFlwupTempList, postB2bFlwupTempCreate, getB2bFlwupTempView, putB2bFlwupTempUpdate, getB2bFlwupTempAssignList
}