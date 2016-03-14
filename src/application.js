import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/Grid'
import './styles/tic-tac-toe.scss';

class App extends React.Component {
  render() {
    return (
      <Grid />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
