import { Box, Collapse, Fade, Paper } from "@mui/material"
import { WidgetConfig, Ticket } from "@nocker/client"
import {
  useMutationTicket,
  useWidgetConfig,
  WidgetTicketSubmit,
} from "@nocker/react"
import React, { FC } from "react"
import { BoxFormTicket } from "./components/box/BoxFormTicket"
import { BoxThanks } from "./components/box/BoxThanks"

type Props = {
  widgetConfig?: Partial<WidgetConfig> | null
  pagePath?: string | null
  pageTitle?: string | null
  onSubmitted?(data: Ticket): void
  onSubmit?(ticket: WidgetTicketSubmit): void
  onError?(error: Error): void
  onDone?(): void
}

export const WidgetTicket: FC<Props> = (props) => {
  const widgetConfig = useWidgetConfig(props.widgetConfig)

  const mutation = useMutationTicket({
    pagePath: props.pagePath,
    pageTitle: props.pageTitle,
    onSubmitted: props.onSubmitted,
    onSubmit: props.onSubmit,
    onError: props.onError,
    onDone: props.onDone,
  })

  const isOpenHelpForm = false

  return (
    <>
      <Paper
        variant={"outlined"}
        sx={{
          overflow: "hidden",
          width: "100%",
          maxWidth: (theme) => theme.spacing(40),
          borderWidth: widgetConfig.hasBorder ? 1 : 0,
        }}
      >
        <Collapse in={!isOpenHelpForm}>
          <Box
            sx={{
              position: "relative",
              pl: 2,
              pr: 2,
              pt: 2,
              pb: 2,
            }}
          >
            <BoxFormTicket
              config={{
                buttonSubmitText: widgetConfig.ticketButtonSubmitText,
                inputPlaceholder: widgetConfig.ticketInputPlaceholder,
              }}
              text={mutation.text}
              isLoading={mutation.isLoading}
              onChangeText={(text) => {
                mutation.updateText(text)
              }}
              onSubmit={() => {
                mutation.createTicket()
              }}
            />
            <Fade in={mutation.isDone}>
              <Box>
                <BoxThanks
                  isMinimal={true}
                  config={{
                    thanksMessage: widgetConfig.ticketThanksMessage,
                    buttonResetText: widgetConfig.ticketButtonResetText,
                  }}
                  onReset={mutation.reset}
                />
              </Box>
            </Fade>
          </Box>
        </Collapse>
      </Paper>
    </>
  )
}
