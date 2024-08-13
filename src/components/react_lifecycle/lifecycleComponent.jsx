import React, { Component } from 'react';
class LifecycleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    console.log('Component did mount');
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Component did update');
    }
  }
  componentWillUnmount() {
    console.log('Component will unmount');
  }
  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <h1 className='p-2 bg-blue-950 text-white text-xl'>Count: {this.state.count}</h1>
        <button className='p-2 bg-orange-500 text-white text-md m-2 rounded shadow' onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}
export default LifecycleComponent;