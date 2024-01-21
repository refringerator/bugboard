import type { Meta, StoryObj } from '@storybook/react';
import WindowsControlPanel from './WindowsControlPanel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: WindowsControlPanel,
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
} satisfies Meta<typeof WindowsControlPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const controlPanelElements = [
  { id: '1', title: 'Окно 1', icon: 'vite.svg' },
  { id: '2', title: 'Окно 2' },
  { id: '3', title: 'Окно 3', icon: 'bug.svg' },
];

export const Primary: Story = {
  args: { controlPanelElements },
};
