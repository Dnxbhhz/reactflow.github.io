import SvgIcon from '@/components/SvgIcon';
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import AddMenu from './AddMenu';
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
          <AddMenu
            handleAddNode={() => {
              setOpen(false);
            }}
            op='click'
          />
        </PortalToFollowElemContent>
      </PortalToFollowElem>
    </Handle>
  );
};

export default AddHandle;
