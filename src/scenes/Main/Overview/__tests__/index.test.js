import React from 'react';
import { mount, shallow } from 'enzyme';
import Overview from '../';
import Root from '../../../../Root';
import PatientList from '../components/PatientsList';
import Appointments from '../components/Appointments';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Overview />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('shows a Patients List', () => {
  expect(wrapped.find(PatientList).length).toEqual(1);
});

it('shows an Appointment List', () => {
  expect(wrapped.find(Appointments).length).toEqual(1);
});
