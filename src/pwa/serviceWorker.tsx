import { useCallback, useEffect } from "preact/hooks";
import { useRegisterSW } from "virtual:pwa-register/react";

const ServiceWorker = () => {
  const {
    offlineReady: [, setOfflineReady],
    needRefresh: [, setNeedRefresh],
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, []);

  useEffect(() => {
    // optional logging
  }, []);

  return null;
};

export default ServiceWorker;
