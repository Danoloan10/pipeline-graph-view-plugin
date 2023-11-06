import * as React from "react";

import { nodeStrokeWidth } from "../support/StatusIcons";
import {
  LayoutInfo,
  NodeInfo,
} from "../PipelineGraphModel";

import { connectorKey } from "./util"

interface Props {
  sourceNode: NodeInfo;
  destinationNode: NodeInfo;
  layout: LayoutInfo;
  className: string;
}

export class HorizontalConnection extends React.Component {
  props!: Props;

  /**
   * Simple straight connection.
   */
  render() {
    const { sourceNode, destinationNode } = this.props;

    const { nodeRadius, terminalRadius } = this.props.layout;
    const leftNodeRadius = sourceNode.isPlaceholder ? terminalRadius : nodeRadius;
    const rightNodeRadius = destinationNode.isPlaceholder
      ? terminalRadius
      : nodeRadius;

    const key = connectorKey(sourceNode, destinationNode);

    const x1 = sourceNode.x + leftNodeRadius - nodeStrokeWidth / 2;
    const x2 = destinationNode.x - rightNodeRadius + nodeStrokeWidth / 2;
    const y = sourceNode.y;
    
    const connectorStroke = {
		strokeWidth: this.props.layout.connectorStrokeWidth,
		className: this.props.className,
	}
    
    return <line {...connectorStroke} key={key} x1={x1} y1={y} x2={x2} y2={y} />;
  }
}
