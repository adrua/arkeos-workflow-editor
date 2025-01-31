/* @jsx h */
import { h, Component, State, Host } from "@stencil/core";

@Component({
  tag: "editor-rtf",
  styleUrl: "./index.scss",
  shadow: true,
})
export class EditorRtf {

  render() {
    return (
      <Host>
        <div contenteditable="true" class="editor">
          <div class="image" contenteditable="false">
            <img src="https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg" />
          </div>
        </div>
      </Host>
    );
  }
}
