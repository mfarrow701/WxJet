export default `query GetUserQuery($id: ID!) {
    getUser(id: $id) {
        id
        first_name
        last_name
        nickname
  }
}`;