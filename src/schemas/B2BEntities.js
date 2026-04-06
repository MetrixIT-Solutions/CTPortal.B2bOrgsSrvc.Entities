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

// --- Begin: B2B Entities Schema --- //
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

  pOrg: {type: String, required: true}, // Principal Organization
  poCode: {type: String, required: true}, // Principal Organization Code
  orgType: {type: String, required: true}, // Entity Type: Principal, Master
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true, index: true, unique: true}, // Save as all small, UI display All Caps
  orgSeq: {type: Number, default: 0}, // Company Sequence
  orgNotes: {type: String, required: false, trim: true}, // Company Notes

  orgEmID: {type: String, required: true, trim: true}, // Contact Person Email ID
  orgMobCc: {type: String, required: false}, // Contact Person Moibile - Cc: Country Code(+91)
  orgMobNum: {type: String, required: false}, // Contact Person Mobile Number(9999999999)
  orgMobCcNum: {type: String, required: false}, // Contact Person Mobile Number with Country Code(+91 9999999999)
  orgAltEmID: {type: String, required: false, trim: true},
  orgAltMobCc: {type: String, required: false}, // Contact Person Alternate Mobile - Cc: Country Code(+91)
  orgAltMobNum: {type: String, required: false},
  orgAltMobCcNum: {type: String, required: false},
  orgStatus: {type: String, required: true}, // User Status: Active, Inactive

  orgWs: {type: String, required: false}, // B2B Organization Website
  orgGst: {type: String, required: false}, // GST: Goods and Services Tax
  orgPan: {type: String, required: false}, // PAN: Permanent Account Number
  orgCin: {type: String, required: false}, // CIN: Corporate Identification Number(21Digts)
  orgTin: {type: String, required: false}, // TIN: Tax Identification Number
  orgSsn: {type: String, required: false}, // SSN: Social Security Number
  orgEin: {type: String, required: false}, // EIN: Employer Identification Number
  orgItin: {type: String, required: false}, // ITIN: Individual Taxpayer Identification Number
  orgTan: {type: String, required: false}, // TAN: Tax deduction and collection Account Number
  orgsWs: {type: String, required: false}, // B2B Child Organizations Websites

  orgIcon: {type: String, required: false}, // Company Icon
  oiActualName: {type: String, required: false},
  oiPath: {type: String, required: false},

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
  plusCode: {type: String, required: false},
  geocoordinates: { // geocoordinates
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], required: false} // <longitude>(-180 and 180), <latitude>(-90 and 90)
  },

  senderMail: {type: String, required: false},
  senderMailPswd: {type: String, required: false},
  smtp: {type: String, required: false},
  smtpPort:{type: Number, required: false},
  service: {type: String, required: false},
  from: {type: String, required: false},

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

schema.index({orgName: 'text', orgCode: 'text', city: 'text', area: 'text', zip: 'text', state: 'text'});
schema.index({pOrg: 1, orgName: 1}, {unique: true});
schema.index({pOrg: 1, orgCode: 1}, {unique: true});
schema.index({delFlag: -1, pOrg: 1});
schema.index({delFlag: -1, pOrg: 1, orgStatus: 1});
schema.index({cDtStr: -1, uDtStr: -1});

module.exports = mongoose.model(config.collB2BEntities, schema);
// --- End: B2B Entities Schema --- //
