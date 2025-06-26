// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react'
import { WelcomeMat, useWelcomeMat } from '../components/welcome-mat'
import { useEffect } from 'react'

const meta: Meta<typeof WelcomeMat> = {
  title: 'UI/WelcomeMat',
  component: WelcomeMat,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1A1A1A' },
        { name: 'light', value: '#F8F8F8' },
      ],
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof WelcomeMat>

export const Default: Story = {
  render: () => {
    const { isVisible, dismissWelcomeMat } = useWelcomeMat()
    useEffect(() => {
      // ensure welcome mat shows in Storybook each time
      localStorage.removeItem('welcomeMatDismissed')
    }, [])
    return (
      <WelcomeMat isVisible={isVisible} onDismiss={dismissWelcomeMat} />
    )
  },
}
