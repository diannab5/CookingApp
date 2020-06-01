import identifyImage from '../helpers/clarifai_helper';

test("identifyImage returns an array of tags",() => {
  jest.fn(async () => {
    const test = await identifyImage('jfiejfi39432jid');
    test.mockResolvedValue({
      outputs: [{
          data : {
            concepts: [
              {
                id: '1',
                name:'bread',
                value: 0.9,
                app_id: 'main'
              },
              {
                id: '2',
                name:'coffe',
                value: 0.,
                app_id: 'main'
              }
            ]
          }
    }]})
    expect(Array.isArray(test)).toBe(true)
  });
});


