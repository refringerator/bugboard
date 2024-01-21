import type { Meta, StoryObj } from '@storybook/react';

import MainMenu from './MainMenu';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: MainMenu,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof MainMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const menuElements = [
  { id: '1', title: 'Сообщить о баге' },
  { id: '2', title: 'Что-то еще' },
  { id: '3', title: 'Выход' },
];

export const Primary: Story = {
  args: { menuElements },
};
