import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('music_app', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
