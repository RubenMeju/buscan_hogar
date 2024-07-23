import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <h1>ProfilePage</h1>
      {session.user.role === "admin" && <h2>Admin DEV</h2>}
      {session.user.role === "shelter" && (
        <h2>
          Tienes rol: <strong>Shelter</strong>
        </h2>
      )}

      <h3>
        Usuario asociado al refugio:
        <strong> {session.user.shelter?.name}</strong>
      </h3>

      <h3>
        Nombre:
        <strong> {session.user.name}</strong>
      </h3>

      <h3>
        Email:
        <strong> {session.user.email}</strong>
      </h3>
    </div>
  );
}
