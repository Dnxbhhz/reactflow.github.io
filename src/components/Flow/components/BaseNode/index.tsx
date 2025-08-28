import SvgIcon from '@/components/SvgIcon';
import { type NodeProps, NodeResizeControl, useReactFlow } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { type ReactNode, memo } from 'react';

const BaseNode = ({
  children,
  resizeControl = true,
  ...props
}: {
  children: ReactNode;
  resizeControl?: boolean;
} & NodeProps) => {
  const getPreviewFlag = (data: unknown): boolean => {
    if (
      data &&
      typeof data === 'object' &&
      'preview' in (data as Record<string, unknown>)
    ) {
      const v = (data as { preview?: unknown }).preview;
      return typeof v === 'boolean' ? v : false;
    }
    return false;
  };
  const rf = useReactFlow();
  const handleDelete = () => {
    rf.setEdges(es =>
      es.filter(e => e.source !== props.id && e.target !== props.id)
    );
    rf.setNodes(ns => ns.filter(n => n.id !== props.id));
  };

  const handleCopy = () => {
    const node = rf.getNodes().find(n => n.id === props.id);
    if (node) {
      rf.addNodes([
        {
          ...node,
          position: { x: node.position.x + 100, y: node.position.y + 100 },
          id: nanoid(),
          selected: false,
        },
      ]);
    }
  };

  return (
    <div
      className={
        'h-full w-full border-2 border-gray-300 rounded-md p-2 relative bg-white ' +
        (props.selected ? 'ring-2 ring-blue-500' : '')
      }
    >
      {props.selected && !getPreviewFlag(props.data) && (
        <div className='absolute -top-6.5 right-0 ml-1 z-10 bg-white border border-gray-300 rounded px-1 py-0.5 shadow-sm flex flex-row gap-1'>
          <SvgIcon
            iconName='copy'
            className='cursor-pointer'
            fill='none'
            size={14}
            onClick={handleCopy}
          />
          <SvgIcon
            iconName='delete'
            fill='none'
            className='cursor-pointer'
            size={14}
            color='red'
            onClick={handleDelete}
          />
        </div>
      )}
      {resizeControl && (
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
