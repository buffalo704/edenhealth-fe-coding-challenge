import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  SET_ACTIVE_TAB,
  FETCH_PATIENTS,
  FETCH_APPOINTMENTS,
  FETCH_USER_ACTION
} from '../app-actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SET_ACTIVE_TAB', () => {
  it('has the correct type', () => {
    const action = SET_ACTIVE_TAB();

    expect(action.type).toEqual('SET_ACTIVE_TAB');
  });

  it('has the correct payload', () => {
    const action = SET_ACTIVE_TAB('4');

    expect(action.tab).toEqual('4');
  });
});

describe('async actions', () => {
  const API_URL = 'https://eden-interview-api.herokuapp.com';

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates FETCH_PATIENTS_SUCCESS when fetching patients has been done', () => {
    fetchMock.getOnce(`${API_URL}/patients?_sort=name&_order=asc`, {
      body: { patients: ['this is my list of patients'] },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: 'FETCH_PATIENTS_REQUEST' },
      {
        type: 'FETCH_PATIENTS_SUCCESS',
        data: { patients: ['this is my list of patients'] }
      },
      {
        type: 'CREATE_PATIENTS_MAP',
        data: { patients: ['this is my list of patients'] }
      }
    ];
    const store = mockStore({ patients: [] });

    return store.dispatch(FETCH_PATIENTS()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_APPOINTMENTS_SUCCESS when fetching appointments has been done', () => {
    fetchMock.getOnce(`${API_URL}/appointments?_sort=datetime&_order=desc`, {
      body: { appointments: ['this is my list of appointments'] },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: 'FETCH_APPOINTMENTS_REQUEST' },
      {
        type: 'FETCH_APPOINTMENTS_SUCCESS',
        data: { appointments: ['this is my list of appointments'] }
      }
    ];
    const store = mockStore({ patients: [] });

    return store.dispatch(FETCH_APPOINTMENTS()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_USER_ACTION_SUCCESS when fetching user actions has been done', () => {
    fetchMock.getOnce(`${API_URL}/user_actions?_sort=datetime&_order=desc`, {
      body: { userActions: ['this is my list of user actions'] },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: 'FETCH_USER_ACTIONS_REQUEST' },
      {
        type: 'FETCH_USER_ACTIONS_SUCCESS',
        data: { userActions: ['this is my list of user actions'] }
      },
      {
        type: 'CREATE_MESSAGES_MAP',
        data: { userActions: ['this is my list of user actions'] }
      }
    ];
    const store = mockStore({ patients: [] });

    return store.dispatch(FETCH_USER_ACTION()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_USER_ACTION_FAIL when fetching user actions is rejected', () => {
    fetchMock.getOnce(
      `${API_URL}/user_actions?_sort=datetime&_order=desc&patient_id=1&action=messages`,
      Promise.reject('error')
    );

    const expectedActions = [
      { type: 'FETCH_USER_ACTIONS_REQUEST' },
      {
        type: 'FETCH_USER_ACTIONS_FAIL'
      }
    ];
    const store = mockStore({ messages: [] });

    return store.dispatch(FETCH_USER_ACTION(1, 'messages')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
