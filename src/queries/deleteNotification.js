export default `mutation DeleteNotificationMutation($id: ID!) {
    deleteNotification(id: $id) {
        id
        message
        state
    }
}`;