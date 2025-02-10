import { Artist } from "./artist"
import { Genre } from "./genre"

export type Music = {
    id: number
    name: string
    createdAt: string,
    updatedAt: string
    artist: Artist
    gender: Genre
}