import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite'
import { FakeCollapse, FakeCollapseItem } from 'fake-ui'
import { expect, fn, userEvent, within } from 'storybook/test'

type Story = StoryObj<typeof FakeCollapse> & { argTypes: ArgTypes }

function container(val: string) {
  return `
    <div style="margin:5px">${val}</div>
  `
}

const meta: Meta<typeof FakeCollapse> = {
  title: 'FakeCollapse',
  component: FakeCollapse,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Collapse 折叠面板组件，用于内容的展开与收起',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: {
        type: 'object',
      },
      description: '当前激活的面板名称数组',
    },
    accordion: {
      control: {
        type: 'boolean',
      },
      description: '是否手风琴模式（每次只能展开一个面板）',
    },
  },
}

export default meta

export const Default: Story = {
  args: {
    modelValue: ['1'],
    accordion: false,
  },
  render: args => ({
    components: { FakeCollapse, FakeCollapseItem },
    setup() {
      return { args }
    },
    template: container(`
      <fake-collapse v-bind="args">
        <fake-collapse-item name="1" title="第一节">
          这是一段内容，可以折叠展开。这是第一节的详细内容。
        </fake-collapse-item>
        <fake-collapse-item name="2" title="第二节">
          这是第二节的详细内容。支持同时展开多个面板。
        </fake-collapse-item>
        <fake-collapse-item name="3" title="第三节">
          这是第三节的详细内容。点击标题可以折叠或展开内容。
        </fake-collapse-item>
      </fake-collapse>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('展开第二节', async () => {
      const section2 = canvas.getByText('第二节')
      await userEvent.click(section2)
    })

    await step('收起第一节', async () => {
      const section1 = canvas.getByText('第一节')
      await userEvent.click(section1)
    })
  },
}

export const Accordion: Story = {
  args: {
    modelValue: ['1'],
    accordion: true,
  },
  render: args => ({
    components: { FakeCollapse, FakeCollapseItem },
    setup() {
      return { args }
    },
    template: container(`
      <fake-collapse v-bind="args">
        <fake-collapse-item name="1" title="手风琴第一节">
          手风琴模式下，每次只能展开一个面板。点击其他面板会自动收起当前面板。
        </fake-collapse-item>
        <fake-collapse-item name="2" title="手风琴第二节">
          这是第二节的详细内容。
        </fake-collapse-item>
        <fake-collapse-item name="3" title="手风琴第三节">
          这是第三节的详细内容。
        </fake-collapse-item>
      </fake-collapse>
    `),
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step('点击第二节，第一节自动收起', async () => {
      const section2 = canvas.getByText('手风琴第二节')
      await userEvent.click(section2)
    })
  },
}

export const Disabled: Story = {
  args: {
    modelValue: ['1'],
  },
  render: args => ({
    components: { FakeCollapse, FakeCollapseItem },
    setup() {
      return { args }
    },
    template: container(`
      <fake-collapse v-bind="args">
        <fake-collapse-item name="1" title="正常面板">
          这是一个正常的面板，可以点击展开收起。
        </fake-collapse-item>
        <fake-collapse-item name="2" title="禁用面板" disabled>
          这是一个禁用的面板，无法点击展开收起。
        </fake-collapse-item>
        <fake-collapse-item name="3" title="另一个正常面板">
          这是另一个正常的面板。
        </fake-collapse-item>
      </fake-collapse>
    `),
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step('点击禁用面板，确认不会展开', async () => {
      const disabledPanel = canvas.getByText('禁用面板')
      await userEvent.click(disabledPanel)
    })
  },
}

export const Controlled: Story & { argTypes: ArgTypes } = {
  argTypes: {},
  args: {
    onChange: fn(),
  },
  render: args => ({
    components: { FakeCollapse, FakeCollapseItem },
    setup() {
      const activeNames = ['1']
      return { args, activeNames }
    },
    template: container(`
      <fake-collapse v-model="activeNames" v-bind="args">
        <fake-collapse-item name="1" title="受控面板一">
          这个面板的状态由外部变量 activeNames 控制。
        </fake-collapse-item>
        <fake-collapse-item name="2" title="受控面板二">
          当前展开的面板: {{ activeNames.join(', ') || '无' }}
        </fake-collapse-item>
        <fake-collapse-item name="3" title="受控面板三">
          通过 v-model 双向绑定控制展开状态。
        </fake-collapse-item>
      </fake-collapse>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('点击面板三，触发 change 事件', async () => {
      const section3 = canvas.getByText('受控面板三')
      await userEvent.click(section3)
    })
    expect(args.onChange).toHaveBeenCalled()
  },
}

export const WithSlots: Story = {
  args: {
    modelValue: ['1'],
  },
  render: args => ({
    components: { FakeCollapse, FakeCollapseItem },
    setup() {
      return { args }
    },
    template: container(`
      <fake-collapse v-bind="args">
        <fake-collapse-item name="1">
          <template #title>
            <span style="color: #409eff;">自定义标题 - 面板一</span>
          </template>
          这是使用自定义标题插槽的面板内容。
        </fake-collapse-item>
        <fake-collapse-item name="2">
          <template #title>
            <span>🎨 带图标的自定义标题 - 面板二</span>
          </template>
          你可以在标题插槽中使用任何自定义内容，比如图标、样式等。
        </fake-collapse-item>
        <fake-collapse-item name="3" title="默认标题">
          这个面板使用默认的 title 属性。
        </fake-collapse-item>
      </fake-collapse>
    `),
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    await step('点击自定义标题面板', async () => {
      const customTitle = canvas.getByText(/自定义标题.*面板二/)
      await userEvent.click(customTitle)
    })
  },
}

export const AllCollapsed: Story & { argTypes: ArgTypes } = {
  argTypes: {},
  args: {
    modelValue: [],
  },
  render: args => ({
    components: { FakeCollapse, FakeCollapseItem },
    setup() {
      return { args }
    },
    template: container(`
      <fake-collapse v-bind="args">
        <fake-collapse-item name="1" title="面板一">
          默认全部折叠的内容。
        </fake-collapse-item>
        <fake-collapse-item name="2" title="面板二">
          需要手动点击展开。
        </fake-collapse-item>
        <fake-collapse-item name="3" title="面板三">
          可以同时展开多个面板。
        </fake-collapse-item>
      </fake-collapse>
    `),
  }),
}

export const AllExpanded: Story & { argTypes: ArgTypes } = {
  argTypes: {},
  args: {
    modelValue: ['1', '2', '3'],
  },
  render: args => ({
    components: { FakeCollapse, FakeCollapseItem },
    setup() {
      return { args }
    },
    template: container(`
      <fake-collapse v-bind="args">
        <fake-collapse-item name="1" title="面板一">
          默认全部展开的内容一。
        </fake-collapse-item>
        <fake-collapse-item name="2" title="面板二">
          默认全部展开的内容二。
        </fake-collapse-item>
        <fake-collapse-item name="3" title="面板三">
          默认全部展开的内容三。
        </fake-collapse-item>
      </fake-collapse>
    `),
  }),
}
