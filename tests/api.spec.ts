import { test, expect } from '@playwright/test';
 
test.use({ignoreHTTPSErrors: true});
 
test('GET - Get a single post', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.userId).toBe(1);
  expect(body.title).toBeTruthy();
  console.log('GET response:', body);
});
 
test('GET - Query parameters', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts',{
      params: {
        userId: 1
      }
    }
  );
  expect(response.status()).toBe(200);
  const posts = await response.json();
  expect(Array.isArray(posts)).toBeTruthy();
  for (const post of posts) {
    expect(post.userId).toBe(1);
  }
});
 
test('POST - Create a new post', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts',{
      data: {
        title: 'Playwright API Test',
        body: 'This post was created using Playwright',
        userId: 1
      }
    }
  );
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.title).toBe('Playwright API Test');
  expect(body.body).toBe('This post was created using Playwright');
  expect(body.userId).toBe(1);
  console.log('Created post:', body);
});
 
test('PUT - Update complete resource', async ({ request }) => {
  const response = await request.put('https://jsonplaceholder.typicode.com/posts/1',{
      data: {
        id: 1,
        title: 'Updated title',
        body: 'Updated body',
        userId: 1
      }
    }
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.title).toBe('Updated title');
  expect(body.body).toBe('Updated body');
});
 
test('PATCH - Update partial resource', async ({ request }) => {
  const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1',{
      data: {
        title: 'Partially Updated Title'
      }
    }
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.title).toBe('Partially Updated Title');
});
 
test('DELETE - Delete a post', async ({ request }) => {
  const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.status()).toBe(200);
});
 
test('GET - Send custom headers', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1',{
      headers: {
        'x-test-header': 'Playwright'
      }
    }
  );
  expect(response.ok()).toBeTruthy();
  console.log('Response headers:',response.headers());
});
 
test('Validate API response headers', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  const headers = response.headers();
  expect(headers['content-type']).toContain('application/json');
});
 
test('GET - Non-existing resource', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/99999');
  expect(response.status()).toBe(404);
});
