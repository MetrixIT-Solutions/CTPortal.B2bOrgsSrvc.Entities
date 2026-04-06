/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var fs = require('fs');
var multer = require('multer');

const beSrvc = require('../services/B2bEntitiesSrvc');
const beCv = require('./apiVldns/B2bEntitiesCtrlVldns');
const tokens = require('../tokens');
const util = require('../lib/util');
const SetRes = require('../SetRes');
const cs = require('../services/CommonSrvc');

const apiServerStatus = (req, res) => {
  const resObj = SetRes.apiServerStatus();
  util.sendApiRes(res, resObj);
}

const getB2bEntsList = (req, res) => {
  const vds = beCv.entsListVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        beSrvc.getB2bEntsList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

var storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const reqBody = JSON.parse(req.body.orgData);
    var uplLoc = 'assets/orgs/' + reqBody.orgCode.replace(/\s+/g, "").toLowerCase();
    if (!fs.existsSync(uplLoc)) {
      fs.mkdirSync(uplLoc);
    }
    callback(null, uplLoc);
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage }).single('iconFile');

const postB2bEntCreate = (req, res, next) => {
  upload(req, res, (err) => {
    const vds = beCv.entCreateVldn(req);
    if (vds.flag) {
      tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
        const tv = beCv.tokenVldn(tData);
        if (tv.flag) {
          beSrvc.postB2bEntCreate(req, tData.tokenData, (resObj) => {
            const apiRes = {...resObj, userObj: tData?.data};
            util.sendApiRes(res, apiRes);
          });
        } else {
          if (req.file) {
            const filesPath = [req.file];
            cs.dltFolder(filesPath);
          }
          util.sendApiRes(res, tv.result);
        }
      });
    } else {
      if (req.file) {
        const filesPath = [req.file];
        cs.dltFolder(filesPath);
      }
      util.sendApiRes(res, vds.result);
    }
  });
}

const getB2bEntView = (req, res) => {
  const vds = beCv.getEntViewVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        beSrvc.getB2bEntView(req.params.recordid, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);

    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bEntUpdate = (req, res) => {
  upload(req, res, (err) => {
    const vds = beCv.entUpdateVldn(req);
    if (vds.flag) {
      tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
        const tv = beCv.tokenVldn(tData);
        if (tv.flag) {
          beSrvc.putB2bEntUpdate(req, tData.tokenData, (resObj) => {
            const apiRes = {...resObj, userObj: tData?.data};
            util.sendApiRes(res, apiRes);
          });
        } else {
          if (req.file) {
            const filesPath = [req.file];
            cs.dltFolder(filesPath);
          }
          util.sendApiRes(res, tv.result);
        }
      });
    } else {
      if (req.file) {
        const filesPath = [req.file];
        cs.dltFolder(filesPath);
      }
      util.sendApiRes(res, vds.result);
    }
  });
}

const putB2bEntStatusUpdate = (req, res) => {
  const vds = beCv.entStatusVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        beSrvc.putB2bEntStatusUpdate(req.body, req.params.recordid, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else {
        util.sendApiRes(res, tv.result);
      }
    });
  } else {
    util.sendApiRes(res, vds.result);
  }
}

const getB2bEntsTotalList = (req, res) => {
  if(req.headers.ctpb2batoken){
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        beSrvc.getB2bEntsTotalList(req.body, tData.tokenData, (resObj) => {
          const apiRes = {...resObj, userObj: tData?.data};
          util.sendApiRes(res, apiRes);
        });
      } else {
        util.sendApiRes(res, tv.result);
      }
    });
  } else util.sendApiRes(res, SetRes.tokenRequired());
}

const getB2bEntsSmptpDetails = (req, res) => {
  if(req.body.org && req.body.b2b){
    beSrvc.getB2bEntsSmptpDetails(req.body, (resObj) => {
      util.sendApiRes(res, resObj);
    });
  } else {
     util.sendApiRes(res, SetRes.mandatory());
  }
}

const putB2bEntsSmptpDetailsUpdate = (req, res) => {
  const vds = beCv.smptpDetailsUpdate(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = beCv.tokenVldn(tData);
      if (tv.flag) {
        beSrvc.putB2bEntsSmptpDetailsUpdate(req, tData.tokenData, (resObj) => {
          const apiRes = tData.rolesObj ? { ...resObj, rolesObj: tData.rolesObj } : resObj;
          util.sendApiRes(res, apiRes);
        });
      } else {
        util.sendApiRes(res, tv.result);
      }
    });
  } else {
    util.sendApiRes(res, vds.result);
  }
}

module.exports = {
  apiServerStatus, getB2bEntsList, postB2bEntCreate, getB2bEntView,
  putB2bEntUpdate, putB2bEntStatusUpdate, getB2bEntsTotalList, getB2bEntsSmptpDetails, putB2bEntsSmptpDetailsUpdate
};
