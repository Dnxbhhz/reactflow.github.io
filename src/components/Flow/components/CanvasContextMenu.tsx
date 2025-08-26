import SvgIcon from '@/components/SvgIcon';
import { useState } from 'react';
import AddMenu from './AddMenu';
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from './PortalToFollowElemContent';

type Point = { x: number; y: number };

type CanvasContextMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchor: Point;
  handleAddNode: (type: string, at: { x: number; y: number }) => void;
};

const CanvasContextMenu = ({
  open,
  onOpenChange,
  anchor,
  handleAddNode,
}: CanvasContextMenuProps) => {
  const [subOpen, setSubOpen] = useState(false);

  return (
    <PortalToFollowElem
      open={open}
      onOpenChange={onOpenChange}
      placement='bottom-start'
      offset={6}
    >
      <PortalToFollowElemTrigger asChild>
        <div
          style={{
            position: 'fixed',
            left: anchor.x,
            top: anchor.y,
            width: 0,
            height: 0,
          }}
        />
      </PortalToFollowElemTrigger>

      <PortalToFollowElemContent className='rounded bg-white shadow p-2'>
        <ul onClick={() => onOpenChange(false)}>
          <li className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>
            <PortalToFollowElem
              open={subOpen}
              onOpenChange={setSubOpen}
              placement='right-start'
              offset={6}
            >
              <PortalToFollowElemTrigger asChild>
                <div
                  className='px-3 py-1 hover:bg-gray-100 cursor-pointer gap-1 flex items-center'
                  onClick={e => {
                    e.stopPropagation();
                    setSubOpen(v => !v);
                  }}
                >
                  <SvgIcon iconName='add' fill='none' size={16} />
                  添加节点
                </div>
              </PortalToFollowElemTrigger>

              <PortalToFollowElemContent className='rounded bg-white shadow p-2'>
                <AddMenu
                  handleAddNode={(...props) => {
                    handleAddNode(...props);
                    setSubOpen(false);
                  }}
                  op='drag'
                />
              </PortalToFollowElemContent>
            </PortalToFollowElem>
          </li>
          <li className='px-3 py-1 hover:bg-gray-100 cursor-pointer flex items-center justify-center'>
            结束
          </li>
        </ul>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  );
};

export default CanvasContextMenu;
