/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ST_API_SERVER_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}