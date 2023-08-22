import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard', async function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Successfully fetch total leaderboard', async function () {

    const httpResponse = await chai.request(app).get('/leaderboard').send();

    expect(httpResponse.status).to.be.deep.equal(200);
  });
});

describe('GET /leaderboard/home', async function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Successfully fetch home leaderboard', async function () {

    const httpResponse = await chai.request(app).get('/leaderboard/home').send();

    expect(httpResponse.status).to.be.deep.equal(200);
  });
});

describe('GET /leaderboard/away', async function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Successfully fetch away leaderboard', async function () {

    const httpResponse = await chai.request(app).get('/leaderboard/away').send();

    expect(httpResponse.status).to.be.deep.equal(200);
  });
});
