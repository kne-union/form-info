import { useIsMobile } from '@kne/responsive-utils';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

/**
 * Steps 方向：
 * - 未指定：桌面横排，放不下自动竖排；移动端竖排
 * - orientation/direction = vertical：强制竖排
 * - orientation/direction = horizontal：强制横排（含移动端，不自动切换）
 */
const useStepsOrientation = ({ direction, orientation, items }) => {
  const isMobile = useIsMobile();
  const preferred = direction || orientation;
  const forceHorizontal = preferred === 'horizontal';
  const forceVertical = preferred === 'vertical';
  const auto = !forceHorizontal && !forceVertical;

  const [overflowVertical, setOverflowVertical] = useState(false);
  const containerRef = useRef(null);
  const stepsRef = useRef(null);
  const minWidthRef = useRef(0);

  const itemsKey = useMemo(() => (items || []).map(item => `${item?.key ?? ''}\0${item?.id ?? ''}\0${typeof item?.title === 'string' ? item.title : ''}`).join('\n'), [items]);

  useLayoutEffect(() => {
    if (!auto) {
      minWidthRef.current = 0;
      setOverflowVertical(false);
      return undefined;
    }
    minWidthRef.current = 0;
    setOverflowVertical(false);
    return undefined;
  }, [auto, itemsKey]);

  useLayoutEffect(() => {
    if (!auto || isMobile) {
      return undefined;
    }

    const container = containerRef.current;
    const steps = stepsRef.current;
    if (!container || !steps) {
      return undefined;
    }

    const readIntrinsicWidth = () => {
      const inner = steps.querySelector?.('.ant-steps') || steps;
      const targets = inner === steps ? [steps] : [steps, inner];
      const prev = targets.map(el => ({ max: el.style.maxWidth, width: el.style.width }));
      targets.forEach(el => {
        el.style.maxWidth = 'none';
        el.style.width = 'max-content';
      });
      const sw = Math.ceil(inner.scrollWidth || inner.offsetWidth || 0);
      targets.forEach((el, i) => {
        el.style.maxWidth = prev[i].max;
        el.style.width = prev[i].width;
      });
      return sw;
    };

    const measure = () => {
      const cw = container.clientWidth;
      if (!overflowVertical) {
        const sw = readIntrinsicWidth();
        if (sw > 0) {
          minWidthRef.current = sw;
        }
        setOverflowVertical(sw > cw + 1);
        return;
      }
      if (minWidthRef.current > 0 && cw >= minWidthRef.current) {
        setOverflowVertical(false);
      }
    };

    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(container);
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [auto, isMobile, overflowVertical, itemsKey]);

  const stepsOrientation = (() => {
    if (forceHorizontal) {
      return 'horizontal';
    }
    if (forceVertical || isMobile || overflowVertical) {
      return 'vertical';
    }
    return 'horizontal';
  })();

  return {
    stepsOrientation,
    isVerticalSteps: stepsOrientation === 'vertical',
    overflowVertical: auto && overflowVertical,
    containerRef,
    stepsRef
  };
};

export default useStepsOrientation;
