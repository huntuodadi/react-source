import React, {Component, PureComponent, memo} from 'react'

function ChildrenDemo(props) {
  console.log(props.children)
  console.log([1,2].map(c => [c, [c,c]]));
  console.log(React.Children.map(props.children, c => [c, [c, c]]))
  return props.children
}

class Father extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }
  add = () => {
    this.setState(
      {count: this.state.count + 1}
    );
  }
  render() {
    console.log('render father:', this);
    console.log(FunChild);
    return (
      <div>
        <button onClick={this.add}>
          click
        </button>
        <Son></Son>
        <FunChild></FunChild>
        <PureChild></PureChild>
      </div>
    );
  }
}

class PureChild extends PureComponent {
  render() {
    console.log('PureChild');
    return (
      <div>
        pureChild
      </div>
    );
  }
}

function FunChild() {
  console.log('FunChild');
  return (
    <div>
      function child
    </div>
  );
}

class Son extends Father {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('render son:', this)
    return (
      <div>
        <button onClick={this.add}>
          click son
        </button>
        son
      </div>
    );
  }
}

export default () => (
  <Father name='zzy'></Father>
  // <ChildrenDemo>
  //   <span>
  //     1
  //     <span>
  //       3
  //     </span>
  //   </span>
  //   <span>2</span>
  // </ChildrenDemo>
)
