import React, { useState } from 'react';
import { 
  Music, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  Radio, 
  Headphones, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Flame, 
  Sparkles,
  Zap,
  Activity,
  Play,
  Pause
} from 'lucide-react';
import { CURATED_PLAYLISTS, WorkoutPlaylist } from '../data/musicPlaylists';
import { workoutAudio } from '../utils/workoutAudio';

interface WorkoutMusicPlayerProps {
  selectedPlaylistId: string;
  onSelectPlaylist: (playlist: WorkoutPlaylist) => void;
  isTimerActive: boolean;
  timerStatus: string;
}

export const WorkoutMusicPlayer: React.FC<WorkoutMusicPlayerProps> = ({
  selectedPlaylistId,
  onSelectPlaylist,
  isTimerActive,
  timerStatus
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmbedPlayer, setShowEmbedPlayer] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isPacerActive, setIsPacerActive] = useState(false);
  const [pacerBpm, setPacerBpm] = useState(160);

  const activePlaylist = CURATED_PLAYLISTS.find(p => p.id === selectedPlaylistId) || CURATED_PLAYLISTS[0];

  const handleToggleMute = () => {
    const nextMute = !isAudioMuted;
    setIsAudioMuted(nextMute);
    workoutAudio.setMuted(nextMute);
  };

  const handleTogglePacer = () => {
    if (isPacerActive) {
      workoutAudio.stopPacer();
      setIsPacerActive(false);
    } else {
      workoutAudio.startPacer(pacerBpm);
      setIsPacerActive(true);
    }
  };

  const handleBpmChange = (newBpm: number) => {
    setPacerBpm(newBpm);
    if (isPacerActive) {
      workoutAudio.startPacer(newBpm);
    }
  };

  const openSpotify = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openAppleMusic = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* --- FLOATING / COMPACT MINI-PLAYER BAR (ACCESSIBLE FROM TIMER) --- */}
      <div className="w-full max-w-md mx-auto px-4 mt-2">
        <div 
          id="timer-music-mini-player"
          className="relative rounded-2xl p-3 bg-zinc-950/80 border border-fuchsia-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(255,0,255,0.15)] flex items-center justify-between gap-3 transition-all hover:border-fuchsia-500/60"
        >
          {/* Animated Equalizer & Playlist Info */}
          <button 
            type="button"
            id="open-music-modal-btn"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer group"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center relative flex-shrink-0 shadow-lg"
              style={{ background: activePlaylist.coverGradient }}
            >
              <Music size={18} className="text-white drop-shadow" />
              {isTimerActive && timerStatus === 'work' && (
                <div className="absolute -bottom-1 -right-1 flex items-end gap-0.5 px-1 py-0.5 bg-black/80 rounded border border-fuchsia-500/50">
                  <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-1 h-2 bg-fuchsia-400 rounded-full animate-bounce [animation-delay:0.25s]"></div>
                  <div className="w-1 h-3.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.15s]"></div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-fuchsia-400">
                  {activePlaylist.bpm}
                </span>
                <span className="text-[8px] px-1.5 py-0.2 rounded bg-white/10 font-bold text-zinc-300">
                  HIIT AUDIO
                </span>
              </div>
              <p className="text-xs font-black text-white italic truncate tracking-tight group-hover:text-fuchsia-300 transition-colors">
                {activePlaylist.name}
              </p>
            </div>
          </button>

          {/* Quick Launch Buttons (Spotify & Apple Music) + Controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Spotify Quick Launch Button */}
            <button
              type="button"
              id="quick-launch-spotify-btn"
              onClick={(e) => openSpotify(activePlaylist.spotifyUrl, e)}
              title="Apri su Spotify"
              className="p-2 rounded-xl bg-[#1DB954]/20 border border-[#1DB954]/40 hover:bg-[#1DB954]/30 active:scale-90 transition-all flex items-center gap-1 cursor-pointer"
            >
              {/* Spotify SVG Icon */}
              <svg className="w-4 h-4 fill-[#1DB954]" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.306c-.216.355-.678.47-1.033.254-2.83-1.728-6.393-2.12-10.592-1.16-.407.093-.815-.164-.908-.57-.093-.408.163-.816.57-.909 4.606-1.053 8.563-.604 11.71 1.352.355.216.47.678.253 1.033zm1.474-3.276c-.272.443-.853.585-1.296.313-3.24-1.99-8.18-2.567-12.012-1.403-.497.152-1.025-.133-1.176-.63-.152-.498.133-1.026.63-1.177 4.385-1.332 9.827-.688 13.541 1.599.443.272.585.854.313 1.298zm.129-3.41c-3.885-2.307-10.29-2.52-14.004-1.393-.595.18-1.226-.162-1.407-.757-.18-.595.163-1.226.758-1.407 4.27-1.296 11.34-1.047 15.808 1.606.535.318.708 1.01.39 1.545-.318.536-1.01.71-1.545.392z"/>
              </svg>
              <span className="text-[10px] font-black text-[#1DB954] hidden sm:inline">Spotify</span>
            </button>

            {/* Apple Music Quick Launch Button */}
            <button
              type="button"
              id="quick-launch-apple-music-btn"
              onClick={(e) => openAppleMusic(activePlaylist.appleMusicUrl, e)}
              title="Apri su Apple Music"
              className="p-2 rounded-xl bg-[#FA243C]/20 border border-[#FA243C]/40 hover:bg-[#FA243C]/30 active:scale-90 transition-all flex items-center gap-1 cursor-pointer"
            >
              {/* Apple Music SVG Icon */}
              <svg className="w-4 h-4 fill-[#FA243C]" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.01.62-2.65 1.37-.56.65-1.04 1.7-0.91 2.72 1.03.08 2.04-.51 2.64-1.24z"/>
              </svg>
              <span className="text-[10px] font-black text-[#FA243C] hidden sm:inline">Apple</span>
            </button>

            {/* Sound FX Audio Mute Toggle */}
            <button
              type="button"
              id="toggle-workout-audio-cues-btn"
              onClick={handleToggleMute}
              title={isAudioMuted ? "Attiva Cues Audio" : "Disattiva Cues Audio"}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isAudioMuted 
                  ? 'bg-zinc-800/80 border-zinc-700 text-zinc-500' 
                  : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
              }`}
            >
              {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Open Hub Button */}
            <button
              type="button"
              id="expand-music-hub-btn"
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:border-fuchsia-500 hover:text-fuchsia-400 active:scale-90 transition-all cursor-pointer"
              title="Espandi Playlist & Controlli"
            >
              <Headphones size={15} />
            </button>
          </div>
        </div>

        {/* Optional Collapsible Compact Spotify Embed Player */}
        {showEmbedPlayer && (
          <div className="mt-2 rounded-2xl overflow-hidden border border-fuchsia-500/30 bg-black shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-2 bg-zinc-900 flex justify-between items-center px-3 border-b border-white/5">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Radio size={12} className="animate-pulse" /> Spotify In-App Player
              </span>
              <button 
                type="button"
                onClick={() => setShowEmbedPlayer(false)} 
                className="text-zinc-400 hover:text-white text-xs cursor-pointer"
              >
                Chiudi ✕
              </button>
            </div>
            <iframe
              title={`Spotify Player - ${activePlaylist.name}`}
              src={`https://open.spotify.com/embed/playlist/${activePlaylist.spotifyPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="bg-black"
            ></iframe>
          </div>
        )}
      </div>

      {/* --- FULL NEON MUSIC HUB MODAL / DRAWER --- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            id="music-hub-modal"
            className="w-full max-w-lg bg-[#0A0A0F] border-2 border-fuchsia-500/50 rounded-[32px] p-6 text-white shadow-[0_0_50px_rgba(255,0,255,0.3)] max-h-[90vh] overflow-y-auto relative flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-purple-600 shadow-[0_0_20px_rgba(255,0,255,0.4)]">
                  <Flame size={24} className="text-white animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-2">
                    HIIT & Pump <span className="text-cyan-400">Audio Hub</span>
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-400">
                    Playlist Ad Alta Intensità per il tuo Workout
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="close-music-modal-btn"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-90 transition-transform cursor-pointer text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Action Bar: Instant Launch in Native Apps */}
            <div className="mt-5 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase italic tracking-wider text-zinc-300">
                  ⚡ Riproduci Playlist Attiva ({activePlaylist.bpm})
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30">
                  {activePlaylist.genre}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Spotify Launch Button */}
                <button
                  type="button"
                  id="modal-launch-spotify-btn"
                  onClick={() => openSpotify(activePlaylist.spotifyUrl)}
                  className="py-3 px-4 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-black text-sm uppercase italic flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(29,185,84,0.4)] active:scale-95 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.306c-.216.355-.678.47-1.033.254-2.83-1.728-6.393-2.12-10.592-1.16-.407.093-.815-.164-.908-.57-.093-.408.163-.816.57-.909 4.606-1.053 8.563-.604 11.71 1.352.355.216.47.678.253 1.033zm1.474-3.276c-.272.443-.853.585-1.296.313-3.24-1.99-8.18-2.567-12.012-1.403-.497.152-1.025-.133-1.176-.63-.152-.498.133-1.026.63-1.177 4.385-1.332 9.827-.688 13.541 1.599.443.272.585.854.313 1.298zm.129-3.41c-3.885-2.307-10.29-2.52-14.004-1.393-.595.18-1.226-.162-1.407-.757-.18-.595.163-1.226.758-1.407 4.27-1.296 11.34-1.047 15.808 1.606.535.318.708 1.01.39 1.545-.318.536-1.01.71-1.545.392z"/>
                  </svg>
                  Spotify <ExternalLink size={14} />
                </button>

                {/* Apple Music Launch Button */}
                <button
                  type="button"
                  id="modal-launch-apple-music-btn"
                  onClick={() => openAppleMusic(activePlaylist.appleMusicUrl)}
                  className="py-3 px-4 rounded-xl bg-[#FA243C] hover:bg-[#ff3b50] text-white font-black text-sm uppercase italic flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,36,60,0.4)] active:scale-95 transition-all cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.01.62-2.65 1.37-.56.65-1.04 1.7-0.91 2.72 1.03.08 2.04-.51 2.64-1.24z"/>
                  </svg>
                  Apple Music <ExternalLink size={14} />
                </button>
              </div>

              {/* Embedded Player Toggle Button */}
              <button
                type="button"
                id="toggle-spotify-embed-btn"
                onClick={() => setShowEmbedPlayer(!showEmbedPlayer)}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-xs font-bold text-cyan-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Radio size={14} />
                {showEmbedPlayer ? 'Nascondi Mini-Player In-App' : 'Mostra Mini-Player In-App Spotify'}
                {showEmbedPlayer ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {/* Embedded Spotify Widget (in Modal) */}
            {showEmbedPlayer && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-fuchsia-500/40 shadow-xl animate-in fade-in duration-200">
                <iframe
                  title={`Spotify Player - ${activePlaylist.name}`}
                  src={`https://open.spotify.com/embed/playlist/${activePlaylist.spotifyPlaylistId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="bg-black"
                ></iframe>
              </div>
            )}

            {/* Curated HIIT Playlists List */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase italic tracking-wider text-white flex items-center gap-2">
                  <Zap size={16} className="text-fuchsia-400" /> Scegli Playlist Curata ({CURATED_PLAYLISTS.length})
                </h3>
                <span className="text-[9px] uppercase font-bold text-zinc-500">HIIT / Tabata / Beast Mode</span>
              </div>

              <div className="space-y-2.5">
                {CURATED_PLAYLISTS.map((playlist) => {
                  const isSelected = playlist.id === selectedPlaylistId;
                  return (
                    <div
                      key={playlist.id}
                      id={`playlist-item-${playlist.id}`}
                      onClick={() => onSelectPlaylist(playlist)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col gap-2 ${
                        isSelected 
                          ? 'bg-zinc-900/90 border-fuchsia-500 shadow-[0_0_20px_rgba(255,0,255,0.2)]' 
                          : 'bg-zinc-950/50 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow"
                            style={{ background: playlist.coverGradient }}
                          >
                            <Music size={20} className="text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-black uppercase italic tracking-tight text-white">
                                {playlist.name}
                              </h4>
                              {isSelected && (
                                <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-fuchsia-500 text-white animate-pulse">
                                  ATTIVA
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                              {playlist.genre} • <span className="text-fuchsia-400">{playlist.bpm}</span>
                            </p>
                          </div>
                        </div>

                        {/* Direct App Launch Badges */}
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => openSpotify(playlist.spotifyUrl)}
                            title="Apri su Spotify"
                            className="p-2 rounded-lg bg-[#1DB954]/20 border border-[#1DB954]/30 hover:bg-[#1DB954] hover:text-black text-[#1DB954] transition-all cursor-pointer active:scale-90"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.306c-.216.355-.678.47-1.033.254-2.83-1.728-6.393-2.12-10.592-1.16-.407.093-.815-.164-.908-.57-.093-.408.163-.816.57-.909 4.606-1.053 8.563-.604 11.71 1.352.355.216.47.678.253 1.033zm1.474-3.276c-.272.443-.853.585-1.296.313-3.24-1.99-8.18-2.567-12.012-1.403-.497.152-1.025-.133-1.176-.63-.152-.498.133-1.026.63-1.177 4.385-1.332 9.827-.688 13.541 1.599.443.272.585.854.313 1.298zm.129-3.41c-3.885-2.307-10.29-2.52-14.004-1.393-.595.18-1.226-.162-1.407-.757-.18-.595.163-1.226.758-1.407 4.27-1.296 11.34-1.047 15.808 1.606.535.318.708 1.01.39 1.545-.318.536-1.01.71-1.545.392z"/>
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => openAppleMusic(playlist.appleMusicUrl)}
                            title="Apri su Apple Music"
                            className="p-2 rounded-lg bg-[#FA243C]/20 border border-[#FA243C]/30 hover:bg-[#FA243C] hover:text-white text-[#FA243C] transition-all cursor-pointer active:scale-90"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.01.62-2.65 1.37-.56.65-1.04 1.7-0.91 2.72 1.03.08 2.04-.51 2.64-1.24z"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-400 font-medium">
                        {playlist.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3-Beep Interval Signal & Rep Tempo Beat Pacer Tool */}
            <div className="mt-6 p-4 rounded-2xl bg-zinc-950/70 border border-white/10 space-y-4">
              {/* 3-Beeps Interval Transition Signal */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-fuchsia-500/20 text-fuchsia-400">
                    <Volume2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase italic tracking-wider text-white flex items-center gap-1.5">
                      3 Beep Fine Intervallo <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">3s • 2s • 1s</span>
                    </h4>
                    <p className="text-[10px] text-zinc-400">Avviso acustico a 3 toni prima del cambio timer</p>
                  </div>
                </div>

                <button
                  type="button"
                  id="test-three-beeps-btn"
                  onClick={() => workoutAudio.playThreeConsecutiveBeeps()}
                  className="px-3 py-1.5 rounded-xl bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-300 font-black text-xs uppercase italic border border-fuchsia-500/40 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,0,255,0.2)]"
                  title="Testa i 3 Beep"
                >
                  <Play size={12} /> Prova 3 Beep
                </button>
              </div>

              {/* Rep Pacer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-cyan-400" />
                  <div>
                    <h4 className="text-xs font-black uppercase italic tracking-wider text-white">
                      BPM Rep Pacer (Metronomo Elettro)
                    </h4>
                    <p className="text-[10px] text-zinc-500">Audio click per sincronizzare ritmo rep & cadenza</p>
                  </div>
                </div>

                <button
                  type="button"
                  id="toggle-bpm-pacer-btn"
                  onClick={handleTogglePacer}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs uppercase italic flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPacerActive 
                      ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]' 
                      : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                  }`}
                >
                  {isPacerActive ? <Pause size={12} /> : <Play size={12} />}
                  {isPacerActive ? 'Pacer Attivo' : 'Avvia Pacer'}
                </button>
              </div>

              <div className="flex gap-2">
                {[140, 150, 160, 175].map((bpm) => (
                  <button
                    key={bpm}
                    type="button"
                    onClick={() => handleBpmChange(bpm)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      pacerBpm === bpm 
                        ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white shadow' 
                        : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {bpm} BPM
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Bottom Close */}
            <div className="mt-6">
              <button
                type="button"
                id="modal-done-btn"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-black text-base uppercase italic tracking-wider shadow-[0_0_30px_rgba(255,0,255,0.3)] active:scale-95 transition-transform cursor-pointer"
              >
                Torna al Workout Timer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
