/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const beCtrl = require('../controllers/B2bEntitiesCtrl');

module.exports.controller = (app) => {

  app.get('/', beCtrl.apiServerStatus);

  app.post('/ctpb2b/v1/entities/list', beCtrl.getB2bEntsList);
  app.post('/ctpb2b/v1/entities/create', beCtrl.postB2bEntCreate);
  app.get('/ctpb2b/v1/entities/:recordid/view', beCtrl.getB2bEntView);
  app.put('/ctpb2b/v1/entities/:recordid/:imgid/update', beCtrl.putB2bEntUpdate);
  app.put('/ctpb2b/v1/entities/:recordid/status-update', beCtrl.putB2bEntStatusUpdate);
  app.post('/ctpb2b/v1/entities/total/list', beCtrl.getB2bEntsTotalList);
  app.post('/ctpb2b/v1/entities/get/smtp/details', beCtrl.getB2bEntsSmptpDetails);
  app.put('/ctpb2b/v1/entities/smtp/details/:recordid/update', beCtrl.putB2bEntsSmptpDetailsUpdate);

};
