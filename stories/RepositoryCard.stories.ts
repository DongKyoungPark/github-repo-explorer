import type { Meta, StoryObj } from '@storybook/react';
import RepositoryCard from '../app/components/RepositoryCard';

const meta = {
  title: 'Components/RepositoryCard',
  component: RepositoryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RepositoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    repository: {
      id: 1,
      name: 'example-repo',
      description:
        'This is an example repository description that shows how the card looks with a longer text.',
      stargazers_count: 42,
      updated_at: '2023-03-15T12:00:00Z',
      language: 'TypeScript',
      html_url: 'https://github.com/username/example-repo',
    },
    username: 'username',
  },
};

export const NoDescription: Story = {
  args: {
    repository: {
      id: 2,
      name: 'no-description-repo',
      description: null,
      stargazers_count: 10,
      updated_at: '2023-02-20T10:30:00Z',
      language: 'JavaScript',
      html_url: 'https://github.com/username/no-description-repo',
    },
    username: 'username',
  },
};

export const ManyStars: Story = {
  args: {
    repository: {
      id: 3,
      name: 'popular-repo',
      description: 'A very popular repository with many stars',
      stargazers_count: 15420,
      updated_at: '2023-03-01T15:45:00Z',
      language: 'Python',
      html_url: 'https://github.com/username/popular-repo',
    },
    username: 'username',
  },
};

export const NoLanguage: Story = {
  args: {
    repository: {
      id: 4,
      name: 'no-language-repo',
      description: 'This repository has no language specified',
      stargazers_count: 5,
      updated_at: '2023-01-10T09:15:00Z',
      language: null,
      html_url: 'https://github.com/username/no-language-repo',
    },
    username: 'username',
  },
};
