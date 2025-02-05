/* @jsx h */
import { h, Component, State, Host, Fragment, Watch, forceUpdate } from "@stencil/core";

@Component({
  tag: "editor-svg",
  styleUrl: "./editor-svg.scss",
  shadow: true,
})
export class EditorSvg {
  readonly w = 5; //Width arrow mark
  readonly w2 = this.w << 1;
  readonly w3 = this.w * 3;
  readonly w4 = this.w2 << 1;

  @State()
  draggingState: any;
  @State()
  draggingTransition: any;

  @State()
  currentState: any;
  @State()
  currentTransition: any;
  @State()
  currentStateConnector: string;
  @State()
  currentTransitionConnector?: "start" | "end";
  
  currentTransitionStateStart: any;
  currentTransitionStateEnd: any;
  currentTransitionEvent: MouseEvent;

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
        "w": 64,
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
        "w": 64,
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
        "w": 64,
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

  states = this.source.s.filter((s) => s.type); 
  transitions = this.source.s.filter((s) => !s.type);

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

  getTransitionPathBody(transition: any): any[] {
    let start = this.states.find((s) => s.id === transition.s.s);
    let end = this.states.find((s) => s.id === transition.e.s);
    let _paths = [];

    if(this.currentTransitionEvent && this.currentTransitionConnector === "start" && this.currentTransition === transition) {
      _paths.push(`${this.currentTransitionEvent.clientX},${this.currentTransitionEvent.clientY}`);
    } else {
      _paths.push(`${`${this.getTransitionStartX(transition.s.k, start)},${this.getTransitionStartY(transition.s.k, start)}`}`);
    }

    switch(true)
    {
      case !end:
        return [];
      case start.position.x === end.position.x: 
      case start.position.y === end.position.y: 
        break;
      case transition.s.k === "left" && transition.e.k === "bottom":
        _paths.push(`${this.getTransitionStartX(transition.s.k, start) - this.w4},${this.getTransitionStartY(transition.s.k, start)}`);
        _paths.push(`${this.getTransitionStartX(transition.s.k, start) - this.w4},${this.getTransitionEndY(transition.e.k, end) + this.w4}`);
        _paths.push(`${this.getTransitionEndX(transition.e.k, end)}, ${this.getTransitionEndY(transition.e.k, end) + this.w4}`);
        break;
      case transition.s.k === "bottom" && transition.e.k === "left":
        _paths.push(`${this.getTransitionStartX(transition.s.k, start)},${this.getTransitionStartY(transition.s.k, start) + this.w4}`);
        _paths.push(`${this.getTransitionStartX(transition.e.k, end) - this.w4},${this.getTransitionEndY(transition.s.k, start) + this.w4}`);
        _paths.push(`${this.getTransitionEndX(transition.e.k, end) - this.w4},${this.getTransitionEndY(transition.e.k, end)}`);
        break;
      default: 
        _paths.push(`${this.getTransitionStartX(transition.s.k, start)},${this.getTransitionStartY(transition.e.k, end)}`);
        break;      
    }

    if(this.currentTransitionEvent && this.currentTransitionConnector === "end" && this.currentTransition === transition) {
      _paths.push(`${this.currentTransitionEvent.clientX},${this.currentTransitionEvent.clientY}`);
    } else {
      _paths.push(`${this.getTransitionEndX(transition.e.k, end)},${this.getTransitionEndY(transition.e.k, end)}`);
    }

    return _paths;
  }

  getTransitionPathList(transition: any) {
    let start = this.states.find((s) => s.id === transition.s.s);
    let end = this.states.find((s) => s.id === transition.e.s);
    let _paths = [];

    _paths.push(`${`${this.getTransitionStartX(transition.s.k, start)},${this.getTransitionStartY(transition.s.k, start)}`}`);

    _paths = _paths.concat(this.getTransitionPathBody(transition));

    _paths.push(`${this.getTransitionEndX(transition.e.k, end)},${this.getTransitionEndY(transition.e.k, end)}`);

    return _paths.join(' ');
  }

  getTransitionPathListWithStart(transition: any) {
    let end = this.states.find((s) => s.id === transition.e.s);
    let _paths = [];

    _paths.push(`${this.currentTransitionEvent.clientX},${this.currentTransitionEvent.clientY}`);

    //_paths = _paths.concat(this.getTransitionPathBody(transition));

    _paths.push(`${this.getTransitionEndX(transition.e.k, end)},${this.getTransitionEndY(transition.e.k, end)}`);

    return _paths.join(' ');
  }

