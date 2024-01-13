import { useEffect } from 'react';

type EventCallback = (event: Event) => void;

function useEventListener(eventName: string, callback: EventCallback) {
    if (typeof document !== "undefined") {
        useEffect(() => {
            const isSupported = document && document.addEventListener;
            if (!isSupported) return;

            document.addEventListener(eventName, callback);

            return () => {
                document.removeEventListener(eventName, callback);
            };
        }, [eventName, callback, document]);
    }
}

export default useEventListener;
