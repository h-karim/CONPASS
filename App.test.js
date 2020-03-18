import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Tester, TestHookStore } from 'cavy';
import ExampleSpec from './tests/system-tests/exampleSpec';
import App from './App';

const testHookStore = new TestHookStore();

class AppWrapper extends Component {
  render() {
    return (
      <Tester
        specs={[ExampleSpec]}
        store={testHookStore}
      >
        <App />
      </Tester>
    );
  }
}

AppRegistry.registerComponent('conPass', () => AppWrapper);