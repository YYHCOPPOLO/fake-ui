import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite'
import { FakeButton } from 'fake-ui'
import { expect, fn, userEvent, within } from 'storybook/test'

type Story = StoryObj<typeof FakeButton> & { argTypes: ArgTypes }

const meta: Meta<typeof FakeButton> = {
  title: 'FakeButton',
  component: FakeButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Button component',
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['primary', 'success', 'danger', 'warning', 'info'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['large', 'default', 'small'],
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    loading: {
      control: {
        type: 'boolean',
      },
    },
    useThrottle: {
      control: {
        type: 'boolean',
      },
    },
    throttleDelay: {
      control: {
        type: 'number',
      },
    },
    loadingIcon: {
      control: {
        type: 'text',
      },
    },
    icon: {
      control: {
        type: 'text',
      },
    },
    autoFocus: {
      control: {
        type: 'boolean',
      },
    },
    round: {
      control: {
        type: 'boolean',
      },
    },
    circle: {
      control: {
        type: 'boolean',
      },
    },
    plain: {
      control: {
        type: 'boolean',
      },
    },
    tag: {
      control: {
        type: 'select',
        options: ['button', 'a', 'span', 'div'],
      },
    },
    nativeType: {
      control: {
        type: 'select',
        options: ['button', 'submit', 'reset'],
      },
    },
  },
  args: {
    onClick: fn(),
  },
}

function container(val: string) {
  return `
    <div style="margin:5px">${val}</div>
  `
}

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    type: 'primary',
    content: 'Button',
  },
  render: args => ({
    components: {
      FakeButton,
    },
    setup() {
      return {
        args,
      }
    },
    template: container(`<FakeButton v-bind="args">{{ args.content }}</FakeButton>`),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click btn', async () => {
      await userEvent.click(canvas.getByRole('button'))
    })

    expect(args.onClick).toHaveBeenCalled()
  },
}

export default meta
