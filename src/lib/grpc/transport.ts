import {
  CallbackClient,
  createCallbackClient,
  createGrpcWebTransport,
  createPromiseClient,
  PromiseClient
} from "@bufbuild/connect-web";
import { authInterceptor } from "~/lib/interceptors/authInterceptor.connect-web";
import { useMemo } from "react";
import { ServiceType } from "@bufbuild/protobuf";

export const grpcWebTransport = createGrpcWebTransport({
  baseUrl: import.meta.env.VITE_API_SERVER_URL ?? window.location.origin,
  interceptors: [authInterceptor]
})

export function useGrpcWebCallbackClient<T extends ServiceType>(service: T): CallbackClient<T> {
  return useMemo(() => createCallbackClient(service, grpcWebTransport), [service]);
}

export function useGrpcWebPromiseClient<T extends ServiceType>(service: T): PromiseClient<T> {
  return useMemo(() => createPromiseClient(service, grpcWebTransport), [service]);
}