import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('Load all teams successfully', async function () {

      const httpResponse = await chai.request(app).get('/teams').send();

      expect(httpResponse.status).to.be.deep.equal(200);
    });
});

describe('GET /teams/:id ', async function () { 
  beforeEach(function () { sinon.restore(); });
    it('Load time with id successfully', async function () {

      const httpResponse2 = await chai.request(app).get('/teams/1').send();

      expect(httpResponse2.status).to.be.deep.equal(200);
    });
    it('Carregar time com id inesistente', async function () {

      const httpResponse2 = await chai.request(app).get('/teams/234523').send();

      expect(httpResponse2.status).to.be.deep.equal(404);
    });
});