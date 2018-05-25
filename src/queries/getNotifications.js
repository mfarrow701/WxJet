import gql from 'graphql-tag';

export default gql`
query GetNotificationsQuery {
    getNotifications {
    id
    message
    state
  }
}`;