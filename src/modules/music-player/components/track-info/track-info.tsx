import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useMusicPlayerContext } from '../../context/music-player-context';
import MediaControls from '../media-controls/media-controls';
import './track-info.scss';

function TrackInfo() {
  const { songs, activeSongIdx, isPlaying, nextSong, currentVolume } = useMusicPlayerContext();
  const [currentTime, setCurrentTime] = useState(0);
  const audio = useRef<HTMLAudioElement>(null);

  const formatTime = (timeInSeconds: number) => {
    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(timeInSeconds);
    return dayjs(date).format('mm:ss');
  };

  const onLoadedData = () => {
    if (isPlaying) {
      audio?.current?.play();
    }
  };

  useEffect(() => {
    if (currentTime === audio?.current?.duration) {
      nextSong();
    }
  }, [currentTime]);

  useEffect(() => {
    if (audio?.current) {
      audio.current.volume = currentVolume;
    }
  }, [currentVolume]);

  return (
    <div className="track_info">
      <audio
        controls={false}
        ref={audio}
        src={songs[activeSongIdx].audio}
        onTimeUpdate={() => setCurrentTime(audio?.current?.currentTime ?? 0)}
        onLoadedData={() => onLoadedData()}
      />

      <div className="track_info-timeline">
        <div className="track_info-timeline-current">{formatTime(currentTime)}</div>

        <div className="track_info-timeline-playback_timeline">
          <input
            type="range"
            min={0}
            max={audio?.current?.duration ? audio.current.duration : 0}
            value={currentTime}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              !!audio?.current && (audio.current.currentTime = +e?.target?.value)
            }
          />
        </div>

        <div className="track_info-timeline-track_length">
          {audio?.current?.duration ? formatTime(audio?.current?.duration) : '-'}
        </div>
      </div>

      <div className="track_info-media_controls">
        <MediaControls audio={audio?.current} />
      </div>
    </div>
  );
}

export default TrackInfo;
