export interface User {
  id: number;
  username: string;
  password: string;
  age: number;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface UserState {
  users: User[];
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  pageSize: number;
  searchTerm: string;
  sortField: string;
  sortOrder: "asc" | "desc";
  filterAge: string;
}

export interface FormData {
  npwp: string;
  nama: string;
  kodePajak: string;
  negara: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamat: string;
  label: string;
  email: string;
  website: string;
  firstName: string;
  lastName: string;
}

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  birthDate: string;
  image: string;
  address: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
  company: {
    name: string;
    title: string;
    department: string;
  };
}

export interface AuthContextType {
  user: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}
