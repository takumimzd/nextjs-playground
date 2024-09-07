import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TreeNode } from '../utils/markdownToTree';

interface MindMapProps {
  data: TreeNode[];
}

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const splitText = (text: string, maxLength: number) => {
    const words = text.split(' ');
    let line = '';
    const lines: string[] = [];

    words.forEach((word) => {
      if ((line + word).length > maxLength) {
        lines.push(line.trim());
        line = word + ' ';
      } else {
        line += word + ' ';
      }
    });

    if (line) lines.push(line.trim());
    return lines;
  };

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);
      svg.selectAll('*').remove(); // Clear previous content

      const margin = { top: 20, right: 120, bottom: 20, left: 120 };

      // Create hierarchies for each root node
      const roots = data.map((node) => d3.hierarchy(node));

      // Apply tree layout
      const treeLayout = d3.tree<TreeNode>().nodeSize([100, 200]);
      roots.forEach((root) => treeLayout(root));

      // Group for nodes
      const nodeGroup = svg.append('g');

      const nodes = nodeGroup
        .selectAll('g')
        .data(roots.flatMap((root) => root.descendants()))
        .join('g')
        .attr(
          'transform',
          (d) => `translate(${(d.y as number) + margin.left},${(d.x as number) + margin.top})`,
        );

      // Add circles for nodes
      nodes.append('circle').attr('r', 5).attr('fill', '#555');

      // Measure text width and adjust background rect and links accordingly
      nodes.each(function (d) {
        const node = d3.select(this);
        const lines = splitText(d.data.name, 20);

        // Temporarily render text to measure width
        const textElement = node
          .append('text')
          .attr('x', 0)
          .attr('dy', '0.35em')
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .style('visibility', 'hidden') // Hide the text initially
          .selectAll('tspan')
          .data(lines)
          .join('tspan')
          .attr('x', 0)
          .attr('dy', (_, i) => (i === 0 ? '0.35em' : '1.2em')) // Adjust line height and vertical centering
          .text((line) => line);

        // Measure the text width after rendering
        const textWidth = textElement.nodes().reduce((maxWidth, tspan) => {
          const tspanWidth = (tspan as SVGTextContentElement).getComputedTextLength();
          return Math.max(maxWidth, tspanWidth);
        }, 0);

        const textHeight = lines.length * 16 + 10; // Calculate height based on number of lines

        // Add background rect based on measured text width
        node
          .insert('rect', 'text')
          .attr('x', -textWidth / 2 - 10)
          .attr('y', -textHeight / 2) // Center the rect vertically
          .attr('rx', 8)
          .attr('ry', 8)
          .attr('width', textWidth + 20) // Add padding
          .attr('height', textHeight)
          .attr('fill', '#333');

        // Make the text visible after measuring
        node.select('text').style('visibility', 'visible');
      });

      // Group for links
      svg
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-width', 2)
        .selectAll('path')
        .data(roots.flatMap((root) => root.links()))
        .join('path')
        .attr('d', (d) => {
          const sourceX = (d.source.x as number) + margin.top;
          const sourceY = (d.source.y as number) + margin.left;
          const targetX = (d.target.x as number) + margin.top;
          const targetY = (d.target.y as number) + margin.left;

          // Find the corresponding target node element
          const targetNode = nodes
            .filter((nodeData) => nodeData === d.target)
            .node() as SVGGElement;
          const targetRect = targetNode.querySelector('rect');
          const rectWidth = targetRect ? targetRect.getAttribute('width') || 0 : 0;
          const rectWidthNumber = parseFloat(rectWidth as string);

          return `
            M${sourceY},${sourceX}
            V${targetX}
            H${targetY - rectWidthNumber / 2} 
          `;
        });

      // Update SVG width and height based on node positions
      const maxX =
        d3.max(
          roots.flatMap((root) => root.descendants()),
          (d) => d.x,
        ) || 0;
      const maxY =
        d3.max(
          roots.flatMap((root) => root.descendants()),
          (d) => d.y,
        ) || 0;

      setDimensions({
        width: maxY + margin.left + margin.right,
        height: maxX + margin.top + margin.bottom,
      });
    }
  }, [data]);

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      {' '}
      {/* Enable horizontal scrolling */}
      <svg ref={ref} width={3000} height={1000} />
    </div>
  );
};

export default MindMap;
