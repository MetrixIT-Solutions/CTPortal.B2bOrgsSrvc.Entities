/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema;

// --- Begin: B2B Organization / Team / Users Follow Up Templates Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},
  orgs: {type: [String], required: false}, // Organizations IDs(_id)
  team: {type: String, required: false}, // Team._id
  tName: {type: String, required: false}, // oTeam
  tCode: {type: String, required: false}, // otCode
  pTeamIDs: {type: [String], required: false}, // ['', '']

  user: {type: String, required: false},
  uName: {type: String, required: false},
  uRefID: {type: String, required: false},
  uPrimary: {type: String, required: false},
  urID: {type: String, required: true}, // User Role: _id
  userRole: {type: String, required: true}, // User Role: rName
  urSeq: {type: Number, required: true}, // User Role Sequence: rSeq

  tempName: {type: String, required: true}, // Template Name
  tempSeq: {type: Number, required: true},
  tempNotes: {type: String, required: false}, // Template Notes
  tStatus: {type: String, required: true}, // Template Status: Active, Inactive

  tempData: [{ // Max 20
    _id: {type: String, required: true}, // name
    seq: {type: Number, required: true},
    dataType: {type: String, required: true},
    data: {type: [String], required: false},
    limit: {type: Number, default: 1},
    notes: {type: String, required: false},
  }],

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uuType: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true, trim: true}, // Updated Users._id
  uuName: {type: String, required: true}, // Updated Users.pName
  uDate: {type: Date, required: true}, // Date & Time
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({orgName: 'text', tName: 'text', userRole: 'text', uName: 'text', tempName: 'text', tStatus: 'text'});
schema.index({delFlag: -1, b2b: 1, org: 1, team: 1, userRole: 1, user: 1, tempName: 1}, {unique: true});
schema.index({delFlag: -1, b2b: 1, org: 1, pTeamIDs: 1, urSeq: 1, user: 1});
schema.index({uPrimary: 1, urSeq: 1, tName: 1, orgName: 1, tempSeq: 1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BFlwupTemps, schema);
// --- End: B2B Organization / Team / Users Follow Up Templates Schema --- //
