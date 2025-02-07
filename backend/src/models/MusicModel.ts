import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import ArtistModel from './ArtistModel';
import PlaylistModel from './PlaylistModel';
import GenderModel from './GenderModel';

interface MusicAttributes {
    id: number | undefined;
    name: string | undefined;
    artistId: number | undefined;
    genderId: number | undefined;
}

// Define the UserModel class
class MusicModel extends Model<MusicAttributes> implements MusicAttributes {
    public id: number | undefined;
    public name: string | undefined;
    public artistId: number | undefined;
    public genderId: number | undefined;

    public readonly artist?: ArtistModel;
    public readonly playlists?: PlaylistModel[];
    public readonly gender?: GenderModel;
}

MusicModel.init(
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
        artistId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        genderId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'MusicModel',
        tableName: 'musics',
    }
);

MusicModel.belongsTo(ArtistModel, {
    foreignKey: 'artistId', // Foreign key in MusicModel
    as: 'artist', // Alias for the association
});
ArtistModel.hasMany(MusicModel, {
    foreignKey: 'artistId', // Foreign key in MusicModel
    as: 'musics', // Alias for the association
});

MusicModel.belongsTo(GenderModel, {
    foreignKey: 'genderId', // Foreign key in MusicModel
    as: 'gender', // Alias for the association
});
GenderModel.hasMany(MusicModel, {
    foreignKey: 'genderId', // Foreign key in MusicModel
    as: 'musics', // Alias for the association
});

export default MusicModel;
