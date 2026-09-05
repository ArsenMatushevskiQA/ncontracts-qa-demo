const { test, expect } = require('@playwright/test');
const { BASE_URL } = require('../../mocks/api-config');

test.use({ baseURL: BASE_URL });

test('create and retrieve a compliance check', async ({ request }) => {
  const createResponse = await request.post('/api/compliance-checks', {
    data: {
      customerId: 'demo-customer-001',
      checkType: 'rate-review',
    },
  });

  expect(createResponse.status()).toBe(201);
  const createBody = await createResponse.json();
  expect(createBody.id).toBeTruthy();
  expect(createBody.customerId).toBe('demo-customer-001');
  expect(createBody.checkType).toBe('rate-review');
  expect(createBody.status).toBe('pending');

  const getResponse = await request.get(`/api/compliance-checks/${createBody.id}`);
  expect(getResponse.status()).toBe(200);
  const getBody = await getResponse.json();
  expect(getBody.id).toBe(createBody.id);
  expect(getBody.status).toBe('completed');
  expect(getBody.result).toBe('compliant');
});

test('return 404 for unknown compliance check', async ({ request }) => {
  const response = await request.get('/api/compliance-checks/00000000-0000-0000-0000-000000000000');
  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body).toHaveProperty('error');
});
