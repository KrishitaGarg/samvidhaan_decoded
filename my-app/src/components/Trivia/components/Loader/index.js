import React from 'react';
import { Container, Message, Icon } from 'semantic-ui-react';

const Loader = ({ title, message }) => (
  <Container>
    <Message icon size="big">
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header>{title ? title : 'Please wait.'}</Message.Header>
        {message ? message : 'We are preparing specialised content for you.'}
      </Message.Content>
    </Message>
  </Container>
);

export default Loader;
