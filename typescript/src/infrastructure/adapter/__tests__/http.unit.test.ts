import nock from 'nock';
import httpStatus from 'http-status-codes';
import * as R from 'ramda';

import { HttpAdapter } from '../http';

describe('http adapter', () => {
  it('constructs and have all properties', () => {
    const t = new HttpAdapter({});

    expect(t).toBeDefined();
    expect(t.config).toEqual({});
    expect(t.send).toBeInstanceOf(Function);
  });

  it('sends a request for the configured url', async () => {
    const config = {
      baseURL: 'http://example.com',
    };
    const t = new HttpAdapter(config);

    const expectedResponse = { received: true };

    nock(config.baseURL)
      .get('/')
      .reply(httpStatus.OK, expectedResponse);

    const res = await t.send({
      method: 'get',
    }).then(R.prop('data'));

    expect(res).toEqual(expectedResponse);
  });
});
