import ArrowLongRight from "./arrow-long-right";

import type { Meta, StoryObj } from "@storybook/react";
import type { ArrowLongRightProps } from "./arrow-long-right";

const meta: Meta<ArrowLongRightProps> = {
  title: "shared/ui/icons/arrow-long-right",
  component: ArrowLongRight,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    size: {
      control: { type: "range", min: 12, max: 96, step: 4 },
    },
    strokeWidth: {
      control: { type: "range", min: 0.5, max: 4, step: 0.5 },
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
    strokeWidth: 1.5,
    color: "currentColor",
    className: "",
  },
};

export const Large: Story = {
  args: {
    size: 48,
  },
};

export const Small: Story = {
  args: {
    size: 16,
  },
};

export const CustomColor: Story = {
  args: {
    color: "#007bff",
    size: 32,
  },
};

export const ThickStroke: Story = {
  args: {
    strokeWidth: 3,
    size: 32,
  },
};

export const ThinStroke: Story = {
  args: {
    strokeWidth: 0.5,
    size: 32,
  },
};
