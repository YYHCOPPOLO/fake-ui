import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { FakeIcon } from 'fake-ui'

const meta: Meta<typeof FakeIcon> = {
  title: 'Components/FakeIcon',
  component: FakeIcon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: [
        'bell',
        'heart',
        'star',
        'user',
        'gear',
        'magnifying-glass',
        'check',
        'xmark',
        'plus',
      ],
      description: 'FontAwesome 图标名称',
    },
    color: { control: 'color', description: '图标颜色' },
    size: { control: 'text', description: '图标尺寸' },
  },
}

export default meta

export const Default: StoryObj<typeof FakeIcon> = {
  args: { icon: 'bell' },
  render: args => ({
    components: { FakeIcon },
    setup: () => ({ args }),
    template: '<FakeIcon v-bind="args" />',
  }),
}

export const Colors: StoryObj<typeof FakeIcon> = {
  args: { icon: 'heart', color: '#ff0000' },
  render: args => ({
    components: { FakeIcon },
    setup: () => ({ args }),
    template: '<FakeIcon v-bind="args" />',
  }),
}

export const Sizes: StoryObj<typeof FakeIcon> = {
  args: { icon: 'star', size: '2em' },
  render: args => ({
    components: { FakeIcon },
    setup: () => ({ args }),
    template: '<FakeIcon v-bind="args" />',
  }),
}

export const Gallery: StoryObj<typeof FakeIcon> = {
  render: () => ({
    components: { FakeIcon },
    setup: () => ({
      icons: [
        'bell',
        'heart',
        'star',
        'user',
        'gear',
        'magnifying-glass',
        'check',
        'xmark',
        'plus',
      ],
    }),
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px; padding: 16px;">
        <div
          v-for="icon in icons"
          :key="icon"
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            padding: 16px;
            border: 1px solid #e4e7ed;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
          "
        >
          <FakeIcon :icon="icon" size="2em" />
          <span style="font-size: 12px; color: #606266;">{{ icon }}</span>
        </div>
      </div>
    `,
  }),
}

export const Interactive: StoryObj<typeof FakeIcon> = {
  render: () => ({
    components: { FakeIcon },
    setup: () => ({
      handleClick: (name: string) => {
        alert(`Clicked: ${name}`)
      },
    }),
    template: `
      <div style="display: flex; gap: 24px; padding: 16px;">
        <FakeIcon
          icon="house"
          size="2em"
          style="cursor: pointer; transition: transform 0.2s;"
          @click="handleClick('Home')"
        />
        <FakeIcon
          icon="heart"
          size="2em"
          color="#ff0000"
          style="cursor: pointer; transition: transform 0.2s;"
          @click="handleClick('Heart')"
        />
        <FakeIcon
          icon="star"
          size="2em"
          color="#f6a23c"
          style="cursor: pointer; transition: transform 0.2s;"
          @click="handleClick('Star')"
        />
      </div>
    `,
  }),
}

export const Accessibility: StoryObj<typeof FakeIcon> = {
  render: () => ({
    components: { FakeIcon },
    setup: () => ({}),
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <FakeIcon icon="check" aria-label="Success checkmark" />
          <span>Task completed</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <FakeIcon icon="xmark" aria-label="Error icon" color="#f56c6c" />
          <span>Task failed</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <FakeIcon icon="circle-info" aria-hidden="true" />
          <span>Information (decorative icon)</span>
        </div>
      </div>
    `,
  }),
}
