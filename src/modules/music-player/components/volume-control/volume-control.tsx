import { useMusicPlayerContext } from '../../context/music-player-context';
import './volume-control.scss';

function VolumeControl() {
  const { currentVolume, changeVolume } = useMusicPlayerContext();

  const style = { '--ggs': 1 } as React.CSSProperties;

  return (
    <div className="volume_control" style={style}>
      <div className="volume_control-left_icon">
        <i className="gg-volume"></i>
      </div>

      <div className="volume_control-control">
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={currentVolume}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeVolume(+e?.target?.value)}
        />
      </div>

      <div className="volume_control-right_icon">
        <i className="gg-volume"></i>
      </div>
    </div>
  );
}

export default VolumeControl;
