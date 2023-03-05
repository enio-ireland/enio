export enum RecordType {
  File,
  Folder
}

export interface Record {
  type: RecordType
  absolutePath: string
}

export type SkipCondition = (absolutPath: string) => boolean
