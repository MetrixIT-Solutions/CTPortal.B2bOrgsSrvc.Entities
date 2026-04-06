/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const sRes = require('../../SetRes');

const tokenVldn = (tData) => {
  if (!tData) {
    const result = sRes.tokenInvalid();
    return { flag: false, result };
  } else if (tData.isExpired) {
    const result = sRes.tokenExpired();
    return { flag: false, result };
  } else if (!tData.tokenData) {
    const result = sRes.tokenSsnErr();
    return { flag: false, result };
  } else {
    return { flag: true, result: tData.tokenData };
  }
}

const entsListVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!reqBody.pgNum || !reqBody.limit) {
    const mn = sRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const entCreateVldn = (req) => {
  const reqBody = JSON.parse(req.body.orgData);
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else {
    const bodyVldn = bodyValidation(reqBody);
    if (!bodyVldn || !reqBody.branchName || !reqBody.branchCode) {
      const rf = sRes.mandatory();
      return { flag: false, result: rf };
    } else {
      return { flag: true };
    }
  }
}

const getEntViewVldn = (req) => {
  const id = req.params.recordid;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!id) {
    const rf = sRes.mandatory();
    return { flag: false, result: rf };
  } else {
    return { flag: true };
  }
}

const entUpdateVldn = (req) => {
  const reqBody = JSON.parse(req.body.orgData);
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else {
    const bodyVldn = bodyValidation(reqBody);
    if (!bodyVldn || !req.params.recordid) {
      const rf = sRes.mandatory();
      return { flag: false, result: rf };
    } else {
      return { flag: true };
    }
  }
}

const entStatusVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!reqBody.orgStatus || !req.params.recordid) {
    const rf = sRes.mandatory();
    return { flag: false, result: rf };
  } else {
    return { flag: true };
  }
}

const getEntTotalListVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!reqBody.status) {
    const rf = sRes.mandatory();
    return { flag: false, result: rf };
  } else {
    return { flag: true };
  }
}

const smptpDetailsUpdate = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordid || !reqBody.senderMail || !reqBody.senderMailPswd || !reqBody.smtp || !reqBody.smtpPort || !reqBody.fromMail) {
    const rf = sRes.mandatory();
    return { flag: false, result: rf };
  } else {
    return { flag: true };
  }
}

module.exports = {
  tokenVldn, entsListVldn, entCreateVldn, getEntViewVldn, entUpdateVldn, entStatusVldn, getEntTotalListVldn, smptpDetailsUpdate
};

const bodyValidation = (reqBody) => {
  if (reqBody.orgName && reqBody.orgCode && reqBody.orgStatus && reqBody.orgEmID && reqBody.orgMobCc && reqBody.orgMobCcNum && reqBody.orgMobNum && reqBody.country && reqBody.state && reqBody.area && reqBody.zip && reqBody.city) {
    return true;
  } else {
    return false;
  }
}
