export interface WorkoutPlaylist {
  id: string;
  name: string;
  genre: string;
  bpm: string;
  energyLevel: 'MAXIMUM' | 'HIGH' | 'EXPLOSIVE';
  description: string;
  badge: string;
  coverGradient: string;
  spotifyPlaylistId: string;
  spotifyUrl: string;
  appleMusicUrl: string;
}

export const CURATED_PLAYLISTS: WorkoutPlaylist[] = [
  {
    id: 'beast_mode',
    name: 'Beast Mode HIIT (165+ BPM)',
    genre: 'Bass & High-Energy EDM',
    bpm: '160-175 BPM',
    energyLevel: 'MAXIMUM',
    badge: 'TOP CHOICE 🔥',
    description: 'High-octane bass drops, electro, and relentless drops engineered for peak heart-rate sets.',
    coverGradient: 'linear-gradient(135deg, #FF00FF, #A855F7)',
    spotifyPlaylistId: '37i9dQZF1DX76Wlfdnj7AP',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP',
    appleMusicUrl: 'https://music.apple.com/playlist/beast-mode/pl.u-aZb0N5DuP18jV3'
  },
  {
    id: 'cyber_phonk',
    name: 'Cyberpunk & Drift Phonk',
    genre: 'Neon Phonk & Cyber Bass',
    bpm: '150-165 BPM',
    energyLevel: 'EXPLOSIVE',
    badge: 'NEON FUEL ⚡',
    description: 'Aggressive cowbell rhythms and deep distorted 808s that match the DaniMoves neon aesthetic.',
    coverGradient: 'linear-gradient(135deg, #00F0FF, #3B82F6)',
    spotifyPlaylistId: '37i9dQZF1DWWY64vgF9hzU',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWY64vgF9hzU',
    appleMusicUrl: 'https://music.apple.com/playlist/drift-phonk/pl.u-38oWZ4EUPvMzbJ'
  },
  {
    id: 'hardstyle_rush',
    name: 'Hardstyle & Raw Cardio',
    genre: 'Hard Dance & Techno',
    bpm: '155-180 BPM',
    energyLevel: 'MAXIMUM',
    badge: 'ULTRA BPM 🏎️',
    description: 'Unstoppable reverse bass and euphoric kicks to power through EMOM rounds and final minute sprints.',
    coverGradient: 'linear-gradient(135deg, #EF4444, #F97316)',
    spotifyPlaylistId: '37i9dQZF1DX0pH2SQT0Z2f',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0pH2SQT0Z2f',
    appleMusicUrl: 'https://music.apple.com/playlist/hardstyle-workout/pl.u-6mo4lKZfvZ4xGg'
  },
  {
    id: 'heavy_metal_pump',
    name: 'Heavy Rock & Nu-Metal Charge',
    genre: 'Rock & Metalcore',
    bpm: '140-160 BPM',
    energyLevel: 'HIGH',
    badge: 'RAW POWER 🎸',
    description: 'Thunderous drums and wall-shaking guitar riffs for pushing through heavy resistance sets.',
    coverGradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    spotifyPlaylistId: '37i9dQZF1DXcqGhqI1kudJ',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXcqGhqI1kudJ',
    appleMusicUrl: 'https://music.apple.com/playlist/metal-workout/pl.u-mJy81N0CzL0q9M'
  },
  {
    id: 'trap_workout',
    name: 'Power Rap & Trap Workout',
    genre: 'Trap & Workout Hip-Hop',
    bpm: '140-155 BPM',
    energyLevel: 'HIGH',
    badge: 'BEAT DROP 🎤',
    description: 'Heavy basslines, motivational hooks, and high-tempo rap flows for intense circuits.',
    coverGradient: 'linear-gradient(135deg, #10B981, #00F0FF)',
    spotifyPlaylistId: '37i9dQZF1DX0XUsuxWHRQd',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd',
    appleMusicUrl: 'https://music.apple.com/playlist/pure-workout/pl.u-55D6Xp1C8r0x8b'
  }
];
