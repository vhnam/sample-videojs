import {useState, useCallback, useMemo} from 'react';

function useToggle(init) {
  const [active, setStateActive] = useState(init !== undefined ? init : false);

  const setActive = useCallback(() => {
    setStateActive(true);
  }, []);

  const setInActive = useCallback(() => {
    setStateActive(false);
  }, []);

  const toggle = useCallback(
    (state) => {
      setStateActive(typeof state === 'boolean' ? state : !active);
    },
    [active],
  );

  return useMemo(() => {
    return {
      active,
      setActive,
      setInActive,
      toggle,
    };
  }, [active, setActive, setInActive, toggle]);
}

export default useToggle;
