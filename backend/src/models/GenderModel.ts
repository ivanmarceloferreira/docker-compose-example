import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface GenderAttributes {
    id: number | undefined;
    name: string | undefined;
}

// Define the UserModel class
class GenderModel extends Model<GenderAttributes> implements GenderAttributes {
    public id: number | undefined;
    public name: string | undefined;
}

GenderModel.init(
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
        modelName: 'GenderModel',
        tableName: 'genders',
    }
);

export default GenderModel;
