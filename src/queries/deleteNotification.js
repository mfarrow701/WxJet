import gql from 'graphql-tag';

export default gql`
mutation DeleteNotificationMutation($id: ID!) {
    deleteNotification(id: $id) {
        id
        message
        state
    }
}`;