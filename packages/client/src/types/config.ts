import { Store } from "../store"
import { WidgetEnvironment } from "./widgetEnvironment"

export type Config = {
  projectId: string
  environment?: WidgetEnvironment | null
  baseURL?: string | null
  store?: Store
}