  getTransitionPathListWithEnd(transition: any) {
    let start = this.states.find((s) => s.id === transition.s.s);
    let _paths = [];

    _paths.push(`${`${this.getTransitionStartX(transition.s.k, start)},${this.getTransitionStartY(transition.s.k, start)}`}`);

    //_paths = _paths.concat(this.getTransitionPathBody(transition));

    _paths.push(`${this.currentTransitionEvent.clientX},${this.currentTransitionEvent.clientY}`);

    return _paths.join(' ');
  }

// #endregion

// #region dragging
  dragStartTransition(e: MouseEvent, transition: any) {
    this.currentTransitionEvent = e;
    this.currentState = undefined;
    this.draggingState = undefined;

    this.currentTransitionStateStart = this.states.find((s) => s.id === transition.s.s);
    this.currentTransitionStateEnd = this.states.find((s) => s.id === transition.e.s);

    this.draggingTransition = transition;
  }

  dragStartNewTransition(e: MouseEvent, state: any, connector: string) {
    this.currentState = undefined;
    this.draggingState = undefined;

    const newTransition = {
      "type": 0,
      "s": {
        "s": state.id,
        "k": connector
      },
      "e": {
        "s": state.id,
        "k": "left"
      },
      "c": [
        "arw-e"
      ],
      "params": {}
    };

    this.transitions = [newTransition, ...this.transitions];

    this.currentTransitionConnector = "end";
    this.dragStartTransition(e, newTransition);
  }

  dragEndTransition(e: MouseEvent) {
    console.log(`drag-end-transition: ${e.clientX} ${e.clientY}`);
    if(this.draggingTransition) {
      debugger;
      let elements = e.composedPath() as HTMLElement[];
      let _connector = elements.filter((el) => el.dataset?.connector)[0];
      let _state = elements.filter((el) => el.dataset?.state)[0];

      if(_state) {
        let state = this.states.find((s) => s.id === _state.dataset.state);
        let connector = _connector?.dataset?.connector;

        if(this.currentTransitionConnector === "start") {
          this.draggingTransition.s.k = connector || this.draggingTransition.s.k;
          this.draggingTransition.s.s = state.id;
        } else {
          this.draggingTransition.e.k = connector || this.draggingTransition.e.k;
          this.draggingTransition.e.s = state.id;
        }
      } else { //Se elimina la trasiccion si es flotante
        this.transitions.splice(0, 1);
      }

      this.currentTransitionConnector = undefined;
      this.currentTransitionEvent = undefined;
      this.currentTransitionStateEnd = undefined;
      this.currentTransitionStateStart = undefined;
      this.draggingTransition = undefined;
      this.currentState = undefined;
      this.draggingState = undefined;
    }
  }

// #endregion

  renderTransitionSelected(t: any, index: number) {
    let start = this.states.find((s) => s.id === t.s.s);
    let end = this.states.find((s) => s.id === t.e.s);

    return (<Fragment>                    
                <g class="transition-connector" data-connector="start" data-state={t.s.s}
                  transform={`translate(${ this.getTransitionStartX(t.s.k, start) } ${ this.getTransitionStartY(t.s.k, start) })`}
                  onMouseEnter={ (_) => this.currentTransitionConnector = "start" }
                  onMouseLeave={ (_) => this.currentTransitionConnector = undefined }
                  onMouseDown={ (e) => this.dragStartTransition(e, t) }
                  onMouseUp={ (e) => this.dragEndTransition(e) }>
                    <circle r={(this.currentTransitionConnector === "start") ? this.w4 : this.w2 }></circle>
                </g>
                <g class="transition-connector" data-connector="end" data-state={t.e.s}
                  transform={`translate(${ this.getTransitionEndX(t.e.k, end) } ${ this.getTransitionEndY(t.e.k, end) })`}
                  onMouseEnter={ (_) => this.currentTransitionConnector = "end" }
                  onMouseLeave={ (_) => this.currentTransitionConnector = undefined }
                  onMouseDown={ (e) => this.dragStartTransition(e, t) }
                  onMouseUp={ (e) => this.dragEndTransition(e) }>
                    <circle r={(this.currentTransitionConnector === "end") ? this.w4 : this.w2 }></circle>
                </g>
                { /* Delete */ }
                <svg xmlns="http://www.w3.org/2000/svg" 
                    x={(end.type === 2) ? end.position.x - this.w4 : end.position.x } 
                    y={(end.type === 2) ? end.position.y - this.w2 : end.position.y}
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    height="24px"
                    fill="black"
                    opacity="0.5">
                    <g onMouseUp={(e) => { //Deleting transition
                        this.transitions.splice(index, 1);
                        this.currentTransition = undefined;
                    }}>
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </g>
                </svg>      
            </Fragment>) ;
  }

