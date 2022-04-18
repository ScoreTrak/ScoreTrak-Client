import { createContext, useContext, useState } from "react";

export const ServerHostnameContext = createContext(
  import.meta.env.ST_SERVER_HOSTNAME
);

export const useServerHostname = () => {
  return useContext(ServerHostnameContext);
};

// @ts-ignore
export const ServerHostnameProvider = ({ children }) => {
  const [serverHostname, setServerHostname] = useState(
    import.meta.env.ST_SERVER_HOSTNAME
  );

  return (
    <>
      <ServerHostnameContext.Provider value={serverHostname}>
        {children}
      </ServerHostnameContext.Provider>
    </>
  );
};
