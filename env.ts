import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

const isDev =
  "process" in globalThis ?
    process.env.NODE_ENV === "development" :
    import.meta.env.DEV

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_APP_NAME: z.string(),
    VITE_API_URL: z.string().url(),
    VITE_ENABLE_DEVTOOLS: z.boolean().default(false),
    VITE_EDITOR: z.string().default("vscode"),
  },
  emptyStringAsUndefined: true,
  runtimeEnv:
    "process" in globalThis ?
      process.env :
        {
          ...import.meta.env,
          VITE_ENABLE_DEVTOOLS:
          import.meta.env.VITE_ENABLE_DEVTOOLS === "true" ? true : false,
        },
  skipValidation: !isDev,
})
