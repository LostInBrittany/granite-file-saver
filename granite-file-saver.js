/**
@license MIT
Copyright (c) 2016 Horacio "LostInBrittany" Gonzalez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/**
`<granite-file-saver>` is a lightweight element to save content to a file on the local filesystem

Typical usage:

```html
<granite-file-saver payload='[ "The content to save", "in array format" ]'>
  <paper-button>
    Click to save to a file
  </paper-button>
</granite-file-saver>
```
    
@element granite-file-saver
@blurb A lightweight element to save content to a file on the local filesystem
@homepage index.html
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

class GraniteFileServer extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        cursor: pointer;
      }
      [hidden] {
        display: none;
      }
    </style>

    <slot></slot>
    <a id="hiddenSaver" href$="[[_file]]" download="{{_filename}}" hidden=""></a>`;
  }

  static get is() {
    return "granite-file-saver";
  }

  /**
   * Fired when a file has been saved
   *
   * @event file-saved
   */

  static get properties() {
    return {
      /**
       * The Objects to be written in the file
       * An Array of ArrayBuffer, ArrayBufferView, Blob, DOMString objects, or a mix of any of such objects
       * See https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
       */
      payload: {
        type: Array,
        value: function () {
          return [];
        }
      },
      /**
       * A convenient attribute for text content, if set it will be saved instead of `payload`
       */
      text: {
        type: String,
        value: null
      },
      /**
       * How does the browser must save the file           * 
       */
      mimeType: {
        type: String,
        value: "plain/text"
      },

      filename: {
        type: String,
        value: ""
      },

      /**
       * Internal file bbject
       */
      _file: {
        type: Object,
        value: null
      },

      _filename: {
        type: String,
        value: "warpscript.mc2"
      }

    };
  }

  ready() {
    this.addEventListener('click', this._onClick);
    super.ready();
  }

  _onClick(evt) {
    evt.stopPropagation();

    var content;
    if (this.text) {
      content = [this.text];
    } else {
      content = this.payload;
    }
    if (this.filename) {
      this._filename = this.filename;
    } else {
      this._filename = "file-" + Date.now().toString();
    }

    // console.debug("[granite-file-reader]", content);
    var data = new Blob(content, { type: this.mimeType });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (this._file !== null) {
      window.URL.revokeObjectURL(this._file);
    }

    this._file = window.URL.createObjectURL(data);

    var event = new MouseEvent('click');
    this.$.hiddenSaver.dispatchEvent(event);
  }
 
}
window.customElements.define(GraniteFileServer.is, GraniteFileServer);
