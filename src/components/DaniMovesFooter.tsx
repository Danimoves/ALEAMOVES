import React from 'react';
import { Instagram, Youtube, Send, Globe, ShieldAlert } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

// Configure only with verified official DaniMoves URLs. Empty values remain safely disabled.
export const SOCIAL_LINKS = {
  website: 'https://www.danimoves.com',
  instagram: 'https://www.instagram.com/danimoves76?igsi=bm11eXBnd2Y4aGhu',
  youtube: 'https://youtube.com/@danimoves768?si=anAxbWMWhTYsWB-O',
  telegram: 'https://t.me/DANIMOVES'
};

interface DaniMovesFooterProps { lang: Language; onOpenSafety: () => void; }

export const DaniMovesFooter: React.FC<DaniMovesFooterProps> = ({ lang, onOpenSafety }) => {
  const t = TRANSLATIONS[lang];
  const links = [
    { key: 'youtube', label: 'DaniMoves YouTube', Icon: Youtube },
    { key: 'instagram', label: 'DaniMoves Instagram', Icon: Instagram },
    { key: 'telegram', label: 'DaniMoves Telegram', Icon: Send },
    { key: 'website', label: 'DaniMoves Website', Icon: Globe }
  ] as const;

  return (
    <footer className="w-full max-w-md mx-auto px-6 mt-8 mb-4 text-center space-y-4">
      <button type="button" onClick={onOpenSafety} className="w-full p-3.5 rounded-2xl bg-orange-950/20 border border-orange-500/30 hover:border-orange-500/60 transition-all flex items-center justify-between gap-3 text-left cursor-pointer group active:scale-98">
        <div className="flex items-center gap-2.5">
          <ShieldAlert size={18} className="text-orange-400 shrink-0" />
          <p className="text-[11px] font-semibold text-zinc-300 leading-snug">{t.safetyBanner}</p>
        </div>
        <span className="text-[10px] font-black uppercase text-orange-400 underline shrink-0">Info</span>
      </button>
      <div className="p-4 rounded-2xl bg-zinc-900/30 border border-white/5 space-y-3">
        <div className="text-xs font-black uppercase italic tracking-wider text-zinc-400">{t.brandFooter}</div>
        <div className="flex items-center justify-center gap-3">
          {links.map(({ key, label, Icon }) => {
            const url = SOCIAL_LINKS[key];
            return url ? (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300" title={label} aria-label={label}><Icon size={16} /></a>
            ) : (
              <button key={key} type="button" disabled className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-600 cursor-not-allowed opacity-60" title={lang === 'it' ? 'Da configurare' : 'Coming soon'} aria-label={label + ': ' + (lang === 'it' ? 'Da configurare' : 'Coming soon')}><Icon size={16} /></button>
            );
          })}
        </div>
        <p className="text-[9px] text-zinc-600 uppercase font-bold">{lang === 'it' ? 'Canali ufficiali DaniMoves' : 'Official DaniMoves channels'}</p>
      </div>
    </footer>
  );
};
