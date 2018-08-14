import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledCollapse
} from 'reactstrap';
import Moment from 'react-moment';

export default ({
  appointments,
  messagesMap,
  patients,
  fetchUserActions,
  fetchAppointments
}) => {
  const onToggle = id => {
    fetchUserActions(id, 'message');
    fetchAppointments(id);
  };

  const renderAppointments = () => {
    const DATE_FORMAT = 'MMMM D YYYY, h:mm:ss a';

    return appointments.map(appointment => {
      return (
        <tr key={appointment.id}>
          <td>
            <Moment format={DATE_FORMAT}>{appointment.datetime}</Moment>
          </td>
          <td>{appointment.note}</td>
          <td>
            <Moment format={DATE_FORMAT}>{appointment.created_at}</Moment>
          </td>
        </tr>
      );
    });
  };

  const renderPatientItems = (appointments, messagesMap, patients) => {
    return patients.map(patient => {
      let messageCount = Object.keys(messagesMap).length
        ? messagesMap[patient.id]
        : null;
      return (
        <Card key={patient.id}>
          <CardHeader
            id={'toggle' + patient.id}
            onClick={() => onToggle(patient.id, 'message')}
          >
            {patient.name}&nbsp;
          </CardHeader>
          <UncontrolledCollapse toggler={'#toggle' + patient.id}>
            <CardBody>
              <Table>
                <thead>
                  <tr>
                    <td>
                      <div className="cont">
                        <div className="circle red">{messageCount}</div>
                        <div className="message">Messages</div>
                      </div>
                    </td>
                    <td />
                    <td className="company">{patient.company}</td>
                  </tr>
                </thead>
              </Table>

              <Table dark striped>
                <thead>
                  <tr>
                    <td>Appointment Date</td>
                    <td>Notes</td>
                    <td>Created On</td>
                  </tr>
                </thead>
                <tbody>{renderAppointments()}</tbody>
              </Table>
            </CardBody>
          </UncontrolledCollapse>
        </Card>
      );
    });
  };

  return <div>{renderPatientItems(appointments, messagesMap, patients)}</div>;
};
