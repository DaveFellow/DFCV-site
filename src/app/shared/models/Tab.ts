export interface Tab {
  name: string,
  label?: string,
  route?: string,
  action?: () => void
}