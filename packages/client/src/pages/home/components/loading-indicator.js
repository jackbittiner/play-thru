import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";
import colours from "../../../common/colours";

const LoadingIndicator = () => (
  <ScaleLoader
    css={cssOverride}
    sizeUnit={"px"}
    height={50}
    width={10}
    radius={5}
    color={colours.turquoise}
  />
);

export default LoadingIndicator;

const cssOverride = css`
  display: block;
  margin: auto;
`;
