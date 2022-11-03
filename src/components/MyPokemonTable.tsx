import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getRoute } from "src/services";
import { APP_ROUTES } from "src/utils/enums";
import { SavedPokemon } from "src/utils/types";

interface Props {
  pokemons: SavedPokemon[];
  releasePokemon: (index: number) => void;
}

const MyPokemonTable = ({ pokemons, releasePokemon }: Props) => {
  const navigate = useNavigate();
  const handleRowClick = (id: number) => {
    const route = getRoute(APP_ROUTES.POKEMON_DETAIL, id.toString());
    navigate(route);
  };

  const handleReleasePokemon = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    releasePokemon(index);
  };

  const renderTableBody = () =>
    pokemons.map((info, index) => (
      <tr key={index} onClick={() => handleRowClick(info.id)}>
        <td>{info.id}</td>
        <td className="text-capitalize">{info.nickName}</td>
        <td className="text-capitalize">{info.name}</td>
        <td className="text-capitalize">
          <Button
            className="w-100"
            onClick={(e) => handleReleasePokemon(e, index)}
            variant="link"
          >
            Release
          </Button>
        </td>
      </tr>
    ));
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nick Name</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>{renderTableBody()}</tbody>
    </Table>
  );
};

export default MyPokemonTable;
