import { type AxDataTablePreviewProps } from '../typings/AxDataTableProps'

export type Properties = PropertyGroup[]
export type PropertyGroup = { caption: string; propertyGroups?: PropertyGroup[]; properties?: Property[] }
export type Property = { key: string; caption: string; description?: string }

export function getProperties(_values: AxDataTablePreviewProps, defaultProperties: Properties): Properties {
  return defaultProperties
}