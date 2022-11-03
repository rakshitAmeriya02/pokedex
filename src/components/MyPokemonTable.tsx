import { Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getRoute } from "src/services";
import { APP_ROUTES } from "src/utils/enums";
import { SavedPokemon } from "src/utils/types";

interface Props {
  pokemons: SavedPokemon[];
}

const MyPokemonTable = ({ pokemons }: Props) => {
  const navigate = useNavigate();
  const handleRowClick = (id: number) => {
    const route = getRoute(APP_ROUTES.POKEMON_DETAIL, id.toString());
    navigate(route);
  };

  const renderTableBody = () =>
    pokemons.map((info, index) => (
      <tr key={index} onClick={() => handleRowClick(info.id)}>
        <td>{info.id}</td>
        <td className="text-capitalize">{info.nickName}</td>
        <td className="text-capitalize">{info.name}</td>
      </tr>
    ));
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nick Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>{renderTableBody()}</tbody>
    </Table>
  );
};

export default MyPokemonTable;
