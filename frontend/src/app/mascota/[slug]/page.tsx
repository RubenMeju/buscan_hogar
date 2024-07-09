import { Image } from "@nextui-org/react";

async function getPetBySlug(slug) {
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

  console.log("imagenes: " + JSON.stringify(images));
  return (
    <div>
      <h1>{name}</h1>
      <span>{species}</span>
      <span>{breed}</span>

      <span>{size}</span>

      <span>{age}</span>
      <span>{gender}</span>
      <p>{description}</p>
      <span>{shelter}</span>

      <span>{status}</span>

      {images.map((item) => (
        <div key={item.id}>
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={item.name}
            className="w-full object-cover h-[140px]"
            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${item.image}`}
          />
        </div>
      ))}
    </div>
  );
}
