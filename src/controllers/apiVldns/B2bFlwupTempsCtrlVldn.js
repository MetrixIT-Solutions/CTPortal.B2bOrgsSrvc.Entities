/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../../SetRes');

const flwTmCreateVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!reqBody.urID || !reqBody.userRole || !reqBody.urSeq || !reqBody.tempName || !reqBody.tempSeq || !reqBody.tStatus || !reqBody.tempData) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const flwTmViewCVldn = (req) => {
  if (!req.headers.ctpb2batoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const flwTmUpdateCVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId || !reqBody.tempName || !reqBody.tempSeq || !reqBody.tStatus || !reqBody.tempData) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const flwTmAssignCVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = SetRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!reqBody.id || !reqBody.team) {
    const mn = SetRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

module.exports = {
  flwTmCreateVldn, flwTmViewCVldn, flwTmUpdateCVldn, flwTmAssignCVldn
}