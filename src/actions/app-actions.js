export const ADD_COUNTER = (amount = 1) => ({
  type: 'ADD_COUNTER',
  amount
});

export const SUB_COUNTER = (amount = 1) => ({
  type: 'SUB_COUNTER',
  amount
});

export const SET_ACTIVE_TAB = (tab = 1) => ({
  type: 'SET_ACTIVE_TAB',
  tab: tab
});

export const FETCH_PATIENTS_REQUEST = () => ({
  type: 'FETCH_PATIENTS_REQUEST'
});

export const FETCH_PATIENTS_SUCCESS = data => ({
  type: 'FETCH_PATIENTS_SUCCESS',
  data: data
});

export const CREATE_PATIENTS_MAP = data => ({
  type: 'CREATE_PATIENTS_MAP',
  data: data
});

export const FETCH_PATIENTS_FAIL = () => ({
  type: 'FETCH_PATIENTS_FAIL'
});

export const FETCH_APPOINTMENTS_REQUEST = () => ({
  type: 'FETCH_APPOINTMENTS_REQUEST'
});

export const FETCH_APPOINTMENTS_SUCCESS = data => ({
  type: 'FETCH_APPOINTMENTS_SUCCESS',
  data: data
});

export const FETCH_APPOINTMENTS_FAIL = () => ({
  type: 'FETCH_APPOINTMENTS_FAIL'
});

export const CREATE_MESSAGES_MAP = data => ({
  type: 'CREATE_MESSAGES_MAP',
  data: data
});

export const FETCH_USER_ACTIONS_REQUEST = () => ({
  type: 'FETCH_USER_ACTIONS_REQUEST'
});

export const FETCH_USER_ACTIONS_SUCCESS = data => ({
  type: 'FETCH_USER_ACTIONS_SUCCESS',
  data: data
});

export const FETCH_USER_ACTIONS_FAIL = () => ({
  type: 'FETCH_USER_ACTIONS_FAIL'
});

const ROOT_URL = 'https://eden-interview-api.herokuapp.com';

const paramBuilder = args => {
  return Object.keys(args).reduce(
    (prev, key, i) => `${prev}${i !== 0 ? '&' : ''}${key}=${args[key]}`,
    ''
  );
};

export const FETCH_PATIENTS = () => {
  return dispatch => {
    dispatch(FETCH_PATIENTS_REQUEST());

    const args = {
      _sort: 'name',
      _order: 'asc'
    };

    const param = paramBuilder(args);
    return fetch(`${ROOT_URL}/patients?${param}`)
      .then(res => res.json())
      .then(data => {
        dispatch(FETCH_PATIENTS_SUCCESS(data));
        dispatch(CREATE_PATIENTS_MAP(data));
      })
      .catch(() => {
        dispatch(FETCH_PATIENTS_FAIL());
      });
  };
};

export const FETCH_APPOINTMENTS = patientId => {
  return dispatch => {
    dispatch(FETCH_APPOINTMENTS_REQUEST());

    const args = {
      _sort: 'datetime',
      _order: 'desc'
    };

    if (patientId) {
      args['patient_id'] = patientId;
    }

    const param = paramBuilder(args);
    return fetch(`${ROOT_URL}/appointments?${param}`)
      .then(res => res.json())
      .then(data => dispatch(FETCH_APPOINTMENTS_SUCCESS(data)))
      .catch(() => dispatch(FETCH_APPOINTMENTS_FAIL()));
  };
};

export const FETCH_USER_ACTION = (patientId, userAction) => {
  const args = {
    _sort: 'datetime',
    _order: 'desc'
  };

  if (patientId) {
    args['patient_id'] = patientId;
  }

  if (userAction) {
    args['action'] = userAction;
  }

  const param = paramBuilder(args);

  return dispatch => {
    dispatch(FETCH_USER_ACTIONS_REQUEST());

    return fetch(`${ROOT_URL}/user_actions?${param}`)
      .then(res => res.json())
      .then(data => {
        dispatch(FETCH_USER_ACTIONS_SUCCESS(data));
        dispatch(CREATE_MESSAGES_MAP(data));
      })
      .catch(() => dispatch(FETCH_USER_ACTIONS_FAIL()));
  };
};

//let fetches = [dispatch(FETCH_PATIENTS()), dispatch(FETCH_APPOINTMENTS())];

export const grabAll = () => {
  return dispatch => {
    Promise.all([dispatch(FETCH_PATIENTS()), dispatch(FETCH_APPOINTMENTS())]);
  };
};

export const AppActions = {
  ADD_COUNTER,
  SUB_COUNTER,
  SET_ACTIVE_TAB,
  FETCH_PATIENTS,
  FETCH_APPOINTMENTS,
  FETCH_USER_ACTION,
  grabAll
};
