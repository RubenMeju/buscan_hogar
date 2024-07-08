import CardMascota from "./components/CardMascota";

interface PetImage {
  id: number;
  image: string;
  pet: number;
}

export interface typePet {
  id: number;
  images: PetImage[];
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
  microchipped: boolean;
  status: string;
  shelter: number;
}

async function getPets() {
  const res = await fetch("http://127.0.0.1:8000/pets/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getPets();
  return (
    <div>
      <h1>Mascotas en adopcion</h1>
      {data.map((pet: typePet) => (
        <CardMascota key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
