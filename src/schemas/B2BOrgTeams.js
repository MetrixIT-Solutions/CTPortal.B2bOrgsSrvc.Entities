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

// --- Begin: B2B Organization Teams Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  idSeq: {
    seq: {type: String, required: true}, // Country, State and Year(2022) Moth(10) Day(10)
    cCode: {type: String, required: false}, // Country Code: IND
    sCode: {type: String, required: false}, // State Code: TS
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    day: {type: Number, required: true}
  },
  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},

  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},
  oBranch: {type: String, required: false},
  obName: {type: String, required: false},
  obCode: {type: String, required: false},

  potId: {type: String, required: false}, // Parent Organization Team Id -> Onsite Team
  potName: {type: String, required: false}, // Parent Organization Team Name -> Onsite Team
  potCode: {type: String, required: false}, // Parent Organization Team Code -> Onsite Team
  potLevel: {type: String, required: false}, // Parent Organization Team Level(Code): Management->Onsite Team
  potlIds: {type: [String], required: false}, // ['', '']
  oTeam: {type: String, required: true}, // Offshore Team
  otCode: {type: String, required: true},
  otSeq: {type: String, default: 0},
  otNotes: {type: String, required: false, trim: true}, // Organization Team Notes
  otStatus: {type: String, required: true}, // Organization Team Status: Active, Inactive

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

schema.index({orgName: 'text', orgCode: 'text', potLevel: 'text', oTeam: 'text', otCode: 'text'});
schema.index({b2b: 1, org: 1, oTeam: 1}, {unique: true});
schema.index({b2b: 1, org: 1, otCode: 1}, {unique: true});
schema.index({delFlag: -1, b2b: 1});
schema.index({delFlag: -1, b2b: 1, org: 1});
schema.index({delFlag: -1, b2b: 1, org: 1, potlIds: 1});
schema.index({delFlag: -1, b2b: 1, org: 1, otStatus: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BOrgTeams, schema);
// --- End: B2B Organization Teams Schema --- //
