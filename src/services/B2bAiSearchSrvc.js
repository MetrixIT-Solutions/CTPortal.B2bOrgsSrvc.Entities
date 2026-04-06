/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const OpenAI = require('openai');
const sRes = require('../SetRes');

const postB2bAiSearchByType = (reqBody, tData, callback) => {
  const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY,
  });
  const completion = openai.chat.completions.create({
    model: 'gpt-4o-mini',
    store: true,
    messages: [
      {'role': 'user', 'content': reqBody.query},
    ],
  });
  // In a peaceful grove beneath a silver moon, a unicorn named Lumina discovered a hidden pool that reflected the stars. As she dipped her horn into the water, the pool began to shimmer, revealing a pathway to a magical realm of endless night skies. Filled with wonder, Lumina whispered a wish for all who dream to find their own hidden magic, and as she glanced back, her hoofprints sparkled like stardust.
  // console.log(response);
  completion.then((result) => {
    if(result.choices.length && result.choices[0]?.message)
      callback(sRes.successRes({...result.choices[0].message, query: reqBody.query}));
    else callback(sRes.noData({}));
  }).catch(err => callback(sRes.unKnownErr({})));
}

module.exports = {
  postB2bAiSearchByType
};
