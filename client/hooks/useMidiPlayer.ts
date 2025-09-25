//
//import { useState, useEffect, useRef, useCallback } from 'react';
//import { ParsedMidi, Track } from '../types/midi';
//
//declare const Tone: any;
//
//interface UseMidiPlayerProps {
//  midiData: ParsedMidi | null;
//}
//
//export const useMidiPlayer = ({ midiData }: UseMidiPlayerProps) => {
//  const [isPlaying, setIsPlaying] = useState(false);
//  const [currentTime, setCurrentTime] = useState(0);
//  const [tempo, setTempo] = useState(120);
//  const [isLooping, setIsLooping] = useState(false);
//  const [trackStates, setTrackStates] = useState<Map<number, { muted: boolean; volume: number }>>(new Map());
//
//  const synths = useRef<any[]>([]);
//  const transportId = useRef<number | null>(null);
//
//  useEffect(() => {
//    if (midiData) {
//      const initialTempo = midiData.header.tempos[0]?.bpm || 120;
//      setTempo(initialTempo);
//      Tone.Transport.bpm.value = initialTempo;
//      
//      // FIX: Explicitly type the Map to ensure type safety for track states.
//      // When `new Map()` is used without a type, TypeScript can infer its values as `unknown`,
//      // leading to errors when trying to spread or access properties on the map's values later.
//      const initialTrackStates = new Map<number, { muted: boolean; volume: number }>();
//      midiData.tracks.forEach((_, i) => {
//        initialTrackStates.set(i, { muted: false, volume: 0 });
//      });
//      setTrackStates(initialTrackStates);
//    }
//
//    return () => {
//      Tone.Transport.stop();
//      Tone.Transport.cancel();
//      synths.current.forEach(synth => synth.dispose());
//      synths.current = [];
//      if (transportId.current) {
//        Tone.Transport.clear(transportId.current);
//      }
//    };
//  }, [midiData]);
//
//  useEffect(() => {
//    if (!midiData) return;
//
//    Tone.Transport.cancel();
//    synths.current.forEach(synth => synth.dispose());
//    synths.current = [];
//
//    midiData.tracks.forEach((track, i) => {
//      const synth = new Tone.PolySynth(Tone.Synth, {
//        envelope: {
//            attack: 0.02,
//            decay: 0.1,
//            sustain: 0.3,
//            release: 1
//        }
//      }).toDestination();
//      synths.current.push(synth);
//      
//      const trackState = trackStates.get(i);
//      if(trackState) {
//        synth.volume.value = trackState.volume;
//      }
//
//      track.notes.forEach(note => {
//        Tone.Transport.schedule((time: number) => {
//          const currentTrackState = trackStates.get(i);
//          if (currentTrackState && !currentTrackState.muted) {
//            synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
//          }
//        }, note.time);
//      });
//    });
//  // eslint-disable-next-line react-hooks/exhaustive-deps
//  }, [midiData, trackStates]);
//  
//  useEffect(() => {
//    Tone.Transport.loop = isLooping;
//    if (midiData) {
//      Tone.Transport.loopEnd = midiData.duration;
//    }
//  }, [isLooping, midiData]);
//
//  const updateCurrentTime = useCallback(() => {
//    setCurrentTime(Tone.Transport.seconds);
//    if (isPlaying) {
//      requestAnimationFrame(updateCurrentTime);
//    }
//  }, [isPlaying]);
//
//  useEffect(() => {
//    if (isPlaying) {
//      transportId.current = requestAnimationFrame(updateCurrentTime);
//    } else {
//      if (transportId.current) {
//        cancelAnimationFrame(transportId.current);
//      }
//    }
//    return () => {
//      if (transportId.current) {
//        cancelAnimationFrame(transportId.current);
//      }
//    };
//  }, [isPlaying, updateCurrentTime]);
//
//
//  const play = useCallback(() => {
//    if (Tone.context.state !== 'running') {
//      Tone.context.resume().then(() => {
//        Tone.Transport.start();
//        setIsPlaying(true);
//      });
//    } else {
//      Tone.Transport.start();
//      setIsPlaying(true);
//    }
//  }, []);
//
//  const pause = useCallback(() => {
//    Tone.Transport.pause();
//    setIsPlaying(false);
//  }, []);
//
//  const stop = useCallback(() => {
//    Tone.Transport.stop();
//    setIsPlaying(false);
//    setCurrentTime(0);
//  }, []);
//
//  const seek = useCallback((time: number) => {
//    Tone.Transport.seconds = time;
//    setCurrentTime(time);
//  }, []);
//
//  const changeTempo = useCallback((newTempo: number) => {
//    setTempo(newTempo);
//    Tone.Transport.bpm.value = newTempo;
//  }, []);
//
//  const toggleTrackMute = useCallback((trackIndex: number) => {
//    setTrackStates(prev => {
//      const newStates = new Map(prev);
//      const state = newStates.get(trackIndex);
//      if (state) {
//        newStates.set(trackIndex, { ...state, muted: !state.muted });
//      }
//      return newStates;
//    });
//  }, []);
//
//  const setTrackVolume = useCallback((trackIndex: number, volume: number) => {
//    setTrackStates(prev => {
//      const newStates = new Map(prev);
//      const state = newStates.get(trackIndex);
//      if (state) {
//        newStates.set(trackIndex, { ...state, volume });
//      }
//      return newStates;
//    });
//     if (synths.current[trackIndex]) {
//        synths.current[trackIndex].volume.value = volume;
//    }
//  }, []);
//  
//  const toggleLoop = useCallback(() => {
//    setIsLooping(prev => !prev);
//  }, []);
//
//  return {
//    isPlaying,
//    currentTime,
//    duration: midiData?.duration || 0,
//    tempo,
//    isLooping,
//    trackStates,
//    tracks: midiData?.tracks || [],
//    play,
//    pause,
//    stop,
//    seek,
//    changeTempo,
//    toggleTrackMute,
//    setTrackVolume,
//    toggleLoop,
//  };
//};









