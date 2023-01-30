import { token } from "~/lib/token/token";

export class AuthInterceptor {
  intercept = (request: any, invoker: any) => {
    if (token.isAValidToken()) {
      const metadata = request.getMetadata(undefined, undefined);
      metadata.authorization = token.getToken();
    }
    return invoker(request);
  };
}