import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite'
import { FakeButton, FakeButtonGroup } from 'fake-ui'
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

export const Autofocus: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    content: 'Button',
    autofocus: true,
  },
  render: args => ({
    components: { FakeButton },
    setup() {
      return { args }
    },
    template: container(
      `
      <p>请点击浏览器的刷新页面来获取按钮聚焦</p>
      <fake-button data-testid="story-test-btn" v-bind="args">{{args.content}}</fake-button>
      `,
    ),
  }),
  play: async ({ args }) => {
    await userEvent.keyboard('{enter}')

    expect(args.onClick).toHaveBeenCalledOnce()
    clearAllMocks()
  },
}

export const Circle: Story = {
  args: {
    icon: 'search',
  },
  render: args => ({
    components: { FakeButton },
    setup() {
      return { args }
    },
    template: container(`
      <fake-button circle v-bind="args"/>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click button', async () => {
      await userEvent.click(canvas.getByRole('button'))
    })

    expect(args.onClick).toHaveBeenCalled()
  },
}

export const Group: Story & { args: { content1: string, content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', ''],
    },
    groupSize: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', ''],
    },
    groupDisabled: {
      control: 'boolean',
    },
    content1: {
      control: { type: 'text' },
      defaultValue: 'Button1',
    },
    content2: {
      control: { type: 'text' },
      defaultValue: 'Button2',
    },
  },
  args: {
    round: true,
    content1: 'Button1',
    content2: 'Button2',
  },
  render: args => ({
    components: { FakeButton, FakeButtonGroup },
    setup() {
      return { args }
    },
    template: container(`
       <fake-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <fake-button v-bind="args">{{args.content1}}</fake-button>
         <fake-button v-bind="args">{{args.content2}}</fake-button>
       </fake-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click btn1', async () => {
      await userEvent.click(canvas.getByText('Button1'))
    })
    await step('click btn2', async () => {
      await userEvent.click(canvas.getByText('Button2'))
    })
    expect(args.onClick).toHaveBeenCalled()
  },
}
export default meta
