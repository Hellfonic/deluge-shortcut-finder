
export enum ShortcutCategory {
  ALL_VIEWS = 'All Views',
  FX_PARAMETERS = 'FX & Parameters',
  SONG_VIEW = 'Song View',
  ARRANGER_VIEW = 'Arranger View',
  CLIP_VIEW = 'Clip View',
  SOUND_EDITOR = 'Sound Editor',
  SYNTH_MIDI_CV = 'Synth, MIDI & CV',
  KIT_CLIPS = 'Kit Clips',
  KEYBOARD = 'Keyboard',
  AUTOMATION = 'Automation',
}

export interface Shortcut {
  id: number;
  combo: string[];
  description: string;
  category: ShortcutCategory;
  notes?: string;
}

export type Theme = 'dark' | 'light' | 'synthwave';

export type SortDirection = 'ascending' | 'descending';
export type SortableKey = keyof Pick<Shortcut, 'description' | 'combo' | 'category'>;
export interface SortConfig {
  key: SortableKey;
  direction: SortDirection;
}
