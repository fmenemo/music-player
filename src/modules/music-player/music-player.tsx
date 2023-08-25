import { useEffect } from 'react';
import Sidebar from './components/sidebar/sidebar';
import TrackInfo from './components/track-info/track-info';
import { useMusicPlayerContext } from './context/music-player-context';
import './music-player.scss';

function MusicPlayer() {
  const { songs, activeSongIdx, setActiveSong } = useMusicPlayerContext();

  useEffect(() => {
    document.body.style.setProperty('--primary-color', `${songs[activeSongIdx].color[0]}ff`);
    document.body.style.setProperty('--secondary-color', `${songs[activeSongIdx].color[1]}ff`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSongIdx]);

  useEffect(() => {
    setActiveSong(songs[0]);
    document.body.style.setProperty('--ggs', `2`); // set icon size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="music_player">
      <div className="music_player-sidebar">
        <Sidebar />
      </div>

      <div className="music_player-main_content">
        <div className="music_player-main_content-cover">
          <img
            className="music_player-main_content-cover-img"
            src={songs[activeSongIdx].cover}
            alt="cover"
          />
        </div>

        <div className="music_player-main_content-artist">{songs[activeSongIdx].artist}</div>

        <div className="music_player-main_content-player">
          <div className="music_player-main_content-player-song">{songs[activeSongIdx].name}</div>

          <div className="music_player-main_content-player-controls">
            <TrackInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
