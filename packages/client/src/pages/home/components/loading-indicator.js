import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";

const LoadingIndicator = () => (
  <ScaleLoader
    css={cssOverride}
    sizeUnit={"px"}
    height={50}
    width={10}
    radius={5}
    color={"#57E5DE"}
  />
);

export default LoadingIndicator;

const cssOverride = css`
  display: block;
  margin: auto;
`;
