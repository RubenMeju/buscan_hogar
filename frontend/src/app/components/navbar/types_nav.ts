// types.ts
export interface Session {
  user: User;
  // La fecha de expiración puede ser parte del objeto de sesión, así que la incluimos aquí
  expires: string;
}

interface User {
  name: string;
  email: string;
  image: string;
  id: string;
  access: string;
  role: string;
  shelter: Shelter;
  refresh: string;
}

interface Shelter {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  twitter: string;
}
