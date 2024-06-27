import supertest from 'supertest';

import { app } from '../src/application/app';
import { logger } from '../src/application/logger';
import { TestUtil } from './test.util';

describe('POST /api/auth/register', () => {
  afterEach(async () => {
    await TestUtil.deleteUser();
  });

  it('should throw an error if request is invalid', async () => {
    const response = await supertest(app).post('/api/auth/register').send({
      nname: '',
      email: '',
      password: '',
    });

    logger.info(response.body);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should register a user', async () => {
    const response = await supertest(app).post('/api/auth/register').send({
      name: 'Banda Bahari Putra',
      email: 'banda@gmail.com',
      password: 'banda123',
    });

    logger.info(response.body);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(201);
    expect(response.body.data.name).toBe('Banda Bahari Putra');
    expect(response.body.data.email).toBe('banda@gmail.com');
    expect(response.body.data.token).toBeDefined();
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await TestUtil.createUser();
  });

  afterEach(async () => {
    await TestUtil.deleteUser();
  });

  it('should throw an error if request is invalid', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      email: '',
      password: '',
    });

    logger.info(response.body);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should login success and return user + token', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      email: 'banda@gmail.com',
      password: 'banda123',
    });

    logger.info(response.body);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(200);
    expect(response.body.data.name).toBe('Banda Bahari Putra');
    expect(response.body.data.email).toBe('banda@gmail.com');
    expect(response.body.data.token).toBeDefined();
  });
});
