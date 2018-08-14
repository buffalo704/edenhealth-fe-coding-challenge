import React from 'react';
import { shallow } from 'enzyme';
import Appointments from '../Appointments';

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

const patientsMap = {
  '1': {
    id: 1,
    name: 'Robert Baratheon',
    company: 'Westeros Wealth Management'
  },
  '2': {
    id: 2,
    name: 'John Snow',
    company: "Night's Watch"
  },
  '3': {
    id: 3,
    name: 'Khal Drogo',
    company: 'Khaleesi Ltd.'
  },
  '4': {
    id: 4,
    name: 'Joffery Baratheon',
    company: 'Westeros Wealth Management'
  },
  '5': {
    id: 5,
    name: 'Oberyn Martell',
    company: 'Sand Trading Co.'
  },
  '6': {
    id: 6,
    name: 'Jorah Mormont',
    company: 'Khaleesi Ltd.'
  },
  '7': {
    id: 7,
    name: 'Lancel Lannister',
    company: 'Westeros Wealth Management'
  }
};

beforeEach(() => {
  wrapped = shallow(
    <Appointments appointments={appointments} patientsMap={patientsMap} />
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('should find Card element', () => {
  //console.log(wrapped.debug());
  expect(wrapped.find('Card').exists()).toBe(true);
  expect(wrapped.find('CardHeader#toggle14').exists()).toBe(true);

  expect(wrapped.render().text()).toContain('Jorah Mormont');
});
