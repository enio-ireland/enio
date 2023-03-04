export interface Location {
  folderName: string
  projectName: string
  fullPath: string
}

export interface Locations {
  workspaceRoot: string
  source: Location
  destination: Location
}
