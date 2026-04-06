/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bOrgTsCtrl = require('../controllers/B2bOrgTeamsCtrl');

module.exports.controller = (app) => {

  app.post('/ctpb2b/v1/org/teams/list', bOrgTsCtrl.getB2bOrgTeamsList);
  app.post('/ctpb2b/v1/org/teams/create', bOrgTsCtrl.postB2bOrgTeamCreate);
  app.post('/ctpb2b/v1/org/teams/total/list', bOrgTsCtrl.getB2bOrgTeamsTotalList);
  app.post('/ctpb2b/v1/org/teams/update', bOrgTsCtrl.postB2bOrgTeamUpdate);
  app.get('/ctpb2b/v1/org/teams/view/:recordId', bOrgTsCtrl.postB2bOrgTeamView);
  app.delete('/ctpb2b/v1/org/teams/delete/:recordId', bOrgTsCtrl.deleteB2bOrgTeam);
  app.put('/ctpb2b/v1/org/teams/status/update/:recordId', bOrgTsCtrl.putB2bOrgTeamStsUpdate);

};
