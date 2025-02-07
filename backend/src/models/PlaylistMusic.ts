import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface PlaylistMusicAttributes {
  playlistId: number;
  musicId: number;
}

class PlaylistMusic extends Model<PlaylistMusicAttributes> implements PlaylistMusicAttributes {
  public playlistId!: number;
  public musicId!: number;
}

PlaylistMusic.init(
  {
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    musicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PlaylistMusic',
    tableName: 'playlist_musics',
  }
);

export default PlaylistMusic;