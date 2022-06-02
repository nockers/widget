import { Story } from "@storybook/react"
import "tailwindcss/tailwind.css"
import { NockerProvider } from "../lib/components/NockerProvider"
import { createConfig } from "../lib/utils"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    "storybook/docs/panel": {
      hidden: true,
    },
  },
  layout: "centered",
}

const withProvider = (Story: Story) => {
  const baseURL =
    process.env.STORYBOOK_LOCALHOST === "true"
      ? "http://localhost:3000/api"
      : "https://nocker.app/api"

  const config = createConfig({
    projectId: "xxxxxxxxxxxxxxxxxxxxx",
    environment: "DEVELOPMENT",
    baseURL,
  })

  return (
    <NockerProvider config={config}>
      <div className={"w-72"}>
        <Story />
      </div>
    </NockerProvider>
  )
}

export const decorators = [withProvider]