import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getPetsByShelter } from "./actionsCrudPets";
import FormAddPet from "./components/FormAddPet";
import TablePets from "./components/TablePets";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const id = session?.user.shelter.id;
  const data = await getPetsByShelter(id);
  return (
    <div>
      <h1>DashboardPage</h1>

      <FormAddPet id={id} />

      <TablePets data={data} />
    </div>
  );
}
