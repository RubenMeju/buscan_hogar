import FormAddPet from "./components/FormAddPet";
import TablePets from "./components/TablePets";

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/pets/?shelter=1");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function DashboardPage() {
  const data = await getData();
  console.log("Las mascotas de la protectora : ", data);
  return (
    <div>
      <h1>DashboardPage</h1>
      <TablePets data={data} />
    </div>
  );
}
