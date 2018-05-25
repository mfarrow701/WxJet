import gql from 'graphql-tag';

export default gql`
mutation DeleteNotificationMutation($id: String!) {
    deleteNotification(id: $id) {
        id
        message
        state
    }
}`;