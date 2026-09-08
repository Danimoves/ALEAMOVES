export type AnalyticsConsent = 'granted' | 'denied';

const CONSENT_KEY = 'aleamoves_analytics_consent';
const SCRIPT_ID = 'aleamoves-google-analytics';
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const getAnalyticsConsent = (): AnalyticsConsent | null => {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
};

export const initializeAnalytics = (): boolean => {
  if (
    typeof window === 'undefined' ||
    !measurementId ||
    getAnalyticsConsent() !== 'granted'
  ) {
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      anonymize_ip: true,
    });
  }

  return true;
};

export const setAnalyticsConsent = (consent: AnalyticsConsent): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CONSENT_KEY, consent);
  if (consent === 'granted') initializeAnalytics();
};

export const trackEvent = (
  name: string,
  parameters: Record<string, string | number | boolean> = {},
): void => {
  if (!initializeAnalytics()) return;
  window.gtag?.('event', name, parameters);
};