// import { useState, useEffect, useRef, useCallback } from 'react';
// import { ParsedMidi, Track } from '../types/midi';

// declare const Tone: any;

// interface UseMidiPlayerProps {
//   midiData: ParsedMidi | null;
// }

// export const useMidiPlayer = ({ midiData }: UseMidiPlayerProps) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [tempo, setTempo] = useState(120);
//   const [isLooping, setIsLooping] = useState(false);
//   const [trackStates, setTrackStates] = useState<Map<number, { muted: boolean; volume: number }>>(new Map());

//   const synths = useRef<any[]>([]);
//   const transportId = useRef<number | null>(null);

//   useEffect(() => {
//     if (midiData) {
//       const initialTempo = midiData.header.tempos[0]?.bpm || 120;
//       setTempo(initialTempo);
//       Tone.Transport.bpm.value = initialTempo;
      
//       const initialTrackStates = new Map<number, { muted: boolean; volume: number }>();
//       midiData.tracks.forEach((_, i) => {
//         initialTrackStates.set(i, { muted: false, volume: 0 });
//       });
//       setTrackStates(initialTrackStates);
//     }

//     return () => {
//       Tone.Transport.stop();
//       Tone.Transport.cancel();
//       synths.current.forEach(synth => synth.dispose());
//       synths.current = [];
//       if (transportId.current) {
//         cancelAnimationFrame(transportId.current);
//       }
//     };
//   }, [midiData]);

//   // This effect synchronizes the UI state with the Tone.js audio engine.
//   // We've separated it from the note scheduling logic for better control.
//   useEffect(() => {
//     // Clean up old synths
//     synths.current.forEach(synth => synth.dispose());
//     synths.current = [];

//     if (!midiData) return;

//     // Create new synths and schedule notes
//     midiData.tracks.forEach((track, i) => {
//       const synth = new Tone.PolySynth(Tone.Synth, {
//         envelope: {
//             attack: 0.02,
//             decay: 0.1,
//             sustain: 0.3,
//             release: 1
//         }
//       }).toDestination();
//       synths.current.push(synth);
      
//       track.notes.forEach(note => {
//         // Schedule notes. The mute check will be done live.
//         Tone.Transport.schedule((time: number) => {
//           // Live check of track state to handle muting and unmuting instantly.
//           const currentTrackState = trackStates.get(i);
//           if (currentTrackState && !currentTrackState.muted) {
//             synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
//           }
//         }, note.time);
//       });
//     });

//   }, [midiData]); // This hook should only depend on midiData to schedule notes once.

//   // New effect to handle track state changes (mute, volume)
//   // This will run whenever `trackStates` is updated.
//   useEffect(() => {
//     trackStates.forEach((state, i) => {
//       const synth = synths.current[i];
//       if (synth) {
//         // The volume change is already handled in `setTrackVolume`, but this ensures a fallback.
//         synth.volume.value = state.volume;
//       }
//     });
//   }, [trackStates]);

