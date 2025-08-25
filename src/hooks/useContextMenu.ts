import {
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  type UseFloatingReturn,
} from '@floating-ui/react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

export type UseContextMenuOptions = {
  offset?: number;
};

export type UseContextMenuResult = {
  open: boolean;
  setOpen: (open: boolean) => void;
  refs: UseFloatingReturn['refs'];
  floatingStyles: CSSProperties;
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps'];
  onContextMenu: (
    event: MouseEvent | ReactMouseEvent<Element, MouseEvent>
  ) => void;
  openAtPoint: (x: number, y: number) => void;
  onClickOpen: (event: ReactMouseEvent<Element, MouseEvent>) => void;
  openForElement: (el: Element) => void;
};

export function useContextMenu(
  options?: UseContextMenuOptions
): UseContextMenuResult {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    strategy: 'fixed',
    middleware: [offset(options?.offset ?? 4), flip(), shift()],
  });

  const dismiss = useDismiss(context, { outsidePress: true, escapeKey: true });
  const role = useRole(context, { role: 'menu' });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  const openAtPoint = useCallback(
    (x: number, y: number) => {
      // 使用虚拟元素将菜单定位到鼠标位置
      refs.setReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x,
            y,
            top: y,
            left: x,
            right: x,
            bottom: y,
          } as DOMRect;
        },
      } as unknown as Element);
      setOpen(true);
    },
    [refs]
  );

  const onContextMenu = useCallback(
    (event: MouseEvent | ReactMouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      openAtPoint((event as MouseEvent).clientX, (event as MouseEvent).clientY);
    },
    [openAtPoint]
  );

  const openForElement = useCallback(
    (el: Element) => {
      refs.setReference(el as Element);
      setOpen(true);
    },
    [refs]
  );

  const onClickOpen = useCallback(
    (event: ReactMouseEvent<Element, MouseEvent>) => {
      openForElement(event.currentTarget as Element);
    },
    [openForElement]
  );

  return useMemo(
    () => ({
      open,
      setOpen,
      refs,
      floatingStyles,
      getFloatingProps,
      onContextMenu,
      openAtPoint,
      onClickOpen,
      openForElement,
    }),
    [
      open,
      refs,
      floatingStyles,
      getFloatingProps,
      onContextMenu,
      openAtPoint,
      onClickOpen,
      openForElement,
    ]
  );
}

export default useContextMenu;
