import { Home } from "./home";

import type { Meta, StoryObj } from "@storybook/react";
import type { HomeProps } from "./home";

const meta: Meta<HomeProps> = {
  title: "shared/ui/icons/home",
  component: Home,
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
