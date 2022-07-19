import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Separator from './Separator';

describe('Separator', () => {
  it('MatchSnapshot', () => {
    const tree = renderer
      .create(<Separator />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})