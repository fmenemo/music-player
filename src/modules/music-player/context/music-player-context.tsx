import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import chillHop, { Song } from '../../../data/data';

export interface IMusicPlayerContext {
  songs: Song[];
  activeSongIdx: number;
  setActiveSong: (entry: Song) => void;
  isPlaying: boolean;
  playPause: () => void;
  previousSong: () => void;
  nextSong: () => void;
  currentVolume: number;
  changeVolume: (newVolume: number) => void;
}

export const MusicPlayerContext = createContext<IMusicPlayerContext>({
  songs: [],
  activeSongIdx: 0,
  setActiveSong: () => null,
  isPlaying: false,
  playPause: () => null,
  previousSong: () => null,
  nextSong: () => null,
  currentVolume: 1,
  changeVolume: () => null,
});

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [songs, setSongs] = useState<Song[]>(chillHop());
  const [activeSongIdx, setActiveSongIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(1);

  const setActiveSong = useCallback(
    (entry: Song) => {
      const newSongIdx = songs.findIndex((songToFind) => songToFind.id === entry.id);
      songs[activeSongIdx].active = false;
      songs[newSongIdx].active = true;

      setSongs([...songs]);
      setActiveSongIdx(newSongIdx);
    },
    [songs],
  );

  const playPause = useCallback(() => setIsPlaying((prev) => !prev), []);

  const previousSong = useCallback(
    () => activeSongIdx > 0 && setActiveSong(songs[activeSongIdx - 1]),
    [songs, activeSongIdx],
  );

  const nextSong = useCallback(() => {
    if (activeSongIdx < songs.length - 1) {
      setActiveSong(songs[activeSongIdx + 1]);
    } else {
      setIsPlaying(false);
      setActiveSong(songs[0]);
    }
  }, [songs, activeSongIdx]);

  const changeVolume = useCallback(
    (newVolume: number) => setCurrentVolume(newVolume),
    [currentVolume],
  );

  const value = useMemo(
    () => ({
      songs,
      activeSongIdx,
      setActiveSong,
      isPlaying,
      playPause,
      previousSong,
      nextSong,
      currentVolume,
      changeVolume,
    }),

    [
      songs,
      activeSongIdx,
      setActiveSong,
      isPlaying,
      playPause,
      previousSong,
      nextSong,
      currentVolume,
      changeVolume,
    ],
  );

  return <MusicPlayerContext.Provider value={value}>{children}</MusicPlayerContext.Provider>;
}

MusicPlayerContext.displayName = 'MusicPlayerContext';

export function useMusicPlayerContext(): IMusicPlayerContext {
  return useContext(MusicPlayerContext);
}
