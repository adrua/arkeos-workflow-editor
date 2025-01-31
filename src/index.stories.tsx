/* @jsx h */
import { h } from "@stencil/core";
import "../src/index.tsx";
import "../src/editor-svg.tsx"

export default {
  parameters: {
    layout: "centered",
  },
};

export const story1 = () => <editor-rtf></editor-rtf>;
export const story2 = () => <editor-svg></editor-svg>;
