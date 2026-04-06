/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bFlwTCtrl = require('../controllers/B2bFlwupTempsCtrl');

module.exports.controller = (app) => {

  app.post('/ctpb2b/v1/flwup/temp/list', bFlwTCtrl.getB2bFlwupTempList);
  app.post('/ctpb2b/v1/flwup/temp/create', bFlwTCtrl.postB2bFlwupTempCreate);
  app.get('/ctpb2b/v1/flwup/temp/view/:recordId', bFlwTCtrl.getB2bFlwupTempView);
  app.put('/ctpb2b/v1/flwup/temp/update/:recordId', bFlwTCtrl.putB2bFlwupTempUpdate);
  app.post('/ctpb2b/v1/flwup/temp/assign/list', bFlwTCtrl.getB2bFlwupTempAssignList);

}