import { Trophy } from "./trophy";

import type { Meta, StoryObj } from "@storybook/react";
import type { TrophyProps } from "./trophy";

const meta: Meta<TrophyProps> = {
  title: "shared/ui/icons/trophy",
  component: Trophy,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: { type: "range", min: 12, max: 96, step: 4 },
    },
    color: {
      control: { type: "color" },
    },
    strokeWidth: {
      control: {
        type: "range",
        min: 1,
        max: 5,
        step: 0.5,
      },
    },
    className: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 24,
    color: "currentColor",
    className: "",
  },
};
