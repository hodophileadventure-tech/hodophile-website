type AnalyticsValue = string | number | boolean | undefined;

type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", eventName, params);
  window.fbq?.("trackCustom", eventName, params);
  window.dataLayer?.push({ event: eventName, ...params });
}

export function trackPageView(pathname: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "page_view", { page_path: pathname });
  window.fbq?.("track", "PageView");
}
