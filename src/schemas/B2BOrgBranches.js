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

// --- Begin: B2B Organization Branches Schema --- //
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

  obType: {type: String, required: true}, // Main Branch, Branch
  obName: {type: String, required: true},
  obCode: {type: String, required: true},
  obSeq: {type: String, default: 0},
  obEmID: {type: String, required: false, trim: true}, // Contact Person Email ID
  obMobCc: {type: String, required: false}, // Contact Person Moibile - Cc: Country Code(+91)
  obMobNum: {type: String, required: false}, // Contact Person Mobile Number(9999999999)
  obMobCcNum: {type: String, required: false}, // Contact Person Mobile Number with Country Code(+91 9999999999)
  obAltEmID: {type: String, required: false, trim: true},
  obAltMobCc: {type: String, required: false}, // Contact Person Alternate Mobile - Cc: Country Code(+91)
  obAltMobNum: {type: String, required: false},
  obAltMobCcNum: {type: String, required: false},
  obNotes: {type: String, required: false, trim: true}, // Organization Branch Notes
  obStatus: {type: String, required: true}, // Organization Branch Status: Active, Inactive

  obWs: {type: String, required: false}, // B2B Organization Website
  obGst: {type: String, required: false}, // GST: Goods and Services Tax
  obPan: {type: String, required: false}, // PAN: Permanent Account Number
  obCin: {type: String, required: false}, // CIN: Corporate Identification Number(21Digts)
  obTin: {type: String, required: false}, // TIN: Tax Identification Number
  obSsn: {type: String, required: false}, // SSN: Social Security Number
  obEin: {type: String, required: false}, // EIN: Employer Identification Number
  obItin: {type: String, required: false}, // ITIN: Individual Taxpayer Identification Number
  obTan: {type: String, required: false}, // TAN: Tax deduction and collection Account Number

  hNum: {type: String, required: false}, // Building Name, House Number, Floor
  area: {type: String, required: false}, // Streat, Area, Village
  aLocality: {type: String, required: false}, // Area Locality, Mandal
  zip: {type: String, required: false}, // Zip Code, Pincode
  city: {type: String, required: false}, // City, District
  cityCode: {type: String, required: false}, // City Code, District Code
  state: {type: String, required: false},
  stateCode: {type: String, required: false},
  country: {type: String, required: false},
  countryCode: {type: String, required: false},
  plusCode: {type: Object, required: false},
  geocoordinates: { // geocoordinates
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], required: false} // <longitude>(-180 and 180), <latitude>(-90 and 90)
  },

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

schema.index({obName: 'text', orgCode: 'text', city: 'text', area: 'text', zip: 'text', state: 'text'});
schema.index({b2b: 1, org: 1, obName: 1}, {unique: true});
schema.index({b2b: 1, org: 1, obCode: 1}, {unique: true});
schema.index({delFlag: -1, b2b: 1, org: 1});
schema.index({delFlag: -1, b2b: 1, org: 1, obStatus: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BOrgBranches, schema);
// --- End: B2B Organization Branches Schema --- //
