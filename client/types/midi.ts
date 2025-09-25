
export interface Note {
  time: number;
  midi: number;
  name: string;
  velocity: number;
  duration: number;
  track: number;
}

export interface Track {
  name: string;
  instrument: {
    name: string;
    number: number;
    family: string;
  };
  notes: Note[];
  channel: number;
}

export interface ParsedMidi {
  fileName: string;
  header: {
    name: string;
    tempos: {
      bpm: number;
      ticks: number;
    }[];
    timeSignatures: {
      ticks: number;
      timeSignature: [number, number];
    }[];
  };
  tracks: Track[];
  duration: number;
}
