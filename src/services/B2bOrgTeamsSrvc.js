/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const b2bUserAuthSrvc = require('../B2bUserAuthSrvc');
const beOrgTsDaoimpl = require('../daos/daosimpls/B2bOrgTeamsDaosImpl');
const beOrgTsDao = require('../daos/B2bOrgTeamsDaos');
const { status, pDelMsg } = require('../consts/B2bEntitiesConsts.json');
const SetRes = require('../SetRes');

const getB2bOrgTeamsList = (reqBody, tData, callback) => {
  const obj = beOrgTsDaoimpl.orgTeamsListObj(reqBody, tData);
  beOrgTsDao.getB2bOrgTeamsList(obj, reqBody.pgNum, reqBody.limit, callback);
}

const postB2bOrgTeamCreate = (reqBody, tData, callback) => {
  const obj = beOrgTsDaoimpl.orgTeamCreateObj(reqBody, tData);
  beOrgTsDao.postB2bOrgTeamCreate(obj, callback);
}

const getB2bOrgTeamsTotalList = (reqBody, tData, callback) => {
  const obj = beOrgTsDaoimpl.orgTeamsListObj(reqBody, tData);
  obj['otStatus'] = status;
  beOrgTsDao.getB2bOrgTeamsTotalList(obj, callback);
}

const postB2bOrgTeamUpdate = (reqBody, tData, callback) => {
  const qry = beOrgTsDaoimpl.getOrgTeam(reqBody.recordId, tData.tokenData);
  const updateObj = beOrgTsDaoimpl.orgTeamUpdateObj(reqBody, tData.tokenData);
  b2bUserAuthSrvc.getB2BUserTeam(tData.ctpb2batoken, reqBody.recordId, (err, resObj) => {
    if (resObj?.status == '200') callback(SetRes.updateFailed('Can not be editable, This team is used in admin users'));
    else if (err && err.response && err.response?.data?.status == '204') {
      b2bUserAuthSrvc.getB2BInviteTeam(tData.ctpb2batoken, reqBody.recordId, '', (err1, resObj1) => {
        if (resObj1.status == '200') callback(SetRes.updateFailed('Can not be editable, This team is used in Invitations'));
        else if (err1 && err1.response && err1.response?.data?.status == '204') {
          b2bUserAuthSrvc.getB2BEndUserTeam(tData.ctpb2batoken, reqBody.recordId, {status: ''}, (err2, resObj2) => { 
            if (resObj2.status == '200') callback(SetRes.updateFailed('Can not be editable, This team is used in consultant'));
            else if (err2 && err2.response && err2.response?.data?.status == '204') beOrgTsDao.updateOrgTeamData(qry, updateObj, callback);
            else callback(SetRes.updateFailed({}));
          });
        } else callback(SetRes.updateFailed({}));
      });
    } else callback(SetRes.updateFailed({}));
  });
}

const postB2bOrgTeamView = (recordId, tData, callback) => {
  const qry = beOrgTsDaoimpl.getOrgTeam(recordId, tData);
  beOrgTsDao.getB2bOrgTeamData(qry, callback);
}

const deleteB2bOrgTeam = (recordId, reqBody, tData, callback) => {
  const qry = beOrgTsDaoimpl.getOrgTeam(recordId, tData.tokenData);
  const pIdQry = beOrgTsDaoimpl.getOrgPIDTeam(recordId);
  b2bUserAuthSrvc.getB2BUserTeam(tData.ctpb2batoken, recordId, (err, resObj) => {
    if (resObj.status == '200') callback(SetRes.deleteFailed('Can not be delete, This team is used in admin users'));
    else if (err && err.response && err.response?.data?.status == '204') {
      b2bUserAuthSrvc.getB2BInviteTeam(tData.ctpb2batoken, recordId, '', (err1, resObj1) => {
        if (resObj1.status == '200') callback(SetRes.deleteFailed('Can not be delete, This team is used in Invitations'));
        else if (err1 && err1.response && err1.response?.data?.status == '204') {
          b2bUserAuthSrvc.getB2BEndUserTeam(tData.ctpb2batoken, recordId, {status: ''}, (err2, resObj2) => { 
            if (resObj2.status == '200') callback(SetRes.deleteFailed('Can not be delete, This team is used in consultant'));
            else if (err2 && err2.response && err2.response?.data?.status == '204') {
              beOrgTsDao.getB2bOrgTeamData(pIdQry, tRes => {
                if (tRes.status == '200') callback(SetRes.deleteFailed(pDelMsg));
                else if (tRes.status == '204') {
                  const delObj = beOrgTsDaoimpl.deleteTeam(reqBody, tData.tokenData);
                  beOrgTsDao.updateOrgTeamData(qry, delObj, resObj => {
                    if(resObj.status === '200') callback(SetRes.successRes('Deleted successfully'));
                    else if(resObj.status === '195') callback(SetRes.deleteFailed({}));
                    else callback(resObj);
                  });
                } else callback(tRes);
              });
            } else callback(SetRes.deleteFailed({}));
          });
        } else callback(SetRes.deleteFailed({}));
      });
    } else callback(SetRes.deleteFailed({}));
  });
}

const putB2bOrgTeamStsUpdate = (recordId, reqBody, tData, callback) => {
  const qry = beOrgTsDaoimpl.getOrgTeam(recordId, tData.tokenData);
  if(reqBody.status == 'Active') {
    const updObj = beOrgTsDaoimpl.teamStatusUpdate(reqBody, tData);
    beOrgTsDao.updateOrgTeamData(qry, updObj, callback);
  } else {
    b2bUserAuthSrvc.getB2BUserTeam(tData.ctpb2batoken, recordId, (err, resObj) => {
      if (resObj.status == '200') callback(SetRes.updateFailed('Can not be Inactive, This team is used in admin users'));
      else if (err && err.response && err.response?.data?.status == '204') {
        b2bUserAuthSrvc.getB2BEndUserTeam(tData.ctpb2batoken, recordId, {status: reqBody.status}, (err1, resObj1) => {
          if (resObj1?.status == '200') callback(SetRes.updateFailed('Can not be Inactive, This team is used in consultant'));
          else if (err1 && err1.response && err1.response?.data?.status == '204') {
            b2bUserAuthSrvc.getB2BInviteTeam(tData.ctpb2batoken, recordId, reqBody.status, (err2, resObj2) => {
              if (resObj2.status == '200') callback(SetRes.updateFailed('Can not be Inactive, This team is used in Invitations'));
              else if (err2 && err2.response && err2.response?.data?.status == '204') {
                const updObj = beOrgTsDaoimpl.teamStatusUpdate(reqBody, tData.tokenData);
                beOrgTsDao.updateOrgTeamData(qry, updObj, callback);
              } else callback(SetRes.updateFailed({}));
            });
          } else callback(SetRes.updateFailed({}));
        });
      } else callback(SetRes.updateFailed({}));
    });
  }
}

module.exports = {
  getB2bOrgTeamsList, postB2bOrgTeamCreate, getB2bOrgTeamsTotalList, postB2bOrgTeamUpdate, postB2bOrgTeamView, deleteB2bOrgTeam, putB2bOrgTeamStsUpdate
};