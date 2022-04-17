/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly __APP_VERSION__: string
  readonly ST_SERVER: string
  readonly ST_COMPETITION_NAME: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}