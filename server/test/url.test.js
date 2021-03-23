const crypto = require('crypto');
const axios = require('axios');
const urlsService = require('../services/urlService');
const shortId = require('shortid');

const generateUrl = function () {
    gen = 'http://www.' + crypto.randomBytes(8).toString('hex') + '.com';
    console.log(gen);
    return gen;
};

test.only('Should post url', async function () {

    // given

    const url1 = await urlsService.saveUrl({ full: 'http://www.min.com.br', short: '1F2F3F', clicks: 1 });
    //const url2 = await urlsService.saveUrl(generateUrl(), shortId.generate(), 2);
    //const url3 = await urlsService.saveUrl(generateUrl(), shortId.generate(), 4);
    // when
    const response = await axios({
        url: 'http://localhost:3000/api/url',
        method: 'get'
    });
    const urls = response.data;
    // then
    expect(urls).toHaveLength(9);

});