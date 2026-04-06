/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const beOrgTsSrvc = require('../services/B2bOrgTeamsSrvc');
const beOrgTsCv = require('./apiVldns/B2bOrgTeamsCtrlVldns');
const tokens = require('../tokens');
const util = require('../lib/util');
const SetRes = require('../SetRes');

const getB2bOrgTeamsList = (req, res) => {
  const vds = beOrgTsCv.teamsListVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beOrgTsCv.tokenVldn(tData);
      if (tv.flag) {
        beOrgTsSrvc.getB2bOrgTeamsList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const postB2bOrgTeamCreate = (req, res) => {
  const vds = beOrgTsCv.teamCreateVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beOrgTsCv.tokenVldn(tData);
      if (tv.flag) {
        beOrgTsSrvc.postB2bOrgTeamCreate(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const getB2bOrgTeamsTotalList = (req, res) => {
  if (req.headers.ctpb2batoken) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beOrgTsCv.tokenVldn(tData);
      if (tv.flag) {
        beOrgTsSrvc.getB2bOrgTeamsTotalList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, SetRes.tokenRequired());
}

const postB2bOrgTeamUpdate = (req, res) => {
  const vds = beOrgTsCv.teamCreateVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beOrgTsCv.tokenVldn(tData);
      if (tv.flag) {
        beOrgTsSrvc.postB2bOrgTeamUpdate(req.body, tData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const postB2bOrgTeamView = (req, res) => {
  const vds = beOrgTsCv.teamViewVldn(req);  
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beOrgTsCv.tokenVldn(tData);
      if (tv.flag) {
        beOrgTsSrvc.postB2bOrgTeamView(req.params.recordId, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const deleteB2bOrgTeam = (req, res) => {
  const vds = beOrgTsCv.teamDelVldn(req);  
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beOrgTsCv.tokenVldn(tData);
      if (tv.flag) {
        beOrgTsSrvc.deleteB2bOrgTeam(req.params.recordId, req.body, tData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bOrgTeamStsUpdate = (req, res) => {
  const vds = beOrgTsCv.teamStsUpdVldn(req);  
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beOrgTsCv.tokenVldn(tData);
      if (tv.flag) {
        beOrgTsSrvc.putB2bOrgTeamStsUpdate(req.params.recordId, req.body, tData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

module.exports = {
  getB2bOrgTeamsList, postB2bOrgTeamCreate, getB2bOrgTeamsTotalList, postB2bOrgTeamUpdate, postB2bOrgTeamView, deleteB2bOrgTeam, putB2bOrgTeamStsUpdate
};
