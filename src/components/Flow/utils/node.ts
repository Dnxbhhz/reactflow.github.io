import type { Edge, Node, ReactFlowInstance, XYPosition } from '@xyflow/react';

type Size = { width: number; height: number };

type NodeWithSize = Node & {
  width?: number;
  height?: number;
  measured?: {
    width?: number;
    height?: number;
  };
};

function getNodeSize(
  node: Node | undefined,
  fallback: Size = { width: 180, height: 40 }
): Size {
  if (!node) return fallback;
  const sized = node as NodeWithSize;
  const width = sized.measured?.width ?? sized.width ?? fallback.width;
  const height = sized.measured?.height ?? sized.height ?? fallback.height;
  return { width, height };
}

// 预留：广度优先收集所有下游节点（当前未使用）
// function collectDownstreamNodeIds(edges: Edge[], fromId: string): string[] {
//   const result: string[] = [];
//   const visited = new Set<string>();
//   const queue: string[] = [fromId];
//
//   while (queue.length) {
//     const current = queue.shift()!;
//     if (visited.has(current)) continue;
//     visited.add(current);
//
//     const outs = edges.filter(e => e.source === current);
//     for (const e of outs) {
//       if (!visited.has(e.target)) {
//         result.push(e.target);
//         queue.push(e.target);
//       }
//     }
//   }
//
//   return result;
// }

export function getPosition(
  rf: ReactFlowInstance<Node, Edge>,
  fromNodeId?: string,
  options?: { gapX?: number; gapY?: number; align?: 'left' | 'center' }
): XYPosition {
  const gapY = options?.gapY ?? 40;
  const gapX = options?.gapX ?? 40;
  const align = options?.align ?? 'left';

  if (!fromNodeId) {
    const viewport = rf.getViewport();
    return { x: -viewport.x + 100, y: -viewport.y + 100 };
  }

  const source = rf.getNode(fromNodeId);
  if (!source) {
    const viewport = rf.getViewport();
    return { x: -viewport.x + 100, y: -viewport.y + 100 };
  }

  const sourceSize = getNodeSize(source);
  const edges = rf.getEdges();
  const immediateChildren = edges
    .filter(e => e.source === fromNodeId)
    .map(e => e.target);

  if (immediateChildren.length === 0) {
    const x = source.position.x + sourceSize.width + gapX;
    const y = source.position.y;
    return { x, y };
  }

  let chosen = rf.getNode(immediateChildren[0]);
  let chosenSize = getNodeSize(chosen);
  let chosenBottom = (chosen?.position.y ?? 0) + chosenSize.height;

  for (const id of immediateChildren) {
    const n = rf.getNode(id);
    if (!n) continue;
    const size = getNodeSize(n);
    const bottom = n.position.y + size.height;
    if (bottom > chosenBottom) {
      chosen = n;
      chosenSize = size;
      chosenBottom = bottom;
    }
  }

  const baseX =
    align === 'center'
      ? (chosen?.position.x ?? source.position.x) + chosenSize.width / 2
      : (chosen?.position.x ?? source.position.x);

  return { x: baseX, y: chosenBottom + gapY };
}
