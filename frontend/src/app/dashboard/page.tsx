import { getPetsByShelter } from "./actionsCrudPets";
import FormAddPet from "./components/FormAddPet";
import TablePets from "./components/TablePets";

export default async function DashboardPage() {
  const data = await getPetsByShelter();
  //  console.log("Las mascotas de la protectora : ", data);
  return (
    <div>
      <h1>DashboardPage</h1>

      <FormAddPet />

      <TablePets data={data} />
    </div>
  );
}
