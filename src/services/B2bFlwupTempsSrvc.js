/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bFlwTDaoimpl = require('../daos/daosimpls/B2bFlwupTempsDaosImpl');
const bFlwTDao = require('../daos/B2bFlwupTempsDaos');

const getB2bFlwupTempList = (reqBody, tData, callback) => {
  const obj = bFlwTDaoimpl.flwTList(reqBody, tData);
  bFlwTDao.getB2bFlwupTempList(obj, reqBody.pgNum, reqBody.limit, callback);
}

const postB2bFlwupTempCreate = (reqBody, tData, callback) => {
  const crtObj = bFlwTDaoimpl.flwupTemplData(reqBody, tData);
  bFlwTDao.postB2bFlwupTempCreate(crtObj, callback);
}

const getB2bFlwupTempView = (recordId, tData, callback) => {
  const qry = bFlwTDaoimpl.ftQry(recordId, tData);
  bFlwTDao.getB2bFlwupTempView(qry, callback);
}

const putB2bFlwupTempUpdate = (recordId, reqBody, tData, callback) => {
  const qry = bFlwTDaoimpl.ftQry(recordId, tData);
  const upObj = bFlwTDaoimpl.updateFlwTData(reqBody, tData);
  bFlwTDao.putB2bFlwupTempUpdate(qry, upObj, callback);
}

const getB2bFlwupTempAssignList = (reqBody, tData, callback) => {
  const qry = bFlwTDaoimpl.ftAsgQry(reqBody, tData);
  bFlwTDao.getB2bFlwupTempAssignList(qry, callback);
}
module.exports = {
  getB2bFlwupTempList, postB2bFlwupTempCreate, getB2bFlwupTempView, putB2bFlwupTempUpdate, getB2bFlwupTempAssignList
}