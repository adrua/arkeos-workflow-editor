/* @jsx h */
import { h, Component, State, Host, Fragment, forceUpdate } from "@stencil/core";

@Component({
  tag: "editor-svg",
  styleUrl: "./editor-svg.scss",
  shadow: true,
})
export class EditorSvg {
  w = 5; //Width arrow mark
  w2 = this.w << 1;
  w4 = this.w2 << 1;

  dragging: any;
  currentState: any;
  currentTransition: any;

  @State()
  source = {
  "v": "1.1",
  "s": [
    {
      "position": {
        "x": 60,
        "y": 60
      },
      "id": "start",
      "type": 1,
      "r": 36,
      "params": {
        "Graph": "rtfcomponents"
      },
      "title": "start"
    },
    {
      "position": {
        "x": 158,
        "y": 36
      },
      "id": "menu",
      "type": 2,
      "w": 42,
      "h": 48,
      "a": 2,
      "params": {
        "Graph": "rtfcomponents",
        "Form": "/Arkeos/rtf/arkeos-rtf/index.js#arkeos-rtf"
      },
      "title": "menu"
    },
    {
      "position": {
        "x": 250,
        "y": 36
      },
      "id": "Get",
      "type": 2,
      "w": 34,
      "h": 48,
      "a": 2,
      "params": {
        "Graph": "rtfcomponents",
        "Plugin": "appData/tools#ArkeosRtfComponentSupport.Tool#Arkeos.Tools.Interfaces.IRtfManager#GetSourcesAsync"
      },
      "title": "Get"
    },
    {
      "position": {
        "x": 250,
        "y": 114
      },
      "id": "PutSources",
      "type": 2,
      "w": 98,
      "h": 48,
      "a": 2,
      "params": {
        "Graph": "rtfcomponents",
        "Plugin": "appData/tools#ArkeosRtfComponentSupport.Tool#Arkeos.Tools.Interfaces.IRtfManager#PutSourcesAsync"
      },
      "title": "Put Sources"
    },
    {
      "position": {
        "x": 398,
        "y": 114
      },
      "id": "Parse",
      "type": 2,
      "w": 50,
      "h": 48,
      "a": 2,
      "params": {
        "Graph": "rtfcomponents",
        "Plugin": "appData/tools#ArkeosRtfComponentSupport.Tool#Arkeos.Tools.Interfaces.IRtfManager#ParseAsync"
      },
      "title": "Parse"
    },
    {
      "position": {
        "x": 498,
        "y": 114
      },
      "id": "UnitTests",
      "type": 2,
      "w": 90,
      "h": 48,
      "a": 2,
      "params": {
        "Graph": "rtfcomponents",
        "Plugin": "appData/tools#ArkeosRtfComponentSupport.Tool#Arkeos.Tools.Interfaces.IRtfManager#UnitTestAsync"
      },
      "title": "Unit Tests"
    },
    {
      "type": 0,
      "s": {
        "s": "Get",
        "k": "left"
      },
      "e": {
        "s": "menu",
        "k": "right"
      },
      "c": [
        "arw-e"
      ],
      "params": {}
    },
    {
      "type": 0,
      "s": {
        "s": "menu",
        "k": "right"
      },
      "e": {
        "s": "Get",
        "k": "left"
      },
      "c": [
        "arw-e"
      ],
      "params": {
        "Switch": "Option == \u0027Get\u0027"
      }
    },
    {
      "type": 0,
      "s": {
        "s": "UnitTests",
        "k": "left"
      },
      "e": {
        "s": "menu",
        "k": "bottom"
      },
      "c": [
        "arw-e"
      ],
      "params": {}
    },
    {
      "type": 0,
      "s": {
        "s": "Parse",
        "k": "right"
      },
      "e": {
        "s": "UnitTests",
        "k": "left"
      },
      "c": [
        "arw-e"
      ],
      "params": {
        "Switch": "CompiledComponent == true"
      }
    },
    {
      "type": 0,
      "s": {
        "s": "Parse",
        "k": "left"
      },
      "e": {
        "s": "menu",
        "k": "bottom"
      },
      "c": [
        "arw-e"
      ],
      "params": {
        "Switch": "CompiledComponent == false"
      }
    },
    {
      "type": 0,
      "s": {
        "s": "PutSources",
        "k": "right"
      },
      "e": {
        "s": "Parse",
        "k": "left"
      },
      "c": [
        "arw-e"
      ],
      "params": {}
    },
    {
      "type": 0,
      "s": {
        "s": "menu",
        "k": "bottom"
      },
      "e": {
        "s": "PutSources",
        "k": "left"
      },
      "c": [
        "arw-e"
      ],
      "params": {
        "Switch": "Option == \u0027PutUT\u0027"
      }
    },
    {
      "type": 0,
      "s": {
        "s": "menu",
        "k": "bottom"
      },
      "e": {
        "s": "Parse",
        "k": "left"
      },
      "c": [
        "arw-e"
      ],
      "params": {
        "Switch": "Option == \u0027Renew\u0027"
      }
    },
    {
      "type": 0,
      "s": {
        "s": "menu",
        "k": "bottom"
      },
      "e": {
        "s": "UnitTests",
        "k": "left"
      },
      "c": [
        "arw-e"
      ],
      "params": {
        "Switch": "Option == \u0027Test\u0027"
      }
    },
    {
      "type": 0,
      "s": {
        "s": "start",
        "k": "right"
      },
      "e": {
        "s": "menu",
        "k": "left"
      },
      "c": [
        "arw-e"
      ],
      "params": {}
    }
  ]
} 

// #region Transitions
  getTransitionStartX(dir: string, start: any) {
    let x = start.position.x;

    switch(dir) {
      case 'top':
      case 'bottom':
        x += (start.type === 1) ? start.r / 2 : start.w / 2;
        break;
      case 'left':
        x += 0;
        break;
      case 'right':
        x += (start.type === 1) ? start.r : start.w;
        break;
    }

    return x;
  }

