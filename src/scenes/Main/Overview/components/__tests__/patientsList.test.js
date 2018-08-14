import React from 'react';
import { shallow } from 'enzyme';
import PatitentsList from '../PatientsList';

let wrapped;

const appointments = [
  {
    id: 14,
    datetime: '2017-02-15T18:00:00',
    created_at: '2017-02-10T20:16:55',
    patient_id: 6,
    note: 'B12 shots'
  }
];

const patients = [
  {
    id: 6,
    name: 'Jorah Mormont',
    company: 'Khaleesi Ltd.'
  }
];

const messagesMap = {
  '6': 276
};

beforeEach(() => {
  wrapped = shallow(
    <PatitentsList
      appointments={appointments}
      patients={patients}
      messagesMap={messagesMap}
      fetchUserActions={jest.fn()}
      fetchAppointments={jest.fn()}
    />
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('should find Card elements', () => {
  expect(wrapped.find('Card').exists()).toBe(true);
  expect(wrapped.find('CardHeader#toggle6').exists()).toBe(true);

  expect(wrapped.render().text()).toContain('B12 shots');
});
