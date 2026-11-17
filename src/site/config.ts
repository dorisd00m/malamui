/** Single source of truth for where Malam UI is hosted (public GitHub repo). */
export const REPO_URL = "https://github.com/dorisd00m/malamui"
export const REGISTRY_URL = "https://raw.githubusercontent.com/dorisd00m/malamui/main/public/r/{name}.json"
export const INSTALL_CMD = "npx shadcn@latest add @malam/malam-ui -y -o"

export const COMPONENTS_JSON_SNIPPET = `{
  "registries": {
    "@malam": "${REGISTRY_URL}"
  }
}`
