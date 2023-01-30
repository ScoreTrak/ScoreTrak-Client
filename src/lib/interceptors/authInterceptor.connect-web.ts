import { Interceptor } from "@bufbuild/connect-web";
import { token } from "~/lib/token/token";

export const authInterceptor: Interceptor = (next) => async (req) => {
  if (token.isAValidToken()) {
    req.header.set("authorization", token.getToken())
  }
  return await next(req);
}