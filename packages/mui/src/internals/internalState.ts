import { Theme } from "@mui/material"
import {
  WidgetConfig,
  widgetConfigDefault,
  WidgetCustomer,
  WidgetEnvironment,
} from "@nocker/client"
import { createDefaultTheme } from "../utils"

export class InternalState {
  static isLoggingIn = false

  static projectId: string | null = null

  static environment: WidgetEnvironment = "PRODUCTION"

  static baseURL = "https://nocker.app/api"

  static theme = createDefaultTheme("light")

  static customer: WidgetCustomer | null = null

  static widgetConfig: WidgetConfig = widgetConfigDefault

  static effects: Function[] = []

  get isLoggingIn() {
    return InternalState.isLoggingIn
  }

  get isLoggedIn() {
    return InternalState.customer !== null
  }

  listenLoginState(method: Function) {
    if (InternalState.isLoggingIn) {
      InternalState.effects.push(method)
    }
    return null
  }

  updateLoginState(isLoggingIn: boolean) {
    InternalState.isLoggingIn = isLoggingIn
    if (isLoggingIn) return null
    for (const fns of InternalState.effects) {
      fns()
    }
    InternalState.effects = []
    return null
  }

  getConfig() {
    return {
      isLoggingIn: InternalState.isLoggingIn,
      projectId: InternalState.projectId,
      environment: InternalState.environment,
      baseURL: InternalState.baseURL,
      widgetConfig: InternalState.widgetConfig,
      customer: InternalState.customer,
      helps: [],
    }
  }

  setTheme(theme: Theme) {
    InternalState.theme = theme
    return null
  }

  getTheme() {
    return InternalState.theme
  }

  setProjectId(projectId: string) {
    InternalState.projectId = projectId
    return null
  }

  setEnvironment(environment?: WidgetEnvironment | null) {
    InternalState.environment = environment ?? "PRODUCTION"
    return null
  }

  setBaseURL(baseURL?: string | null) {
    InternalState.baseURL = baseURL ?? "https://nocker.app/api"
    return null
  }

  setCustomer(widgetCustomer: WidgetCustomer) {
    InternalState.customer = widgetCustomer
    return null
  }

  setWidgetConfig(widgetConfig: WidgetConfig) {
    InternalState.widgetConfig = widgetConfig
    return null
  }
}
