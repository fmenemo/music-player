import { useMusicPlayerContext } from '../../context/music-player-context';
import './media-controls.scss';

interface MediaControlsProps {
  audio: HTMLAudioElement | null;
}

function MediaControls({ audio }: MediaControlsProps) {
  const { activeSongIdx, isPlaying, playPause, previousSong, nextSong } = useMusicPlayerContext();

  const shouldResetSong = () => {
    return audio && audio?.currentTime > 2;
  };

  const checkPreviousSong = () => {
    if (audio && shouldResetSong()) {
      audio.currentTime = 0;
    } else {
      previousSong();
    }
  };

  const playPauseButton = () => {
    if (isPlaying) {
      audio?.pause();
    } else {
      audio?.play();
    }

    playPause();
  };

  return (
    <div className="media_controls">
      <button
        className="media_controls-previous"
        onClick={() => checkPreviousSong()}
        disabled={activeSongIdx === 0 && !shouldResetSong()}>
        <i className="gg-play-track-prev"></i>
      </button>
      <button className="media_controls-play_pause" onClick={() => playPauseButton()}>
        {isPlaying ? <i className="gg-play-pause"></i> : <i className="gg-play-button"></i>}
      </button>
      <button className="media_controls-next" onClick={nextSong}>
        <i className="gg-play-track-next"></i>
      </button>
    </div>
  );
}

export default MediaControls;
