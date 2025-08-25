import { Handle, Position } from '@xyflow/react';
import AddHandle from '../AddHandle';
import BaseNode from '../BaseNode';

const Begin = () => {
  const onConnect = params => console.log('handle onConnect', params);
  return (
    <BaseNode>
      <Handle type='target' position={Position.Left} onConnect={onConnect} />
      <div>开始</div>
      <AddHandle />
    </BaseNode>
  );
};

export default Begin;
