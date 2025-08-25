import React from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type { OffsetOptions, Placement } from '@floating-ui/react';

export type PortalToFollowElemOptions = {
  placement?: Placement;
  open?: boolean;
  offset?: number | OffsetOptions;
  onOpenChange?: (open: boolean) => void;
  triggerPopupSameWidth?: boolean;
};

export function usePortalToFollowElem({
  placement = 'bottom',
  open,
  offset: offsetValue = 0,
  onOpenChange: setControlledOpen,
  triggerPopupSameWidth,
}: PortalToFollowElemOptions = {}) {
  const setOpen = setControlledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 5 }),
      size({
        apply({ rects, elements }) {
          if (triggerPopupSameWidth)
            elements.floating.style.width = `${rects.reference.width}px`;
        },
      }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, { move: false, enabled: open == null });
  const focus = useFocus(context, { enabled: open == null });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  );
}

type ContextType = ReturnType<typeof usePortalToFollowElem> | null;

export const PortalToFollowElemContext = React.createContext<ContextType>(null);

export function usePortalToFollowElemContext() {
  const context = React.useContext(PortalToFollowElemContext);
  if (context == null)
    throw new Error(
      'PortalToFollowElem components must be wrapped in <PortalToFollowElem />'
    );
  return context;
}


