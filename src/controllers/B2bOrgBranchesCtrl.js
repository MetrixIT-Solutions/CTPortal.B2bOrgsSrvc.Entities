/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const util = require('../lib/util');
const bobSrvc = require('../services/B2bOrgBranchesSrvc');
const bobCv = require('./apiVldns/B2bOrgBranchesCtrlVldns');
const tokens = require('../tokens');
const SetRes = require('../SetRes');

const getB2bOrgsBrchsList = (req, res) => {
  const vds = bobCv.branchesListVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bobCv.tokenVldn(tData);
      if (tv.flag) {
        bobSrvc.getB2bOrgsBrchsList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const getB2bOrgsTotalBrchsList = (req, res) => {
  if (req.headers.ctpb2batoken) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bobCv.tokenVldn(tData);
      if (tv.flag) {
        bobSrvc.getB2bOrgsTotalBrchsList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, SetRes.tokenRequired());
}

const getB2bOrgsBrchsView = (req, res) => {
  const vds = bobCv.branchesViewVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bobCv.tokenVldn(tData);
      if (tv.flag) {
        bobSrvc.getB2bOrgsBrchsView(req.params.recordId, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const postB2bOrgsBrchsCreate = (req, res) => {
  const vds = bobCv.branchescreateVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bobCv.tokenVldn(tData);
      if (tv.flag) {
        bobSrvc.postB2bOrgsBrchsCreate(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bOrgBranchUpdate = (req, res) => {
  const vds = bobCv.branchUpdateVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bobCv.tokenVldn(tData);
      if (tv.flag) {
        bobSrvc.putB2bOrgBranchUpdate(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const deleteB2bOrgBranch = (req, res) => {
  const vds = bobCv.branchDelVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bobCv.tokenVldn(tData);
      if (tv.flag) {
        bobSrvc.deleteB2bOrgBranch(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bOrgBranchStsUpdate = (req, res) => {
  const vds = bobCv.branchStsUpdVldn(req);  
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bobCv.tokenVldn(tData);
      if (tv.flag) {
        bobSrvc.putB2bOrgBranchStsUpdate(req.params.recordId , req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

module.exports = {
  getB2bOrgsBrchsList, getB2bOrgsTotalBrchsList, getB2bOrgsBrchsView, postB2bOrgsBrchsCreate, putB2bOrgBranchUpdate,
  deleteB2bOrgBranch, putB2bOrgBranchStsUpdate
};
