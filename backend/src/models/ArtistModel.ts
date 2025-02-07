import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import MusicModel from './MusicModel';

interface ArtistAttributes {
    id: number | undefined;
    name: string | undefined;
}

// Define the UserModel class
class ArtistModel extends Model<ArtistAttributes> implements ArtistAttributes {
    public id: number | undefined;
    public name: string | undefined;

    public readonly musics?: MusicModel[];
}

ArtistModel.init(
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
        modelName: 'ArtistModel',
        tableName: 'artists',
    }
);

// ArtistModel.hasMany(MusicModel, {
//     foreignKey: 'artistId',
//     as: 'musics'
// });

export default ArtistModel;
