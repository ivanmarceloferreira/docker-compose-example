import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import MusicModel from './MusicModel';

interface PlaylistAttributes {
    id: number | undefined;
    name: string | undefined;
}

class PlaylistModel
    extends Model<PlaylistAttributes>
    implements PlaylistAttributes
{
    public id: number | undefined;
    public name: string | undefined;

    public readonly musics?: MusicModel[];

    // Declare the magic methods
    public addMusics!: (musics: MusicModel[] | number[]) => Promise<void>;
    public removeMusics!: (musics: MusicModel[] | number[]) => Promise<void>;
    public setMusics!: (musics: MusicModel[] | number[]) => Promise<void>;
    public getMusics!: () => Promise<MusicModel[]>;
}

PlaylistModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'PlaylistModel',
        tableName: 'playlists',
    }
);

PlaylistModel.belongsToMany(MusicModel, {
    through: 'playlist_musics', // Use the join table
    foreignKey: 'playlistId', // Foreign key in the join table
    as: 'musics', // Alias for the association
});
MusicModel.belongsToMany(PlaylistModel, {
    through: 'playlist_musics',
    foreignKey: 'musicId',
    as: 'playlists',
});

export default PlaylistModel;
