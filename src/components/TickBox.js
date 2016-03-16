import React from 'react';

export default class TickBox extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='inner-tick'>{this.props.tick}</div>
    );
  }
}
