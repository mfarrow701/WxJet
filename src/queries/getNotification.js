export default `query GetNotificationQuery($id: ID!) {
    getNotification(id: $id) {
        id
        message
        state
    }
}`;