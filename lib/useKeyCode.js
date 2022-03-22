import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useKeyCode } from '../components/KeyCodeProvider';
import { urlFriendly } from './urlFriendly';

export function useKeyWatcher() {
  // const [key, setKey] = useState();
  const { key, setKey, setEvents, events, setKeyHistory, keyHistory } =
    useKeyCode();
  const router = useRouter();
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      router.push(`/for/${urlFriendly(e.key)}`);
      const key = {
        key: e.key,
        keyCode: e.keyCode,
        which: e.which,
        code: e.code,
        location: e.location,
        // Meta Keys
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        repeat: e.repeat,
      };
      setKey(key);
      // setKeyHistory([key, ...keyHistory]);
      // this is bad, but making a copy didn't work for some reason
      events[key.keyCode] = key;
      setEvents(events);
    });

    return () => {
      // remove event listner
    };
  }, []);
  return {
    key,
    events,
  };
}
