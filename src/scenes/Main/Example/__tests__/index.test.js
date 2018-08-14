import React from 'react';
import { mount, shallow } from 'enzyme';
import Example from '../';
import Root from '../../../../Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Example />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has 2 button', () => {
  expect(wrapped.find('button').length).toEqual(2);
});
