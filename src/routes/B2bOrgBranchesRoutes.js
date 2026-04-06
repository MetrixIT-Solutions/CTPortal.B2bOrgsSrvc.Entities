/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bobCtrl = require('../controllers/B2bOrgBranchesCtrl');

module.exports.controller = (app) => {

  app.post('/ctpb2b/v1/orgs/branches/list', bobCtrl.getB2bOrgsBrchsList);
  app.post('/ctpb2b/v1/orgs/total/branches/list', bobCtrl.getB2bOrgsTotalBrchsList);
  app.get('/ctpb2b/v1/orgs/branches/view/:recordId', bobCtrl.getB2bOrgsBrchsView);
  app.post('/ctpb2b/v1/orgs/branches/create', bobCtrl.postB2bOrgsBrchsCreate);
  app.put('/ctpb2b/v1/org/branches/update/:recordId', bobCtrl.putB2bOrgBranchUpdate);
  app.delete('/ctpb2b/v1/org/branches/delete/:recordId', bobCtrl.deleteB2bOrgBranch);
  app.put('/ctpb2b/v1/org/branches/status/update/:recordId', bobCtrl.putB2bOrgBranchStsUpdate);

};
