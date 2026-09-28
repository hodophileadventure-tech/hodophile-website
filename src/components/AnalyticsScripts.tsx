"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { trackPageView } from "@/lib/analytics";

export function AnalyticsScripts({
  gaTrackingId,
  facebookPixelId,
}: {
  gaTrackingId?: string;
  facebookPixelId?: string;
}) {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (gaTrackingId) {
      const gaScript = document.createElement("script");
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaInline = document.createElement("script");
      gaInline.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaTrackingId}', { send_page_view: false });`;
      document.head.appendChild(gaInline);

      return () => {
        document.head.removeChild(gaScript);
        document.head.removeChild(gaInline);
      };
    }

    return undefined;
  }, [gaTrackingId]);

  useEffect(() => {
    if (facebookPixelId) {
      const fbInline = document.createElement("script");
      fbInline.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '${facebookPixelId}');`;
      document.head.appendChild(fbInline);

      return () => {
        document.head.removeChild(fbInline);
      };
    }

    return undefined;
  }, [facebookPixelId]);

  useEffect(() => {
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
