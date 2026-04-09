import { Link } from 'react-router-dom';

type Props = {
    id: number;

  name: string;
  imageUrl: string;
};

export default function PokemonCard({ id,name, imageUrl }: Props) {
  return (
    <Link to={`/pokemon/${id}`}>
      <div className="p-4 border rounded hover:shadow-lg transition" >
        <img src={imageUrl} alt={name} className="mx-auto w-24 h-24" />
        <h2 className="text-center mt-2 capitalize">{name}</h2>
      </div>
    </Link>
  );
}
