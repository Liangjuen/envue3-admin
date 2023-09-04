import type { ExtractPropTypes } from 'vue'

const svgIconDefaults = {
  color: undefined,
  size: 14
}

export const svgIconProps = {
  /**
   *  @description icon名
   */
  icon: {
    type: String,
    required: true
  },
  /**
  *  @description 自定义颜色
  */
  color: {
    type: String,
    default: svgIconDefaults.color
  },
  /**
  *  @description 尺寸
  */
  size: {
    type: Number
  },
} as const

export type SvgIconProps = ExtractPropTypes<typeof svgIconProps>