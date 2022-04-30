import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import { KnockrEmotion } from "../components"

const meta: ComponentMeta<typeof KnockrEmotion> = {
  title: "KnockrEmotion",
  component: KnockrEmotion,
  argTypes: {
    pagePath: { table: { disable: true } },
    pageTitle: { table: { disable: true } },
    textQuestion: { control: "text" },
    textThanks: { control: "text" },
    hasBorder: { control: "boolean" },
  },
}

export default meta

export const Story: ComponentStory<typeof KnockrEmotion> = (args) => {
  return <KnockrEmotion {...args} />
}

Story.storyName = "KnockrEmotion"

Story.args = {
  textQuestion: "どのような気分ですか？",
  textThanks: "回答ありがとうございます",
  hasBorder: true,
}
