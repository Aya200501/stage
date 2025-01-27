import { BaseEdge, EdgeProps, getBezierPath } from "@xyflow/react";

export default function CustomEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge path={edgePath} {...props} />
    </>
  );
}
