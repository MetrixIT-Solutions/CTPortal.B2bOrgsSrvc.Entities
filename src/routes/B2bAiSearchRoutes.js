/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const baisCtrl = require('../controllers/B2bAiSearchCtrl');

module.exports.controller = (app) => {

  app.post('/ctpb2b/v1/:type/ai-search', baisCtrl.postB2bAiSearchByType);

}