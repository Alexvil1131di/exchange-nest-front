import { useEffect } from 'react';

type EventCallback = (event: Event) => void;

function useEventListener(eventName: string, callback: EventCallback, element: Document | Window = window) {
    if (typeof element !== "undefined") {
        useEffect(() => {
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            element.addEventListener(eventName, callback);

            return () => {
                element.removeEventListener(eventName, callback);
            };
        }, [eventName, callback, element]);
    }
}

export default useEventListener;
