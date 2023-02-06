export const ironOptions = {
    cookieName: "unfHoursTrackingSessionCookie",
    password: process.env.SESSION_COOKIE_PASSWORD,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true: false,
  },
}