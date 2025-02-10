import { Music } from "./music"

export type Playlist = {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
    musics: Music[]
}