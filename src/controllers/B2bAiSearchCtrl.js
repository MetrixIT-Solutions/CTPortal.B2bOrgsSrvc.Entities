/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const baiCv = require('./apiVldns/B2bAiSearchCtrlVldns');
const beCv = require('./apiVldns/B2bEntitiesCtrlVldns');
const baiSrvc = require('../services/B2bAiSearchSrvc');
const tokens = require('../tokens');
const util = require('../lib/util');

const postB2bAiSearchByType = async (req, res) => {
  const vds = baiCv.aiSearchByTypeVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        baiSrvc.postB2bAiSearchByType(req.body, tData.tokenData, (resObj) => {
          util.sendApiRes(res, resObj);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

module.exports = {
  postB2bAiSearchByType
};
