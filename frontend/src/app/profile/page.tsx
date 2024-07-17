import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>ProfilePage</h1>
      {session.user.role === "Admin" && <h2>Admin</h2>}

      <span>{session.user.name}</span>
      <span>{session.user.email}</span>
    </div>
  );
}
