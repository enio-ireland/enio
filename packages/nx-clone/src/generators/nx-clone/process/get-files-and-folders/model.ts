export enum RecordType {
  File,
  Folder
}

export interface Record {
  type: RecordType,
  absolutePath: string
}