  getTransitionStartY(dir: string, start: any) {
    let y = start.position.y;

    switch(dir) {
      case 'top':
        y += 0;
        break;
      case 'bottom':
        y += (start.type === 1) ? start.r : start.h;
        break;
      case 'left':
      case 'right':
        y += (start.type === 1) ? 0 : start.h / 2;
        break;
    }

    return y;
  }

  getTransitionEndX(dir: string, end: any) {
    let x = end.position.x;

    switch(dir) {
      case 'top':
      case 'bottom':
        x += (end.type === 1) ? end.r / 2 : end.w / 2;
        break;
      case 'left':
        x += 0;
        break;
      case 'right':
        x += (end.type === 1) ? end.r : end.w;
        break;
    }

    return x;
  }

  getTransitionEndY(dir: string, end: any) {
    let y = end.position.y;

    switch(dir) {
      case 'top':
        y += 0;
        break;
      case 'bottom':
        y += (end.type === 1) ? end.r : end.h;
        break;
      case 'left':
      case 'right':
        y += (end.type === 1) ? end.r / 2 : end.h / 2;
        break;
    }

    return y;
  }

  getTransitionDirections(transition: any) {
    let end = this.source.s.find((s) => s.id === transition.e.s);
    let dir = transition.e.k;
    let x = this.getTransitionEndX(dir, end);
    let y = this.getTransitionEndY(dir, end);
    let _paths = [`M ${x} ${y}`];

    switch(dir) {
      case 'top':
        _paths.push(`L ${x + this.w} ${y - this.w2}`);
        _paths.push(`L ${x - this.w} ${y - this.w2}`);
        break;
      case 'bottom':
        _paths.push(`L ${x + this.w} ${y + this.w2}`);
        _paths.push(`L ${x - this.w} ${y + this.w2}`);
        break;
      case 'left':
        _paths.push(`L ${x - this.w2} ${y - this.w}`);
        _paths.push(`L ${x - this.w2} ${y + this.w}`);
        break;
      case 'right':
        _paths.push(`L ${x + this.w2} ${y - this.w}`);
        _paths.push(`L ${x + this.w2} ${y + this.w}`);
        break;
    }

    _paths.push(`Z`);
    return _paths.join(' ');
  }

  renderTransitionDirection(transition: any) {

    return (<path class="direction"  
              style={ { "--transition-stroke": (transition.params.Switch) ? "blue" : "black"  } }
              d={this.getTransitionDirections(transition)} />);
  }

