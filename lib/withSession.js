import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "./iron-config";

export function withSessionRoute(handler) {
    return withIronSessionApiRoute(handler, ironOptions);
}

export function withSessionSsr(handler) {
    return withIronSessionSsr(handler, ironOptions);
}

export const server = process.env.NODE_ENV == "development" ? 'http://localhost:3000' : 'http://localhost:3000';