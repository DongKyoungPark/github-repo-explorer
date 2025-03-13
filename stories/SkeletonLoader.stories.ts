import type { Meta, StoryObj } from '@storybook/react';
import SkeletonLoader from '../app/components/SkeletonLoader';

const meta = {
  title: 'Components/SkeletonLoader',
  component: SkeletonLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkeletonLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    count: 1,
  },
};

export const Multiple: Story = {
  args: {
    count: 3,
  },
};
