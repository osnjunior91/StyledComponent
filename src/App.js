import React, { Component } from 'react';
import {Container} from './style';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        color: '',
        width: '',
        div: '',
    };
    this.alterDiv = this.alterDiv.bind(this);
  }
  alterDiv(e) {
    this.setState({
      div: <Container color = {this.state.color} width = {this.state.width}></Container>
    });
    e.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <form onSubmit = {this.alterDiv}>
          <div className="Color">
              <label htmlFor="color">Cor da div:</label>
              <input type="text" id="color" onChange={(e) => this.setState({color: e.target.value})} />
          </div>
          <div className="Width">
              <label htmlFor="width">Largura:</label>
              <input type="text" id="width" onChange={(e) => this.setState({width: e.target.value})} />
          </div>
          <div className="Action">
              <button type="submit">Mudar estilo</button>
          </div>
        </form>
        {this.state.div}
      </div>
    );
  }
}
