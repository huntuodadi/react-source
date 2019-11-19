import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import routes from './routes'
import './App.css'

// 调用super.method()看看this指向

const withListFunction = moduleName => (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.hocVar = 'zzy';
      this.list = [];
      this.moduleName = moduleName;
    }
    componentDidMount() {
      console.log('hoc compoennt did mount');
      this.getList();
      this.grandFun();
    }
    getList() {
      console.log('get list data from module:', this.moduleName);
      this.list = [1,2,3];
    }

    render() {
      console.log('render hoc:', this.props);
      return <WrappedComponent
              {...this.props}
              list={this.list}
              />
    }
  }
}



class Child extends Component {
  constructor(props) {
    super(props);
    this.moduleName = 'accountModule';
  }
  componentDidMount() {
    console.log('Child component mounted');
    // this.grandFun();
  }
  // static getDerivedStateFromProps(preProps, preState) {
  //   console.log('getDerivedStateFromProps:', preProps, preState);
  //   return {
  //     count: preState.count + 1
  //   }
  // }
  // UNSAFE_componentWillReceiveProps(preProps, props) {
  //   console.log('UNSAFE_componentWillReceiveProps:', preProps, props);
  //   setTimeout(() => {
  //     this.setState({
  //       count: preProps.count + 1
  //     });
  //   }, 1000);
  // }
  render() {
    console.log('render child, and hoc data is:', this.props);
    return (
      <div>child</div>
    );
  }
}

const HocChild = withListFunction('account')(Child);
console.log('HocChild:', HocChild);

class GrandChild extends HocChild {
  constructor() {
    super();
  }
  grandFun() {
    console.log('grandFun:', this);
  }
  // render() {
  //   return (
  //     <div>this is grandchild</div>
  //   );
  // }
}
class App extends Component {
  constructor() {
    console.log('constructor');
    super();
    this.state = {
      count: 0
    };
    this.myRef = React.createRef();
    console.log('before rendered:', this.myRef);
    // this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    console.log('lets see ref is:', this.myRef);
    const target = {
      name: 'zzy'
    };
    const handler = {
      get: function(target, name, property) {
        console.log(target, name, property);
        if(name === 'name') {
          console.log('success');
        }else {
          console.log('error');
        }
        Reflect.get(target, name, property);
      }
    }
    const prox = new Proxy(target, handler);
    console.log('get name:', prox.name);
    console.log('get age:', prox.age);
  }

  getList() {
    console.log('get list data');
  }
  // static getDerivedStateFromProps(preProps, preState) {
  //   console.log('getDerivedStateFromProps:', preProps, preState);
  //   return {
  //     count: preState.count + 1
  //   }
  // }

  render() {
    // console.log('render');
    return (
      <div className="App" ref={this.myRef}>
        {/* <nav className="navs">
          <Link to="/ref">RefDemo</Link>
          <Link to="/forward-ref">ForwardRefDemo</Link>
          <Link to="/context">ContextDemo</Link>
          <Link to="/concurrent">ConcurrentModeDemo</Link>
          <Link to="/suspense">SuspenseDemo</Link>
          <Link to="/hooks">HooksDemo</Link>
          <Link to="/children">ChildrenDemo</Link>
          <Link to="/memo">MemoDemo</Link>
          <Link to="/portal">PortalDemo</Link>
        </nav>
        <div className="contents">{routes}</div> */}
        {/* <Child count={this.state.count}></Child> */}
        this is an app
      </div>
    )
  }
}


class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    // this.textInput = React.createRef();
    this.textInput = null;
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  componentDidMount() {
    // this.textInput.current.focusTextInput();
    console.log('CustomTextInput:', this.textInput);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    const {getInputRef} = this.props;
    return (
      <div>
        <input
          type="text"
          ref={getInputRef} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.getInputRef = this.getInputRef.bind(this);
  }

  componentDidMount() {
    console.log('AutoFocusTextInput:', this.textInput);
    this.textInput.focus();
  }

  getInputRef(ele) {
    console.log('this:', this);
    this.textInput = ele;
  }

  render() {
    return (
      <CustomTextInput getInputRef={this.getInputRef} ref={this.textInput} />
    );
  }
}


class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <div style={{ position: 'absolute', left: mouse.x, top: mouse.y }} >This is a cat</div>
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    console.log('moving');
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracer extends Component{
  render() {
    return (
      <div>
        <Mouse render = {
          (mouse) => {
            return <Cat mouse={mouse}>

            </Cat>;
            
          }
        }>

        </Mouse>
      </div>
    );
  }
}
export default MouseTracer
