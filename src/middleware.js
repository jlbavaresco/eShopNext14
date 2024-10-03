export { default } from "next-auth/middleware";

export const config = { matcher: ["/privado/", "/privado/:path*"] };