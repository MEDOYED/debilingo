import { DictionaryAdd } from "./dictionary-add";

import type { Meta, StoryObj } from "@storybook/react";
import type { DictionaryAddProps } from "./dictionary-add";

const meta: Meta<DictionaryAddProps> = {
  title: "shared/ui/icons/dictionary-add",
  component: DictionaryAdd,
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
