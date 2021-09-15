import { useEffect } from 'react';
export default function useMount(onMount) {
  useEffect(() => {
    onMount && onMount();
  }, []);
}
