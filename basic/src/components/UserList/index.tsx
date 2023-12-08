import { Container } from "./styles";
import { api } from "../../services/api";
import { UserCard } from "../UserCard";
import { useQuery } from "react-query";
import { EditModal } from "../EditModal";
import { useState } from "react";
import { User } from "../../models/UserModel";

export function UserList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data, isError, isLoading } = useQuery("user-list", api.getUsers);

  return (
    <Container>
      <h1>Lista de Usuários</h1>
      {isLoading && <h3>Carregando...</h3>}
      {isError && <h3>Ocorreu algum Problema </h3>}
      {data?.map((user) => (
        <UserCard user={user} onClickEdit={() => setSelectedUser(user)} />
      ))}
      {selectedUser && (
        <EditModal
          user={selectedUser}
          show={!!selectedUser}
          handleClose={() => setSelectedUser(null)}
        />
      )}
    </Container>
  );
}
