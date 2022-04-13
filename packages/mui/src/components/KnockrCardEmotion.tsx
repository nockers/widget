import { WidgetGrade } from "@knockr/client"
import {
  Collapse,
  Fade,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { captureException } from "@sentry/minimal"
import React, { useContext, useEffect, useState, VFC } from "react"
import { TransitionGroup } from "react-transition-group"
import { WidgetContext } from "../contexts"
import { useClient } from "../hooks"
import { toEmotionColor } from "../utils"
import { KnockrIconEmotion } from "./KnockrIconEmotion"

type Props = {
  message?: string
  endMessage?: string
  onSubmit?(): void
}

export const KnockrCardEmotion: VFC<Props> = (props) => {
  const widget = useContext(WidgetContext)

  const client = useClient()

  const [isOpenMessage, openMessage] = useState(false)

  const [formText, setFormText] = useState("")

  const [emotions, setEmotions] = useState<WidgetGrade[]>([0, 1, 2, 3, 4])

  const [selectedEmotion = null] = emotions.length === 1 ? emotions : []

  useEffect(() => {
    if (emotions.length !== 1) return
    const id = setTimeout(() => {
      openMessage(true)
    }, 400)
    return () => {
      clearTimeout(id)
    }
  }, [emotions])

  const onSubmit = async () => {
    try {
      const [emotion] = emotions
      await client.emotions().create({
        path: "xxxx",
        grade: emotion,
        ticketId: null,
      })
      setFormText("")
    } catch (error) {
      captureException(error)
    }
  }

  const onClick = (emotion: WidgetGrade) => {
    setEmotions([emotion])

    if (typeof props.onSubmit !== "undefined") {
      props.onSubmit()
    }

    onSubmit()
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography fontSize={14} color={"text.secondary"}>
          {props.message ?? "このページはお役に立ちましたか？"}
        </Typography>
        <Stack direction={"row"} alignItems={"center"}>
          <TransitionGroup>
            {emotions.map((emotion) => (
              <Collapse
                key={emotion}
                orientation={"horizontal"}
                sx={{
                  display: "inline-block",
                  verticalAlign: "top",
                  mr: 1,
                  height: "2.5rem",
                  overflow: "hidden",
                }}
              >
                <IconButton
                  color={
                    isOpenMessage ? toEmotionColor(selectedEmotion) : "default"
                  }
                  onClick={() => {
                    onClick(emotion)
                  }}
                >
                  <KnockrIconEmotion emotion={emotion} />
                </IconButton>
              </Collapse>
            ))}
          </TransitionGroup>
          {isOpenMessage && (
            <Fade in={isOpenMessage}>
              <Typography>
                {props.endMessage ?? "ありがとうございました！"}
              </Typography>
            </Fade>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}
