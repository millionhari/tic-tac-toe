import React from 'react';

export default class WinScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='win-overlay'>
        <div className='win-overlay-inner'>
          <h1>WINNER: {this.props.winner}</h1>
          <div className='button' onClick={this.props.restart}>RESTART</div>
        </div>
      </div>
    );
  }
}
