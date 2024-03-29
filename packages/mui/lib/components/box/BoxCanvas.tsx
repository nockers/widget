import { Box, Stack, Typography } from "@mui/material"
import { captureException } from "@sentry/hub"
import React, { FC, useRef, useState } from "react"

type Props = {
  width: number
  height: number
}

export const BoxCanvas: FC<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isDrawing, setDrawing] = useState(false)

  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })

  const [isFirst, setFirst] = useState(true)

  const onDraw = (x: number, y: number) => {
    try {
      if (!isDrawing) return

      if (isFirst) {
        setFirst(false)
      }

      if (canvasRef.current === null) return

      const context = canvasRef.current.getContext("2d")

      if (context === null) return

      context.lineCap = "round"

      context.lineJoin = "round"

      context.lineWidth = 2

      context.strokeStyle = "mediumturquoise"

      if (lastPosition.x === 0 || lastPosition.y === 0) {
        context.moveTo(x, y)
      } else {
        context.moveTo(lastPosition.x, lastPosition.y)
      }

      context.lineTo(x, y)

      context.stroke()

      setLastPosition({ x: x, y: y })
    } catch (error) {
      captureException(error)
    }
  }

  const onDrawEnd = () => {
    try {
      if (canvasRef.current === null) return
      const context = canvasRef.current.getContext("2d")
      if (context === null) return
      context.closePath()
      setDrawing(false)
      setLastPosition({ x: 0, y: 0 })
    } catch (error) {
      captureException(error)
    }
  }

  const onDrawStart = () => {
    try {
      if (canvasRef.current === null) return
      const context = canvasRef.current.getContext("2d")
      if (context === null) return
      context.closePath()
      setDrawing(true)
    } catch (error) {
      captureException(error)
    }
  }

  return (
    <Box>
      {isFirst && (
        <Stack
          width={"100%"}
          height={"100%"}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            {"クリックして絵を描く"}
          </Typography>
        </Stack>
      )}
      <canvas
        ref={canvasRef}
        width={props.width}
        height={props.height}
        onMouseDown={onDrawStart}
        onMouseOut={onDrawEnd}
        onMouseUp={onDrawEnd}
        onMouseMove={(event) => {
          onDraw(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      />
    </Box>
  )
}
