import { fromJS, Map, List } from 'immutable';
import appReducer from '../app';

let initialState;

beforeEach(() => {
  initialState = Map({
    activeTab: '1'
  });
});

it('handles actions of type SET_ACTIVE_TAB', () => {
  const action = {
    type: 'SET_ACTIVE_TAB',
    tab: '2'
  };

  const newState = appReducer(initialState, action);

  expect(newState).toEqual(fromJS({ activeTab: '2' }));
});

it('handles actions of type CREATE_PATIENTS_MAP', () => {
  const patients = [
    {
      id: 4,
      name: 'Joffery Baratheon',
      company: 'Westeros Wealth Management'
    }
  ];

  const action = {
    type: 'CREATE_PATIENTS_MAP',
    data: patients
  };

  const newState = appReducer(initialState, action);

  expect(newState).toEqual(
    Map({
      activeTab: '1',
      patientsMap: {
        '4': {
          id: 4,
          name: 'Joffery Baratheon',
          company: 'Westeros Wealth Management'
        }
      }
    })
  );
});

it('handles actions of type FETCH_PATIENTS_SUCCESS', () => {
  const patients = [
    {
      id: 4,
      name: 'Joffery Baratheon',
      company: 'Westeros Wealth Management'
    },
    {
      id: 2,
      name: 'John Snow',
      company: "Night's Watch"
    },
    {
      id: 6,
      name: 'Jorah Mormont',
      company: 'Khaleesi Ltd.'
    }
  ];

  const action = {
    type: 'FETCH_PATIENTS_SUCCESS',
    data: patients
  };

  const newState = appReducer(initialState, action);

  expect(newState).toEqual(
    Map({
      activeTab: '1',
      patients: [
        {
          id: 4,
          name: 'Joffery Baratheon',
          company: 'Westeros Wealth Management'
        },
        {
          id: 2,
          name: 'John Snow',
          company: "Night's Watch"
        },
        {
          id: 6,
          name: 'Jorah Mormont',
          company: 'Khaleesi Ltd.'
        }
      ]
    })
  );
});

it('handles actions of type FETCH_APPOINTMENTS_SUCCESS', () => {
  const appointments = [
    {
      id: 14,
      datetime: '2017-02-15T18:00:00',
      created_at: '2017-02-10T20:16:55',
      patient_id: 6,
      note: 'B12 shots'
    },
    {
      id: 28,
      datetime: '2017-05-20T07:00:00',
      created_at: '2017-05-16T07:47:00',
      patient_id: 6,
      note: 'Annual physical'
    },
    {
      id: 13,
      datetime: '2017-02-08T10:30:00',
      created_at: '2017-02-07T22:42:37',
      patient_id: 6,
      note: 'Patient was lonely and wanted to be around someone'
    }
  ];

  const action = {
    type: 'FETCH_APPOINTMENTS_SUCCESS',
    data: appointments
  };

  const newState = appReducer(initialState, action);

  expect(newState).toEqual(
    Map({
      activeTab: '1',
      appointments: [
        {
          id: 14,
          datetime: '2017-02-15T18:00:00',
          created_at: '2017-02-10T20:16:55',
          patient_id: 6,
          note: 'B12 shots'
        },
        {
          id: 28,
          datetime: '2017-05-20T07:00:00',
          created_at: '2017-05-16T07:47:00',
          patient_id: 6,
          note: 'Annual physical'
        },
        {
          id: 13,
          datetime: '2017-02-08T10:30:00',
          created_at: '2017-02-07T22:42:37',
          patient_id: 6,
          note: 'Patient was lonely and wanted to be around someone'
        }
      ]
    })
  );
});

it('handles actions of type FETCH_USER_ACTIONS_SUCCESS', () => {
  const userActions = [
    {
      id: 1869,
      patient_id: 5,
      action: 'message',
      datetime: '2017-06-29T22:03:15'
    },
    {
      id: 1868,
      patient_id: 5,
      action: 'message',
      datetime: '2017-06-29T17:13:52'
    }
  ];

  const action = {
    type: 'FETCH_USER_ACTIONS_SUCCESS',
    data: userActions
  };

  const newState = appReducer(initialState, action);

  expect(newState).toEqual(
    Map({
      activeTab: '1',
      userActions: [
        {
          id: 1869,
          patient_id: 5,
          action: 'message',
          datetime: '2017-06-29T22:03:15'
        },
        {
          id: 1868,
          patient_id: 5,
          action: 'message',
          datetime: '2017-06-29T17:13:52'
        }
      ]
    })
  );
});

it('handles actions of unknown type', () => {
  const action = {
    type: 'SOMETHING_NOT_FOUND',
    data: 'not found'
  };

  const newState = appReducer(initialState, action);

  expect(newState).toEqual(
    fromJS({
      activeTab: '1'
    })
  );
});
