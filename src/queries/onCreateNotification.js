export default `subscription OnCreateNotificationSubscription($user_id: String!) {
    onCreateNotification(user_id: $user_id) {
        id
        message
        state
  }
}`;