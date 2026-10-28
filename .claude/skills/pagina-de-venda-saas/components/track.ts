// Dispara eventos para GA4, Meta Pixel e PostHog, se estiverem carregados na página.
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, props?: Props) => void };
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, props);
  window.fbq?.("trackCustom", event, props);
  window.posthog?.capture(event, props);
}
