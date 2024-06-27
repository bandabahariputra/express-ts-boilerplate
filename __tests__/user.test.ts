import supertest from 'supertest';

import { app } from '../src/application/app';
import { logger } from '../src/application/logger';
import { TestUtil } from './test.util';

describe('GET /api/users/current', () => {
  let token: string | null = null;

  beforeEach(async () => {
    const user = await TestUtil.createUser();
    token = user.token;
  });

  afterEach(async () => {
    await TestUtil.deleteUser();
    token = null;
  });

  it('should return current user', async () => {
    const response = await supertest(app)
      .get('/api/users/current')
      .set({
        authorization: `Bearer ${token}`,
      });

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('Banda Bahari Putra');
    expect(response.body.data.email).toBe('banda@gmail.com');
  });

  it('should throw not found error if authorization not provided', async () => {
    const response = await supertest(app).get('/api/users/current');

    logger.info(response.body);

    expect(response.status).toBe(401);
    expect(response.body.status).toBe(401);
    expect(response.body.errors).toBe('Unauthorized');
  });
});

describe('PATCH /api/users/update', () => {
  let token: string | null = null;

  beforeEach(async () => {
    const user = await TestUtil.createUser();
    token = user.token;
  });

  afterEach(async () => {
    await TestUtil.deleteUser();
    token = null;
  });

  it('should return updated user', async () => {
    const response = await supertest(app)
      .patch('/api/users/update')
      .send({
        name: 'Banda',
      })
      .set({
        authorization: `Bearer ${token}`,
      });

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('Banda');
    expect(response.body.data.email).toBe('banda@gmail.com');
  });
});

describe('POST /api/users/change-password', () => {
  let token: string | null = null;

  beforeEach(async () => {
    const user = await TestUtil.createUser();
    token = user.token;
  });

  afterEach(async () => {
    await TestUtil.deleteUser();
    token = null;
  });

  it('should return success message if provide correct old password', async () => {
    const response = await supertest(app)
      .post('/api/users/change-password')
      .send({
        oldPassword: 'banda123',
        newPassword: 'newPassword123',
      })
      .set({
        authorization: `Bearer ${token}`,
      });

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.message).toBeDefined();
  });

  it('should throw error if provide wrong old password', async () => {
    const response = await supertest(app)
      .post('/api/users/change-password')
      .send({
        oldPassword: 'wrongPassword',
        newPassword: 'newPassword123',
      })
      .set({
        authorization: `Bearer ${token}`,
      });

    logger.info(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
