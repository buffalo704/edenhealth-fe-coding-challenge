import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Col,
  Row,
  UncontrolledCollapse
} from 'reactstrap';
import Moment from 'react-moment';

export default ({ appointments, patientsMap }) => {
  const renderAppointmentItems = () => {
    const DATE_FORMAT = 'MMMM D YYYY, h:mm:ss a';

    return appointments.map(appointment => {
      let name = Object.keys(patientsMap).length
        ? patientsMap[appointment.patient_id].name
        : '';

      return (
        <Card key={appointment.id}>
          <CardHeader id={'toggle' + appointment.id}>
            <Container>
              <Row>
                <Col>
                  <Moment format={DATE_FORMAT}>{appointment.datetime}</Moment>
                </Col>
                <Col>{name}</Col>
              </Row>
            </Container>
          </CardHeader>
          <UncontrolledCollapse toggler={'#toggle' + appointment.id}>
            <CardBody>
              <Table striped>
                <thead>
                  <tr>
                    <td style={{ textAlign: 'left' }}>Notes</td>
                  </tr>
                </thead>
                <tbody>
                  <tr key={appointment.id}>
                    <td style={{ textAlign: 'left' }}>{appointment.note}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </UncontrolledCollapse>
        </Card>
      );
    });
  };

  return <div>{renderAppointmentItems()}</div>;
};