//   useEffect(() => {
//     Tone.Transport.loop = isLooping;
//     if (midiData) {
//       Tone.Transport.loopEnd = midiData.duration;
//     }
//   }, [isLooping, midiData]);

//   const updateCurrentTime = useCallback(() => {
//     setCurrentTime(Tone.Transport.seconds);
//     if (isPlaying) {
//       transportId.current = requestAnimationFrame(updateCurrentTime);
//     }
//   }, [isPlaying]);

//   useEffect(() => {
//     if (isPlaying) {
//       transportId.current = requestAnimationFrame(updateCurrentTime);
//     } else {
//       if (transportId.current) {
//         cancelAnimationFrame(transportId.current);
//       }
//     }
//     return () => {
//       if (transportId.current) {
//         cancelAnimationFrame(transportId.current);
//       }
//     };
//   }, [isPlaying, updateCurrentTime]);


//   const play = useCallback(() => {
//     if (Tone.context.state !== 'running') {
//       Tone.context.resume().then(() => {
//         Tone.Transport.start();
//         setIsPlaying(true);
//       });
//     } else {
//       Tone.Transport.start();
//       setIsPlaying(true);
//     }
//   }, []);

//   const pause = useCallback(() => {
//     Tone.Transport.pause();
//     setIsPlaying(false);
//   }, []);

//   const stop = useCallback(() => {
//     Tone.Transport.stop();
//     setIsPlaying(false);
//     setCurrentTime(0);
//   }, []);

//   const seek = useCallback((time: number) => {
//     Tone.Transport.seconds = time;
//     setCurrentTime(time);
//   }, []);

//   const changeTempo = useCallback((newTempo: number) => {
//     setTempo(newTempo);
//     Tone.Transport.bpm.value = newTempo;
//   }, []);

//   const toggleTrackMute = useCallback((trackIndex: number) => {
//     setTrackStates(prev => {
//       const newStates = new Map(prev);
//       const state = newStates.get(trackIndex);
//       if (state) {
//         const newState = { ...state, muted: !state.muted };
//         newStates.set(trackIndex, newState);
        
//         // Immediately update the synth's volume to simulate mute/unmute
//         // Tone.js uses decibels for volume, a very low value effectively mutes
//         const synth = synths.current[trackIndex];
//         if (synth) {
//           synth.volume.value = newState.muted ? -Infinity : newState.volume;
//         }
//       }
//       return newStates;
//     });
//   }, []);

//   const setTrackVolume = useCallback((trackIndex: number, volume: number) => {
//     setTrackStates(prev => {
//       const newStates = new Map(prev);
//       const state = newStates.get(trackIndex);
//       if (state) {
//         const newState = { ...state, volume };
//         newStates.set(trackIndex, newState);

//         // Immediately update the synth's volume
//         const synth = synths.current[trackIndex];
//         if (synth) {
//             // Check if muted before applying new volume
//             synth.volume.value = newState.muted ? -Infinity : volume;
//         }
//       }
//       return newStates;
//     });
//   }, []);
  
//   const toggleLoop = useCallback(() => {
//     setIsLooping(prev => !prev);
//   }, []);

//   return {
//     isPlaying,
//     currentTime,
//     duration: midiData?.duration || 0,
//     tempo,
//     isLooping,
//     trackStates,
//     tracks: midiData?.tracks || [],
//     play,
//     pause,
//     stop,
//     seek,
//     changeTempo,
//     toggleTrackMute,
//     setTrackVolume,
//     toggleLoop,
//   };
// };


//------------------------after chatGPT edit------------------------






import * as Tone from "tone";
import { useState, useEffect, useRef, useCallback } from 'react';
import { ParsedMidi, Track } from '../types/midi';

declare const Tone: any;

interface TrackState {
  muted: boolean;
  volume: number;
}

interface UseMidiPlayerProps {
  midiData: ParsedMidi | null;
}

