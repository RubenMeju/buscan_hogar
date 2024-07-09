import Carrousel from "../Carrousel";

async function getPetBySlug(slug: string) {
  console.log("llega el slug: ", slug);
  const res = await fetch(`http://127.0.0.1:8000/pets/slug/${slug}/`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function DetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPetBySlug(params.slug);
  const {
    images,
    name,
    species,
    breed,
    age,
    gender,
    size,
    description,
    vaccinated,
    neutered,
    microchipped,
    status,
    shelter,
  } = data;
  console.log(data);
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <Carrousel name={name} images={images} />
        </div>
        <h1 className="text-3xl font-bold mt-6">{name}</h1>
        <div className="flex flex-wrap justify-center mt-4 space-x-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {species}
          </span>
          <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {breed}
          </span>
          <span className="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {size}
          </span>
          <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {age}
          </span>
          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {gender}
          </span>
        </div>
        <p className="mt-6 text-gray-700">{description}</p>
        <div className="mt-6">
          <span className="block bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {shelter}
          </span>
          <span className="block bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded mt-2">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
