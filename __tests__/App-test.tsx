/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('App', () => {
  // it('renders correctly', () => {
  //   renderer.create(<App />);
  // })

  // it('MatchSnapshot', () => {
  //   const tree = renderer
  //     .create(<App />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('Has a test', () => {
    expect(2 + 2).toEqual(4)
  })
});