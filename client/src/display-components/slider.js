import React, { Component } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import styled from "styled-components";
import "rc-slider/assets/index.css";

export default class QualitySlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.number
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.number
    });
  }

  onSliderChange = value => {
    this.setState({
      value: value
    });
    this.props.onValueChange(value, this.props.quality);
  };
  render() {
    const { number, quality } = this.props;
    return (
      <div>
        <h3>{quality}</h3>
        <StyledSlider
          value={number}
          min={0}
          max={100}
          marks={{
            0: "0",
            25: "25",
            50: "50",
            75: "75",
            100: "100"
          }}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

const StyledSlider = styled(SliderWithTooltip)`
  width: 800px;
  margin: 0 auto;
`;
