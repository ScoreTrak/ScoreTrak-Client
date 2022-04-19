import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

// vite.config.js
export default defineConfig(({ command, mode }) => {
  const envPrefix = "ST_";
  const env = loadEnv(mode, process.cwd(), envPrefix);
  return {
    plugins: [react(), envCompatible()],
    envPrefix,
    server: {
      proxy: {
        "^scoretrak..*": env["ST_SERVER_HOSTNAME"],
      },
    },
    optimizeDeps: {
      // TODO: find a plugin to automatically generate the following strings.
      include: [
        "@scoretrak/scoretrakapis/scoretrak/auth/v1/auth_pb",
        "@scoretrak/scoretrakapis/scoretrak/check/v1/check_pb",
        "@scoretrak/scoretrakapis/scoretrak/competition/v1/competition_pb",
        "@scoretrak/scoretrakapis/scoretrak/config/v1/config_pb",
        "@scoretrak/scoretrakapis/scoretrak/host/v1/host_pb",
        "@scoretrak/scoretrakapis/scoretrak/host_group/v1/host_group_pb",
        "@scoretrak/scoretrakapis/scoretrak/policy/v1/policy_pb",
        "@scoretrak/scoretrakapis/scoretrak/property/v1/property_pb",
        "@scoretrak/scoretrakapis/scoretrak/proto/v1/uuid_pb",
        "@scoretrak/scoretrakapis/scoretrak/report/v1/report_pb",
        "@scoretrak/scoretrakapis/scoretrak/round/v1/round_pb",
        "@scoretrak/scoretrakapis/scoretrak/service/v1/service_pb",
        "@scoretrak/scoretrakapis/scoretrak/service_group/v1/service_group_pb",
        "@scoretrak/scoretrakapis/scoretrak/team/v1/team_pb",
        "@scoretrak/scoretrakapis/scoretrak/user/v1/user_pb",
        "@scoretrak/scoretrakapis/scoretrak/auth/v1/AuthServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/check/v1/CheckServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/competition/v1/CompetitionServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/config/v1/ConfigServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/host/v1/HostServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/host_group/v1/Host_groupServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/policy/v1/PolicyServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/property/v1/PropertyServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/report/v1/ReportServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/round/v1/RoundServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/service/v1/ServiceServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/service_group/v1/Service_groupServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/team/v1/TeamServiceClientPb",
        "@scoretrak/scoretrakapis/scoretrak/user/v1/UserServiceClientPb",
      ],
    },
    build: {
      commonjsOptions: {
        include: [/scoretrak-scoretrakapis/, /node_modules/],
      },
    },
  };
});
