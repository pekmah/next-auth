/**
 * Array of publicly accessible routes
 * No authentication is required to access these routes
 */
export const publicRoutes = [
    "/"
]


/**
 * Array of routes used for authentication
 * These routes will redirect logged in users to /.. page
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
]


/**
 * Array of routes used for api authentication routes.
 * Routes starting with this are used for api authentication
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Default redirect path after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"
