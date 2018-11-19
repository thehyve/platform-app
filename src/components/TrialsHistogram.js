import React, { Component } from 'react';
import * as d3 from 'd3';
import { withContentRect } from 'react-measure';

const margin = { top: 20, right: 20, bottom: 20, left: 30 };
const OUTER_HEIGHT = 180;

class TrialsHistogram extends Component {
  componentDidMount() {
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  render() {
    const { measureRef } = this.props;

    return (
      <div ref={measureRef}>
        <svg
          ref={node => (this.svgRef = node)}
          xmlns="http://www.w3.org/2000/svg"
          width={this._width()}
          height={OUTER_HEIGHT}
        >
          <g
            transform={`translate(${margin.left},${margin.top})`}
            fill="#7b196a"
          />
        </svg>
      </div>
    );
  }

  _width() {
    return this.props.contentRect.bounds.width;
  }

  _render() {
    const { trialsByPhase } = this.props;
    const outerWidth = this._width();

    if (!outerWidth) return;

    const width = outerWidth - margin.left - margin.right;
    const height = OUTER_HEIGHT - margin.top - margin.bottom;

    const countScale = d3
      .scaleLinear()
      .domain([0, d3.max(trialsByPhase, d => d.trialCount)])
      .range([height, 0]);

    const phaseScale = d3
      .scaleBand()
      .domain(trialsByPhase.map(d => d.phase))
      .range([0, width]);

    const svg = d3.select(this.svgRef);
    const plot = svg.select('g');

    plot
      .selectAll('rect')
      .data(trialsByPhase)
      .enter()
      .append('rect')
      .attr('x', d => phaseScale(d.phase))
      .attr('y', d => countScale(d.trialCount))
      .attr('height', d => countScale(0) - countScale(d.trialCount))
      .attr('width', phaseScale.bandwidth());

    const xAxis = d3.axisBottom(phaseScale);
    const yAxis = d3.axisLeft(countScale);

    plot
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    plot.append('g').call(yAxis);
  }
}

export default withContentRect('bounds')(TrialsHistogram);
