import React, { Component } from "react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import styled from "styled-components";
import "rc-slider/assets/index.css";



export default class QualitySlider extends React.Component {
  onSliderChange = value => {
    this.props.onValueChange(value);
  };
  render() {
    return (
      <StyledSlider
        defaultValue={50}
        min={0}
        max={100}
        marks={{ 0: "0", 25: "25", 50: "50", 75: "75", 100: "100" }}
        onChange={this.onSliderChange}
      />
    );
  }
}



const SliderWithTooltip = createSliderWithTooltip(Slider);

const StyledSlider = styled(SliderWithTooltip)`
  width: 800px;
  margin: 0 auto;
`;
