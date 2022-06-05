import { WidgetConfig, WidgetEmotion, WidgetTicket } from "@nocker/client"
import React, { FC } from "react"
import { DivFormTicket } from "./components/div/DivFormTicket"
import { DivThanks } from "./components/div/DivThanks"
import { TransitionOpacity } from "./components/transition/TransitionOpacity"
import { useWidgetConfig } from "./hooks"
import { useMutationTicket } from "./hooks/useMutationTicket"
import { WidgetEmotionSubmit, WidgetTicketSubmit } from "./types"

type Props = {
  widgetConfig?: WidgetConfig | null
  pagePath?: string | null
  pageTitle?: string | null
  hasHelps?: boolean
  hasBorder?: boolean | null
  isNotEmbedded?: boolean
  onClose?(): void
  onSubmitted?(data: WidgetTicket | WidgetEmotion): void
  onSubmitEmotion?(emotion: WidgetEmotionSubmit): void
  onSubmitTicket?(ticket: WidgetTicketSubmit): void
  onError?(error: Error): void
  onDone?(): void
}

export const NockerCard: FC<Props> = (props) => {
  const widgetConfig = useWidgetConfig(props.widgetConfig)

  const mutation = useMutationTicket({
    pagePath: props.pagePath,
    pageTitle: props.pageTitle,
    onSubmitted: props.onSubmitted,
    onSubmit: props.onSubmitTicket,
    onError: props.onError,
    onDone: props.onDone,
  })

  return (
    <div
      className={
        "relative w-full max-w-sm overflow-hidden rounded-md border border-solid border-slate-500 bg-white dark:bg-gray-800"
      }
    >
      <div className={"p-4"}>
        <DivFormTicket
          config={{
            buttonSubmitText: widgetConfig.ticketButtonSubmitText,
            inputPlaceholder: widgetConfig.ticketInputPlaceholder,
          }}
          text={mutation.formText}
          isLoading={mutation.isLoading}
          onChangeText={mutation.onChangeFormText}
          onSubmit={mutation.onCreateTicket}
        />
      </div>
      <TransitionOpacity in={mutation.isDone}>
        <DivThanks
          message={widgetConfig.ticketThanksMessage}
          buttonText={widgetConfig.ticketButtonResetText}
          onClick={mutation.onResetForm}
        />
      </TransitionOpacity>
    </div>
  )
}
