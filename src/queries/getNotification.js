import gql from 'graphql-tag';

export default gql`
query GetNotificationQuery($id: ID!) {
    getNotification(id: $id) {
            id
            message
            state
    }
}`;