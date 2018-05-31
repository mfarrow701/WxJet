import gql from 'graphql-tag';

export default gql`
mutation CreateNotificationMutation($user_id: String!, $message: String!, $state: String!) {
    createNotification(user_id: $user_id, message: $message, state: $state) {
        id
        user_id
        message
        state
    }
}`;