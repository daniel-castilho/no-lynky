const axios = require('axios');

test('Should get urls', async () => {
    const response = await axios({
        url: 'http://localhost:3000/',
        method: 'get'
    });
    const urls = response.data;
    expect(urls).toHaveLength(7);
    const [firstUrl] = urls;
    expect(firstUrl._id).toBe('605773563708a800041d7b2b');
    expect(firstUrl.full).toBe('https://dev.to/mahnuh/how-to-secure-your-openapi-specification-and-swagger-ui-in-a-nestjs-application-4l04');
    expect(firstUrl.short).toBe('-UZ8ds1Hx');
});