  getTransitionPath(transition: any) {
    let start = this.source.s.find((s) => s.id === transition.s.s);
    let end = this.source.s.find((s) => s.id === transition.e.s);
    let _paths = [];
    _paths.push(`M ${this.getTransitionStartX(transition.s.k, start)} ${this.getTransitionStartY(transition.s.k, start)}`);

    switch(true)
    {
      case start.position.x === end.position.x: 
      case start.position.y === end.position.y: 
        break;
      case transition.s.k === "left" && transition.e.k === "bottom":
        _paths.push(`L ${this.getTransitionStartX(transition.s.k, start) - this.w4} ${this.getTransitionStartY(transition.s.k, start)}`);
        _paths.push(`L ${this.getTransitionStartX(transition.s.k, start) - this.w4} ${this.getTransitionEndY(transition.e.k, end) + this.w4}`);
        _paths.push(`L ${this.getTransitionEndX(transition.e.k, end)} ${this.getTransitionEndY(transition.e.k, end) + this.w4}`);
        break;
      case transition.s.k === "bottom" && transition.e.k === "left":
        _paths.push(`L ${this.getTransitionStartX(transition.s.k, start)} ${this.getTransitionStartY(transition.s.k, start) + this.w4}`);
        _paths.push(`L ${this.getTransitionStartX(transition.e.k, end) - this.w4} ${this.getTransitionEndY(transition.s.k, start) + this.w4}`);
        _paths.push(`L ${this.getTransitionEndX(transition.e.k, end) - this.w4} ${this.getTransitionEndY(transition.e.k, end)}`);
        break;
      default: 
        _paths.push(`L ${this.getTransitionStartX(transition.s.k, start)} ${this.getTransitionStartY(transition.e.k, end)}`);
        break;      
    }

    //console.log(`start: ${JSON.stringify(start)}`)
    //console.log(`end: ${JSON.stringify(end)}`)
    //console.log(`transition: ${JSON.stringify(transition)}`)

    _paths.push(`L ${this.getTransitionEndX(transition.e.k, end)} ${this.getTransitionEndY(transition.e.k, end)}`);

    //console.log(_paths)
    
    return _paths.join(' ');
  }

  renderTransition(transition: any) {

    return (<g> 
      <path class="transition"
        style={ { "--transition-stroke": (transition.params.Switch) ? "blue" : "black"  } }
        d={ this.getTransitionPath(transition) }
        />
      { this.renderTransitionDirection(transition) }
    </g>);
  }

  renderTransitions(transitions: any[]) {
    //console.log(`transitions: ${transitions.length}` )
    return transitions.map((t) => this.renderTransition(t)) 
  }
// #endregion

  renderShapeKind(s: any) {
    switch(s.type) {
      case 1: 
        return (<Fragment>
          <circle 
            fill="lightgreen"
            r={s.r}>
          </circle>
          <text x={- s.r / 2} y={-5}>
            <tspan>{s.title}</tspan>
          </text>
        </Fragment>);
      default: 
        return (<Fragment>
          <rect 
            width={s.w} 
            height={s.h}
            stroke="green"
            fill="lightgreen"
            fill-opacity="0.5"
            stroke-opacity="0.8"
            stroke-width="1">
          </rect>
          <text x="5" y="15">
            <tspan>{s.title}</tspan>
          </text>
        </Fragment>);
    }
  }

  renderShape(s: any) {
        return (<g id={s.id}
                  onMouseDown={ (e: MouseEvent) => {
                    this.dragging = e.target;
                    this.currentState = s;                    
                  }}
                  onMouseMove={ (e: MouseEvent) => {
                    if(this.dragging) {
                      this.currentState.position.x = e.clientX;
                      this.currentState.position.y = e.clientY;
                      //console.log(this.currentState)
                      forceUpdate(this);
                    }
                  }}
                  onMouseUp={ (e: MouseEvent) => {
                    this.dragging = undefined;
                  }}
                  transform={ `translate(${s.position.x} ${s.position.y})`}>
          { this.renderShapeKind(s) }
        </g>);
  }

  renderStates(states: any[]) {
    //console.log(`states: ${states.length}` )
    return states.map((s) => this.renderShape(s)) 
  }

  render() {
    return (
      <Host>
        <svg class="editor">
          { this.renderStates(this.source.s.filter((s) => !!s.type)) }
          { this.renderTransitions(this.source.s.filter((s) => !s.type)) }
        </svg>
      </Host>
    );
  }
}