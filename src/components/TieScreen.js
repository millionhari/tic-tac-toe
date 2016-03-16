import React from 'react';

export default class TieScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='win-overlay'>
        <div className="win-overlay-inner">
          Its a Tie!
          <button onClick={this.props.restartState}>restart</button>
        </div>
      </div>
    );
  }
}
