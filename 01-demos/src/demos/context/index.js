import React from 'react'
import PropTypes from 'prop-types'

const { Provider, Consumer } = React.createContext('default')

class Parent extends React.Component {
  state = {
    childContext1: '123',
    newContext: '456',
  }

  getChildContext() {
    return { value: this.state.childContext1, a: 'aaaaa' }
  }

  render() {
    return (
      <>
        <div>
          <label>childContext:</label>
          <input
            type="text"
            value={this.state.childContext1}
            onChange={e => this.setState({ childContext1: e.target.value })}
          />
        </div>
        <div>
          <label>newContext:</label>
          <input
            type="text"
            value={this.state.newContext}
            onChange={e => this.setState({ newContext: e.target.value })}
          />
        </div>
        <Provider value={{newContext: this.state.newContext, providerValue: this.state.childContext1}}>{this.props.children}</Provider>
      </>
    )
  }
}

class Parent2 extends React.Component {
  // { value: this.state.childContext, a: 'bbbbb' }
  getChildContext() {
    return { a: 'bbbbb' }
  }

  render() {
    return this.props.children
  }
}

function Child1(props, context) {
  console.log(context)
  return <Consumer>{(a) => {
    console.log('value:', a);
    return <p>{a.newContext}</p>
  }}</Consumer>
}

Child1.contextTypes = {
  value: PropTypes.string,
}

class Child2 extends React.Component {
  render() {
    return (
      <p>
        childContext: value: {this.context.value} a: {this.context.a}
        providecontext: <Consumer>{value => <p>{value.newContext}</p>}</Consumer>
      </p>
    )
  }
}

// Child2.contextType = Consumer

Child2.contextTypes = {
  value: PropTypes.string,
  a: PropTypes.string,
}

Parent.childContextTypes = {
  value: PropTypes.string,
  a: PropTypes.string,
}

Parent2.childContextTypes = {
  a: PropTypes.string,
}

export default () => (
  <Parent>
    <Parent2>
      <Child1 />
      <Child2 />
    </Parent2>
  </Parent>
)
