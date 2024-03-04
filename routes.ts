/**
 * An array of routes that are accessible to public withou authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/'];

/**
 * An array of routes that are used for authentication
 * these routes with redirect users to /store
 * @type {string[]}
 */
export const authRoutes: string[] = ['/auth/login', '/auth/register'];

/**
 * The prefix for api authentication routes
 * routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/store';
