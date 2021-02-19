let primary = '#0064B1'
let secondary = '#F3E4A7'
let tertiary = '#FFFACA'
export default {
  primaryDark: '#0064B1',
  primary: primary,
  danger: '#ff0000',
  warning: '#ffc107',
  secondary: secondary,
  white: '#ffffff',
  gray: '#cccccc',
  accentGray: '#e1e1e147',
  lightGray: '#eeeeee',
  darkGray: '#555555',
  normalGray: '#999',
  black: '#000',
  success: '#4BB543',
  goldenYellow: '#FFDF00',
  lightYellow: '#F3E4A7',
  tertiary: tertiary,
  setPrimary(color) {
    this.primary = color
  },
  setSecondary(color) {
    this.secondary = color
  },
  setTertiary(color) {
    this.tertiary = color
  }
}