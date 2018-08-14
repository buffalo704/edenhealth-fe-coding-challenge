import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mapActionsToPropTypes } from '../../../lib/util';
import { AppActions } from '../../../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import PatientsList from './components/PatientsList';
import Appointments from './components/Appointments';

class Overview extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    actions: mapActionsToPropTypes(AppActions).isRequired,
    patients: PropTypes.array,
    patientsMap: PropTypes.object,
    messagesMap: PropTypes.object,
    appointments: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.actions.FETCH_PATIENTS();
  }

  toggle(tab) {
    const { actions } = this.props;
    if (this.props.activeTab !== tab) {
      actions.SET_ACTIVE_TAB(tab);
    }

    switch (tab) {
      case '1':
        this.props.actions.FETCH_PATIENTS();
        break;
      case '2':
        this.props.actions.FETCH_APPOINTMENTS();
        break;
      default:
    }
  }

  render() {
    const {
      patients,
      actions,
      patientsMap,
      messagesMap,
      appointments
    } = this.props;

    return (
      <div className="boundary">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              Patients List
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Appointments
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.props.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h5>PATIENTS LIST</h5>
                <PatientsList
                  appointments={appointments}
                  patients={patients}
                  messagesMap={messagesMap}
                  fetchUserActions={actions.FETCH_USER_ACTION}
                  fetchAppointments={actions.FETCH_APPOINTMENTS}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <h5>APPOINTMENTS</h5>
                <Appointments
                  appointments={appointments}
                  patientsMap={patientsMap}
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default connect(
  state => ({
    counter: state.getIn(['app', 'counter']),
    patients: state.getIn(['app', 'patients']),
    patientsMap: state.getIn(['app', 'patientsMap']),
    messagesMap: state.getIn(['app', 'messagesMap']),
    appointments: state.getIn(['app', 'appointments']),
    activeTab: state.getIn(['app', 'activeTab'])
  }),
  dispatch => ({
    actions: bindActionCreators(AppActions, dispatch)
  })
)(Overview);
