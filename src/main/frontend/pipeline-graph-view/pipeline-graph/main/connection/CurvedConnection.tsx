import * as React from "react";

import { nodeStrokeWidth } from "../support/StatusIcons";
import {
  LayoutInfo,
  NodeInfo,
} from "../PipelineGraphModel";

import { svgBranchCurve, connectorKey } from "./util";

interface Props {
  sourceNode: NodeInfo;
  destinationNode: NodeInfo;
  midPointX: number;
  layout: LayoutInfo;
  className: string;
}

export class CurvedConnection extends React.Component {
  props!: Props;
  
  /**
   * A direct curve between two nodes in adjacent columns.
   */
  render() {
    const { sourceNode, destinationNode, midPointX } = this.props;
    const { nodeRadius, terminalRadius, curveRadius, connectorStrokeWidth } =
      this.props.layout;
    const leftNodeRadius = sourceNode.isPlaceholder ? terminalRadius : nodeRadius;
    const rightNodeRadius = destinationNode.isPlaceholder
      ? terminalRadius
      : nodeRadius;

    const key = connectorKey(sourceNode, destinationNode);

    const leftPos = {
      x: sourceNode.x + leftNodeRadius - nodeStrokeWidth / 2,
      y: sourceNode.y,
    };

    const rightPos = {
      x: destinationNode.x - rightNodeRadius + nodeStrokeWidth / 2,
      y: destinationNode.y,
    };

    // Stroke props common to straight / curved connections
    const connectorStroke = {
      className: this.props.className,
      strokeWidth: connectorStrokeWidth,
    };

    const pathData =
      `M ${leftPos.x} ${leftPos.y}` +
      svgBranchCurve(
        leftPos.x,
        leftPos.y,
        rightPos.x,
        rightPos.y,
        midPointX,
        curveRadius
      );

      return <path {...connectorStroke} key={key} d={pathData} fill="none" />;
  }
}
