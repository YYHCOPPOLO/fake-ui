import type { Component, ComputedRef, Ref } from 'vue'

export type ButtonType = 'primary' | 'success' | 'danger' | 'warning' | 'info'
export type NativeType = 'button' | 'submit' | 'reset'
export type ButtonSize = 'large' | 'default' | 'small'

export interface ButtonProps {
  tag?: string | Component
  type?: ButtonType
  nativeType?: NativeType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  loadingIcon?: string
  icon?: string
  round?: boolean
  circle?: boolean
  plain?: boolean
  autoFocus?: boolean
  useThrottle?: boolean
  throttleDelay?: number
}

export interface ButtonGroupProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}

export interface ButtonGroupContext {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
  disabled: ComputedRef<boolean>
  size: ComputedRef<ButtonSize | ''>
  type: ComputedRef<ButtonType | ''>
}