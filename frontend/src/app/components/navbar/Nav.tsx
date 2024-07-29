import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Session } from "./types_nav";
import NavBar from "./components/Navbar";

export default async function Nav() {
  const session: Session | null = await getServerSession(authOptions);

  return <NavBar session={session} />;
}
