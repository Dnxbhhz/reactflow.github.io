import SvgIcon from '@/components/SvgIcon';
import { useNodeId, useReactFlow } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { getPosition } from '../utils/node';
const AddMenu = ({
  handleAddNode,
  op = 'click',
}: {
  handleAddNode?: (_type?: string, _at?: { x: number; y: number }) => void;
  op?: string;
}) => {
  const rf = useReactFlow();
  const nodeId = useNodeId();
  const addNode = (e: React.MouseEvent, type: string) => {
    if (op === 'drag') {
      handleAddNode?.(type, { x: e.clientX, y: e.clientY });
    } else {
      const id = nanoid();
      rf.addNodes({
        id,
        type,
        position: getPosition(rf, nodeId ?? ''),
        data: { label: type },
      });
      rf.addEdges([{ id, source: nodeId ?? '', target: id }]);
      handleAddNode?.();
    }
  };

  return (
    <ul className='w-3xs py-1 text-sm'>
      <li
        className='px-3 py-1 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'
        onClick={e => addNode(e, 'Begin')}
      >
        <SvgIcon iconName='start' fill='none' />
        开始
      </li>
      <li className='px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'>
        <SvgIcon iconName='end' fill='none' />
        结束
      </li>
    </ul>
  );
};

export default AddMenu;
