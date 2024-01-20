import type { Meta, StoryObj } from '@storybook/react';
import MainHeader from './MainHeader';

const meta = {
  component: MainHeader,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof MainHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'BugBoard',
    icon: 'vite.svg',
  },
};

export const NoIcon: Story = {
  args: {
    title: 'BugBoard',
  },
};
