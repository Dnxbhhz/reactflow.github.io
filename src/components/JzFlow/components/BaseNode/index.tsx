import SvgIcon from '@/components/SvgIcon';
import { NodeResizeControl } from '@xyflow/react';
import { type ReactNode, memo } from 'react';

const BaseNode = ({
  children,
  esizeControl = true,
}: {
  children: ReactNode;
  esizeControl?: boolean;
}) => {
  return (
    <div className='h-full w-full border-2 border-gray-300 rounded-md p-2 relative bg-white'>
      {esizeControl && (
        <NodeResizeControl className='bg-transparent! border-none!'>
          <SvgIcon
            iconName='expand'
            className='absolute bottom-1 right-1'
            fill='none'
            color='gray'
            size={16}
          />
        </NodeResizeControl>
      )}
      {children}
    </div>
  );
};

export default memo(BaseNode);
