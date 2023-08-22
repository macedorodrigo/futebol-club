import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import loginMock from './mocks/login.Mock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', async function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Successfully fetch all matches', async function () {
    // Act
    const httpResponse = await chai.request(app).get('/matches').send();
    // Assert
    expect(httpResponse.status).to.be.deep.equal(200);
  });
});

describe('Patch /matches/:id', async function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Successfully update team by id', async function () {
    // Arrange
    const httpRequestBody = loginMock.mockValidBody;
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    // Act
    const httpResponse2 = await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${httpResponse.body.token}`).send({ homeTeamGoals:2, awayTeamGoals:4 });
    // Assert
    expect(httpResponse2.status).to.be.deep.equal(200);
  });
});

describe('Patch /matches/:id/finish', async function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Successfully update match status by id', async function () {
    // Arrange
    const httpRequestBody = loginMock.mockValidBody;
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    // Act
    const httpResponse2 = await chai.request(app).patch('/matches/46/finish').set('Authorization', `Bearer ${httpResponse.body.token}`).send();
    // Assert
    expect(httpResponse2.status).to.be.deep.equal(200);
  });
});

describe('Post /matches', async function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Successfully create match', async function () {
    // Arrange
    const httpRequestBody = loginMock.mockValidBody;
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    // Act
    const httpResponse2 = await chai.request(app).post('/matches').set('Authorization', `Bearer ${httpResponse.body.token}`).send({
      "homeTeamId": 16,
      "awayTeamId": 4,
      "homeTeamGoals": 6,
      "awayTeamGoals": 2,
    });
    // Assert
    expect(httpResponse2.status).to.be.deep.equal(201);
  });
});
