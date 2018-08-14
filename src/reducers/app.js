import { Map, fromJS } from 'immutable';

const initialState = Map({
  counter: 0,
  patients: [],
  patientsMap: {},
  messagesMap: {},
  appointments: [],
  userActions: [],
  activeTab: '1'
});

export default function app(state = initialState, action = {}) {
  const { type, ...payload } = action;

  switch (type) {
    case 'ADD_COUNTER':
      return state.set('counter', state.get('counter') + payload.amount);

    case 'SUB_COUNTER':
      return state.set('counter', state.get('counter') - payload.amount);

    case 'SET_ACTIVE_TAB':
      return state.setIn(['activeTab'], fromJS(payload.tab));
    //return state.set("activeTab", payload.tab);

    case 'CREATE_PATIENTS_MAP':
      let patientsMap = {};
      for (let patient of payload.data) {
        patientsMap[patient.id] = patient;
      }
      return state.set('patientsMap', patientsMap);

    case 'FETCH_PATIENTS_SUCCESS':
      return state.set('patients', payload.data);

    case 'FETCH_APPOINTMENTS_SUCCESS':
      return state.set('appointments', payload.data);

    case 'FETCH_USER_ACTIONS_SUCCESS':
      return state.set('userActions', payload.data);

    case 'CREATE_MESSAGES_MAP':
      let messagesMap = state.get('messagesMap');
      messagesMap[payload.data[0].patient_id] = payload.data.length;
      return state.updateIn(['messagesMap'], messageMap =>
        Object.assign({}, messageMap)
      );
    default:
      return state;
  }
}
