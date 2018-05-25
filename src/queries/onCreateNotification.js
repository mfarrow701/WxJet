import gql from 'graphql-tag';

export default gql`
subscription OnCreateNotificationSubscription {
    onCreateNotification {
    id
    message
    state
  }
}`;