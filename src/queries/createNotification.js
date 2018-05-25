import gql from 'graphql-tag';

export default gql`
mutation CreateNotificationMutation($message: String!, $state: String!) {
    createNotification(message: $message, state: $state) {
        id
        message
        state
    }
}`;