import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Callback from 'Callback';

describe('Callback', () => {
    it('renders correctly', () => {
        const tree = renderer
          .create(<Callback />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});