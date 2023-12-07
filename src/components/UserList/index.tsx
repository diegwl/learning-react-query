import { useEffect, useState } from "react";
import { Container } from "./styles";
import { api } from "../../services/api";
import { User } from "../../models/UserModel";
import { UserCard } from "../UserCard";

export function UserList() {
  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setIsError(false)
      setLoading(true)
      const users = await api.getUsers();
      setUserList(users)
    } catch(error) {
      setIsError(true)
    } finally {
      setLoading(false)
    }
    
  }

  function onClickEdit() {

  }

  return (
    <Container>
      <h1>Lista de Usuários</h1>
      {loading && <h3>Carregando...</h3>}
      {isError && <h3>Ocorreu algum Problema </h3>}
      {userList.map(user => <UserCard user={user} onClickEdit={onClickEdit} />)}
    </Container>
  );
}