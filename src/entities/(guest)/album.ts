

type AlbumPublicType = {
  id: number,
  name: string,
  details: AlbumPublicDetailType[],
  thumbnail: string,
}

type AlbumPublicDetailType = {
  id: number,
  filePath: string,
  fileName: string,
  originalName: string,
  url: string,
}


export type {
  AlbumPublicType,
  AlbumPublicDetailType,
}
