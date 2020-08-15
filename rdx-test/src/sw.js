import { clientsClaim, skipWaiting } from "workbox-core";
import { strategy as streamsStrategy } from "workbox-streams";
import { cleanupOutdatedCaches, matchPrecache, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

//The files are from '/dist' after they have been built as per rollup.config.js.
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(
  '/', streamsStrategy([() => matchPrecache("index.html")])
);

skipWaiting();
clientsClaim();