  renderTransitions() {
    return this.transitions.map((t, index) => (
      <g style={ { "--transition-stroke": (t.params.Switch) ? "blue" : "black"  } }
        onMouseEnter={(_) => {
          this.currentTransitionStateStart = this.states.find((s) => s.id == t.s.s );
          this.currentTransitionStateEnd = this.states.find((s) => s.id == t.e.s );
          this.currentTransition = t;
        }}
        onMouseLeave={(_) => this.currentTransition = undefined }> 
          <polyline class="transition"
              points={ (this.draggingTransition === t) 
                          ? ((this.currentTransitionConnector === "start") 
                              ? this.getTransitionPathListWithStart(t) : this.getTransitionPathListWithEnd(t)) 
                          : this.getTransitionPathList(t) }
              marker-end={ (t.params.Switch) ? "url(#arrow-blue)" : "url(#arrow-black)" }
          />
          { (this.currentTransition === t) ? this.renderTransitionSelected(t, index) : null }
    </g>)); 
  }

  renderShapeKind(s: any) {
    switch(s.type) {
      case 1: 
        return (<Fragment>
          <circle 
            fill="lightgreen"
            stroke="green"
            r={s.r}            
            stroke-opacity="0.8"
            stroke-width="1">
          </circle>
          <text x={- s.r / 2} y={-5}>
            <tspan>{s.title}</tspan>
          </text>
        </Fragment>);
      case 3: 
        return (<Fragment>
          <circle 
            fill="red"
            r={s.r}
            stroke="lightred"
            stroke-opacity="0.8"
            stroke-width="1">
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
            rx={this.w} 
            ry={this.w}
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

  renderShapeSelected(state: any) {
    return (<g>
      {this.renderShapeKind(state)}
      <g class="state-connector" data-connector="top" data-state={state.id}
        transform={`translate(${(state.type === 2) ? state.w / 2 : state.r / 2 - this.w3 } ${(state.type === 2) ? 0 : - state.r })`}
        onMouseEnter={ (_) => this.currentStateConnector = "top" }
        onMouseLeave={ (_) => this.currentStateConnector = undefined }
        onMouseDown={ (e) => this.dragStartNewTransition(e, state, "top") }
        onMouseUp={ (e) => this.dragEndTransition(e) }>
        <circle r={(this.currentStateConnector === "top") ? this.w4  : this.w2  } ></circle>
      </g>
      <g class="state-connector" data-connector="bottom" data-state={state.id}
        transform={`translate(${(state.type === 2) ? state.w / 2 : state.r / 2 - this.w3 } ${(state.type === 2) ? state.h : state.r })`}
        onMouseEnter={ (_) => this.currentStateConnector = "bottom" }
        onMouseLeave={ (_) => this.currentStateConnector = undefined }
        onMouseDown={ (e) => this.dragStartNewTransition(e, state, "bottom") }
        onMouseUp={ (e) => this.dragEndTransition(e) }>
        <circle r={(this.currentStateConnector === "bottom") ? this.w4  : this.w2  } ></circle>
      </g>
      <g class="state-connector" data-connector="left" data-state={state.id}
        transform={`translate(${(state.type === 2) ? 0 : -state.r} ${(state.type === 2) ? state.h / 2 : state.r / 2 - this.w3})`}
        onMouseEnter={ (_) => this.currentStateConnector = "left" }
        onMouseLeave={ (_) => this.currentStateConnector = undefined }
        onMouseDown={ (e) => this.dragStartNewTransition(e, state, "left") }
        onMouseUp={ (e) => this.dragEndTransition(e) }>
        <circle r={(this.currentStateConnector === "left") ? this.w4  : this.w2  } ></circle>
      </g>
      <g class="state-connector" data-connector="right" data-state={state.id}
        transform={`translate(${(state.type === 2) ? state.w : state.r} ${(state.type === 2) ? state.h / 2 : state.r / 2 - this.w3})`}
        onMouseEnter={ (_) => this.currentStateConnector = "right" }
        onMouseLeave={ (_) => this.currentStateConnector = undefined }
        onMouseDown={ (e) => this.dragStartNewTransition(e, state, "right") }
        onMouseUp={ (e) => this.dragEndTransition(e) }>
        <circle r={(this.currentStateConnector === "right") ? this.w4  : this.w2  } ></circle>
      </g>
      { /* Delete */ }
      <svg xmlns="http://www.w3.org/2000/svg" 
          x={(state.type === 2) ? state.w - 24 : state.r - 36 } 
          y={(state.type === 2) ? -12 : - state.r - 0}
          viewBox="0 -960 960 960" 
          width="24px" 
          height="24px"
          fill="black"
          opacity="0.5">
          <g onMouseUp={(e) => {
            //Solo se borra los estados diferentes "start" y "end"
            if(state.type == 2) {
              this.transitions = this.transitions.filter((t) => t.s.s !== state.id && t.e.s !== state.id );
              let inx = this.states.findIndex((ss) => state == ss);
              this.states.splice(inx, 1);
            }
          }}>
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </g>
      </svg>      
      { /* Add */ }
      <svg xmlns="http://www.w3.org/2000/svg" 
          x={(state.type === 2) ? state.w - 12 : state.r - 24} 
          y={(state.type === 2) ? -12 : - state.r - 0}
          viewBox="0 -960 960 960" 
          width="24px" 
          height="24px"
          opacity="0.5">
          <g onMouseUp={ (e) => {
              const newState = {
                "position": {
                  "x": state.position.x + state.w + 100,
                  "y": state.position.y
                },
                "id": `new-state-${this.states.length}`,
                "type": 2,
                "w": 130,
                "h": state.h,
                "a": 2,
                "params": { },
                "title": `New state #${this.states.length}`
              };

              this.states = [newState as any, ...this.states];

              const newTransition = {
                "type": 0,
                "s": {
                  "s": state.id,
                  "k": "right"
                },
                "e": {
                  "s": newState.id,
                  "k": "left"
                },
                "c": [
                  "arw-e"
                ],
                "params": {}
              };

              this.transitions = [newTransition, ...this.transitions];
          } }>
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
          </g>
      </svg>
    </g>);
  }

  renderStates() {
    return this.states.map((s) => (<Fragment>
        <g id={s.id}  data-state={s.id}     
          transform={ `translate(${s.position.x} ${s.position.y})`}
          onMouseEnter={ (e: MouseEvent) => {
            this.currentState = s;
          }}
          onMouseDown={ (e: MouseEvent) => {
            if(!this.draggingTransition) {
              this.draggingState = {
                x: e.clientX - s.position.x,
                y: e.clientY - s.position.y
              };
            }
          }}
          onMouseLeave={ (e: MouseEvent) => {
            this.currentState = undefined;   
          }}
          onMouseMove={ (e: MouseEvent) => {
            if(this.draggingState) {
              if(this.currentState.type === 2) {
                this.currentState.position.x = e.clientX - this.draggingState.x;
                this.currentState.position.y = e.clientY - this.draggingState.y;
              } else {
                this.currentState.position.x = e.clientX;
                this.currentState.position.y = e.clientY;
              }
              forceUpdate(this);
            }
          }}
          onMouseUp={ (e) => {
            this.dragEndTransition(e);

            this.currentState = undefined;
            this.draggingState = undefined;
          } }>
        { (this.currentState === s) ? this.renderShapeSelected(s) : this.renderShapeKind(s)  }
        </g>
      </Fragment>)) 
  }

  render() {
    return (
      <Host>
        <svg class="editor" 
          onMouseMove={ (e) => {
            if(this.draggingTransition) {
              this.currentTransitionEvent = e;
              forceUpdate(this);
            }
          } }
          onMouseUp={ (e) => this.dragEndTransition(e) }>
          <defs>
            <marker id="circle" markerWidth="8" markerHeight="8" refX="5" refY="5">
              <circle cx="5" cy="5" r="3" fill="black" />
            </marker>
            <marker id="arrow-black" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="black" />
            </marker>
            <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="blue" />
            </marker>
          </defs>
          { this.renderStates() }
          { this.renderTransitions() }
        </svg>
      </Host>
    );
  }
}