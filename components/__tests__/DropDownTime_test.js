import React from 'react';
import DropDownTime from '../DropDownTime';
import TestRenderer from 'react-test-renderer';








test('renders correctly', () => {
  const tree = renderer.create(<DropDownTime />).toJSON();
  expect(tree).toMatchSnapshot();
});