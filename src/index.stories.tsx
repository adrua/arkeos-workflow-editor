/* @jsx h */
import { h } from "@stencil/core";
import "../src/index.tsx";
import "../src/editor-svg.tsx"

export default {
  parameters: {
    layout: "centered",
  },
};

export const Workflow = () => <editor-svg></editor-svg>;
export const RichTextEditor = () => <editor-rtf></editor-rtf>;