export const useMidiPlayer = ({ midiData }: UseMidiPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [tempo, setTempo] = useState(120);
  const [isLooping, setIsLooping] = useState(false);
  const [trackStates, setTrackStates] = useState<Map<number, TrackState>>(new Map());

  const synths = useRef<any[]>([]);
  const transportId = useRef<number | null>(null);

  useEffect(() => {
    if (midiData) {
      const initialTempo = midiData.header.tempos[0]?.bpm || 120;
      setTempo(initialTempo);
      Tone.Transport.bpm.value = initialTempo;

      const initialTrackStates = new Map<number, TrackState>();
      midiData.tracks.forEach((_, i) => {
        initialTrackStates.set(i, { muted: false, volume: 0 });
      });
      setTrackStates(initialTrackStates);
    }

    return () => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      synths.current.forEach(synth => synth.dispose());
      synths.current = [];
      if (transportId.current) {
        cancelAnimationFrame(transportId.current);
      }
    };
  }, [midiData]);

  useEffect(() => {
    synths.current.forEach(synth => synth.dispose());
    synths.current = [];

    if (!midiData) return;

    midiData.tracks.forEach((track, i) => {
      const synth = new Tone.PolySynth(Tone.Synth, {
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      }).toDestination();
      synths.current.push(synth);

      track.notes.forEach(note => {
        Tone.Transport.schedule((time: number) => {
          const currentTrackState = trackStates.get(i);
          if (currentTrackState && !currentTrackState.muted) {
            synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
          }
        }, note.time);
      });
    });
  }, [midiData, trackStates]);

  useEffect(() => {
    trackStates.forEach((state, i) => {
      const synth = synths.current[i];
      if (synth) {
        synth.volume.value = state.muted ? -Infinity : state.volume;
      }
    });
  }, [trackStates]);

  useEffect(() => {
    Tone.Transport.loop = isLooping;
    if (midiData) {
      Tone.Transport.loopEnd = midiData.duration;
    }
  }, [isLooping, midiData]);

  const updateCurrentTime = useCallback(() => {
    setCurrentTime(Tone.Transport.seconds);
    if (isPlaying) {
      transportId.current = requestAnimationFrame(updateCurrentTime);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      transportId.current = requestAnimationFrame(updateCurrentTime);
    } else {
      if (transportId.current) {
        cancelAnimationFrame(transportId.current);
      }
    }
    return () => {
      if (transportId.current) {
        cancelAnimationFrame(transportId.current);
      }
    };
  }, [isPlaying, updateCurrentTime]);

  // const play = useCallback(() => {
  //   if (Tone.context.state !== 'running') {
  //     Tone.context.resume().then(() => {
  //       Tone.Transport.start();
  //       setIsPlaying(true);
  //     });
  //   } else {
  //     Tone.Transport.start();
  //     setIsPlaying(true);
  //   }
  // }, []);
  const play = useCallback(async () => {
  await Tone.start(); // unlocks audio on first click
  if (Tone.context.state !== 'running') {
    await Tone.context.resume();
  }
  Tone.Transport.start();
  setIsPlaying(true);
}, []);

  const pause = useCallback(() => {
    Tone.Transport.pause();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    Tone.Transport.stop();
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const seek = useCallback((time: number) => {
    Tone.Transport.seconds = time;
    setCurrentTime(time);
  }, []);

  const changeTempo = useCallback((newTempo: number) => {
    setTempo(newTempo);
    Tone.Transport.bpm.value = newTempo;
  }, []);

  const toggleTrackMute = useCallback((trackIndex: number) => {
    setTrackStates(prev => {
      const newStates = new Map(prev);
      const state = newStates.get(trackIndex);
      if (state) {
        const newState: TrackState = { ...state, muted: !state.muted };
        newStates.set(trackIndex, newState);

        const synth = synths.current[trackIndex];
        if (synth) {
          synth.volume.value = newState.muted ? -Infinity : newState.volume;
        }
      }
      return newStates;
    });
  }, []);

  const setTrackVolume = useCallback((trackIndex: number, volume: number) => {
    setTrackStates(prev => {
      const newStates = new Map(prev);
      const state = newStates.get(trackIndex);
      if (state) {
        const newState: TrackState = { ...state, volume };
        newStates.set(trackIndex, newState);

        const synth = synths.current[trackIndex];
        if (synth) {
          synth.volume.value = newState.muted ? -Infinity : volume;
        }
      }
      return newStates;
    });
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping(prev => !prev);
  }, []);

  return {
    isPlaying,
    currentTime,
    duration: midiData?.duration || 0,
    tempo,
    isLooping,
    trackStates,
    tracks: midiData?.tracks || [],
    play,
    pause,
    stop,
    seek,
    changeTempo,
    toggleTrackMute,
    setTrackVolume,
    toggleLoop,
  };
};