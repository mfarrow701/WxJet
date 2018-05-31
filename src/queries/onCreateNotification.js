import gql from 'graphql-tag';

export default gql`
subscription OnCreateNotificationSubscription($user_id: String!) {
    onCreateNotification(user_id: $user_id) {
    id
    message
    state
  }
}`;