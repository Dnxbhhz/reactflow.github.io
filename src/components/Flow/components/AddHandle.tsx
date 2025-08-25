import SvgIcon from '@/components/SvgIcon';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from './PortalToFollowElemContent';

const AddHandle = () => {
  const [open, setOpen] = useState(false);
  return (
    <Handle type='source' position={Position.Right}>
      <PortalToFollowElem
        open={open}
        onOpenChange={setOpen}
        placement='bottom-start'
        offset={6}
      >
        <PortalToFollowElemTrigger asChild>
          <SvgIcon
            className='absolute cursor-pointer translate-x-[-30%] translate-y-[-40%]'
            iconName='add'
            fill='white'
            size={16}
            onClick={() => setOpen(v => !v)}
          />
        </PortalToFollowElemTrigger>

        <PortalToFollowElemContent className='rounded border bg-white shadow p-2'>
          <ul onClick={() => setOpen(false)}>
            <li className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>
              开始1
            </li>
            <li className='px-3 py-1 hover:bg-gray-100 cursor-pointer'>
              结束2
            </li>
          </ul>
        </PortalToFollowElemContent>
      </PortalToFollowElem>
    </Handle>
  );
};

export default AddHandle;
