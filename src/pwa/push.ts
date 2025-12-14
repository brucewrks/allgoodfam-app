/// <reference lib='webworker' />

import { registerRoute, NavigationRoute } from 'workbox-routing';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';

// This is injected by vite-plugin-pwa at build time
declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: any;
};

precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL('/index.html');
registerRoute(new NavigationRoute(handler));

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// ---------------- PUSH HANDLING ----------------

self.addEventListener('push', (event) => {
  event.waitUntil(
    self.registration.showNotification('AllGoodFam', {
      body: 'Someone may have missed their check-in. Tap to view.',
      icon: '/web-app-manifest-192x192.png',
      badge: '/apple-touch-icon.png',
      data: { url: '/app' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/app';

  event.waitUntil(
    (async () => {
      const clientsArr = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });

      for (const client of clientsArr) {
        if ('focus' in client) {
          await client.focus();
          client.navigate(url);
          return;
        }
      }

      await self.clients.openWindow(url);
    })()
  );
});
