import { Button } from "react-bootstrap";
import { api } from "../../services/api";
import { CharacterCard } from "../CharacterCard";

import { Container, CurrentPageText, PaginationBox } from "./styles";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function CharacterList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => api.getCharacters(page),
    placeholderData: keepPreviousData,
    staleTime: 60000,
  });

  return (
    <Container>
      <h1>Lista de Personagens</h1>

      {isLoading && "Carregando..."}
      {isError && "Erro"}

      {data?.results?.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}

      {isError || isLoading || <PaginationBox>
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page == 1}
        >
          Página anterior
        </Button>
        <CurrentPageText>Página atual: {page}</CurrentPageText>
        <Button
          onClick={() => setPage((old) => data?.info.next ? old + 1 : old)}
          disabled={data?.info.next==null}
        >
          Próxima Página
        </Button>
      </PaginationBox>}
    </Container>
  );
}
