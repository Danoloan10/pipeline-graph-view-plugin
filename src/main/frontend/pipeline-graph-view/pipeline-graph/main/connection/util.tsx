import { NodeInfo } from "../PipelineGraphModel";

/**
 * Generates an SVG path string for the "vertical" S curve used to connect nodes in adjacent columns.
 */
export function svgBranchCurve(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	midPointX: number,
	curveRadius: number
) {
	const verticalDirection = Math.sign(y2 - y1); // 1 == curve down, -1 == curve up
	const w1 = midPointX - curveRadius - x1 + curveRadius * verticalDirection;
	const w2 = x2 - curveRadius - midPointX - curveRadius * verticalDirection;
	const v = y2 - y1 - 2 * curveRadius * verticalDirection; // Will be -ive if curve up
	const cv = verticalDirection * curveRadius;

	return (
		` l ${w1} 0` + // first horizontal line
		` c ${curveRadius} 0 ${curveRadius} ${cv} ${curveRadius} ${cv}` + // turn
		` l 0 ${v}` + // vertical line
		` c 0 ${cv} ${curveRadius} ${cv} ${curveRadius} ${cv}` + // turn again
		` l ${w2} 0` // second horizontal line
	);
}

// Generate a react key for a connection
export function connectorKey(leftNode: NodeInfo, rightNode: NodeInfo) {
  return "c_" + leftNode.key + "_to_" + rightNode.key;
}