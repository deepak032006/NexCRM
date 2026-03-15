import { useState } from "react";
import { PageKey } from "@/types";

export function useRouter() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const navigate = (p: PageKey) => setPage(p);
  return { page, navigate };
}