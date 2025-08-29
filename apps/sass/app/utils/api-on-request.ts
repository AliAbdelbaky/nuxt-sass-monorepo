import type { IOnRequest } from '@pkgs/core-plugins';
const onRequest: IOnRequest = (ctx) => {
  console.log('onRequest', ctx);
  ctx.headers['X-App-Version'] = '1.0.0';

  // Example: add Authorization header from localStorage
  const token = localStorage.getItem('auth_token');
  if (token) ctx.headers['Authorization'] = `Bearer ${token}`;

  // Add query param
  ctx.queries['ts'] = Date.now();

  return ctx;
};
export default onRequest;
