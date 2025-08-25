import SvgIcon from '@/components/SvgIcon';
import type { UseContextMenuResult } from '@/hooks/useContextMenu';
import { FloatingPortal } from '@floating-ui/react';

type RightKeyMenuProps = Pick<
  UseContextMenuResult,
  'refs' | 'floatingStyles' | 'getFloatingProps' | 'setOpen'
> & {
  subMenuCtx: UseContextMenuResult;
};

const RightKeyMenu = ({
  refs,
  floatingStyles,
  getFloatingProps,
  setOpen,
  subMenuCtx,
}: RightKeyMenuProps) => {
  return (
    <>
      <FloatingPortal>
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className='z-50 rounded-md bg-white shadow'
        >
          <ul onClick={() => setOpen(false)} className='w-3xs  py-1 text-sm'>
            <li
              className='px-3 py-1 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'
              onContextMenu={e => {
                e.preventDefault();
                e.stopPropagation(); // 避免冒泡到外层的 menuCtx
                subMenuCtx.onContextMenu(e); // 在鼠标位置打开子菜单
              }}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                subMenuCtx.openAtPoint(e.clientX, e.clientY); // 使用点击时的坐标定位
                setOpen(false); // 关闭主菜单
              }}
            >
              <SvgIcon iconName='add' fill='none' />
              添加节点
            </li>
            <li className='px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'>
              <SvgIcon iconName='end' fill='none' />
              粘贴
            </li>
          </ul>
        </div>
      </FloatingPortal>
    </>
  );
};

export default RightKeyMenu;
