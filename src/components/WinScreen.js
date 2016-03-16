import React from 'react';

export default class WinScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='win-overlay'>
        <div className="win-overlay-inner">
          {this.props.winner} wins!
          <button onClick={this.props.restartState}>restart</button>
        </div>
      </div>
    );
  }
}
