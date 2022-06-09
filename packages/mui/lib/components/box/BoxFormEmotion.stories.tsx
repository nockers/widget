import { widgetConfigDefault } from "@nocker/client"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { BoxFormEmotion } from "./BoxFormEmotion"

export default {
  title: "internals/BoxFormEmotion",
  component: BoxFormEmotion,
} as ComponentMeta<typeof BoxFormEmotion>

export const Default: ComponentStoryObj<typeof BoxFormEmotion> = {
  name: "BoxFormEmotion",
  args: {
    grade: 2,
    config: {
      gradeFiveMessage: widgetConfigDefault.emotionFiveGradeFiveMessage,
      gradeFourMessage: widgetConfigDefault.emotionFiveGradeFourMessage,
      gradeThreeMessage: widgetConfigDefault.emotionFiveGradeThreeMessage,
      gradeTwoMessage: widgetConfigDefault.emotionFiveGradeTwoMessage,
      gradeOneMessage: widgetConfigDefault.emotionFiveGradeOneMessage,
    },
  },
}
