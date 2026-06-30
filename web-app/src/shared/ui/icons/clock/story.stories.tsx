import type { Meta, StoryObj } from "@storybook/react";
import Clock from "./clock";

/**
 * Clock - іконка годинника для відображення часу та термінів.
 *
 * ## Особливості:
 * - SVG іконка з підтримкою currentColor
 * - Адаптується до кольору батьківського елемента
 * - Використовується для інформації про час виконання замовлень
 *
 * ## Використання:
 * ```tsx
 * <Clock />
 * ```
 */
const meta: Meta<typeof Clock> = {
  title: "src/shared/ui/icons/clock",
  component: Clock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Clock>;

/**
 * Базовий вигляд іконки годинника
 */
export const Default: Story = {
  render: () => (
    <div style={{ width: "24px", height: "24px" }}>
      <Clock />
    </div>
  ),
};

/**
 * Іконка з різними розмірами
 */
export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <div style={{ width: "16px", height: "16px" }}>
        <Clock />
      </div>
      <div style={{ width: "24px", height: "24px" }}>
        <Clock />
      </div>
      <div style={{ width: "32px", height: "32px" }}>
        <Clock />
      </div>
      <div style={{ width: "48px", height: "48px" }}>
        <Clock />
      </div>
    </div>
  ),
};

/**
 * Іконка з різними кольорами
 */
export const DifferentColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <div style={{ width: "32px", height: "32px", color: "#000000" }}>
        <Clock />
      </div>
      <div style={{ width: "32px", height: "32px", color: "#3b82f6" }}>
        <Clock />
      </div>
      <div style={{ width: "32px", height: "32px", color: "#10b981" }}>
        <Clock />
      </div>
      <div style={{ width: "32px", height: "32px", color: "#f59e0b" }}>
        <Clock />
      </div>
      <div style={{ width: "32px", height: "32px", color: "#6b7280" }}>
        <Clock />
      </div>
    </div>
  ),
};
