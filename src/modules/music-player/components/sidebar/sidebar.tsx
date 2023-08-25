import { Song } from '../../../../data/data';
import { useMusicPlayerContext } from '../../context/music-player-context';
import VolumeControl from '../volume-control/volume-control';
import './sidebar.scss';

function Sidebar() {
  const { songs, setActiveSong, isPlaying, playPause } = useMusicPlayerContext();

  const selectSong = (song: Song) => {
    if (isPlaying) {
      playPause();
    }
    setActiveSong(song);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">Library</div>

      <div className="sidebar-entries">
        {songs.map((entry: Song) => {
          return (
            <div
              className={`sidebar-entries-entry${entry.active ? ' active' : ''}`}
              onClick={() => selectSong(entry)}
              key={entry.id}>
              <div className="sidebar-entries-entry-cover">
                <img className="sidebar-entries-entry-cover-image" src={entry.cover} alt="cover" />
              </div>
              <div className="sidebar-entries-entry-additional_info">
                <div className="sidebar-entries-entry-additional_info-name">{entry.name}</div>
                <div className="sidebar-entries-entry-additional_info-artist">{entry.artist}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sidebar-volume">
        <VolumeControl />
      </div>
    </div>
  );
}

export default Sidebar;
