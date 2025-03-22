import { HeaderContent } from "@/modules/Dashboard/Layout";
import { FolderTree } from "lucide-react";
import { categoriesData } from "./data/categoriesData";
import { CategoriesMain } from "./CategoriesMain";

export const CategoriesProducts = () => {
  return (
    <main className="flex-1 overflow-auto p-6">
      <HeaderContent
        title={"Gestión de Categorías"}
        info={"Administra las categorías de productos"}
        newInfo={"Nueva Categoría"}
        icon={FolderTree}
      />

      <CategoriesMain data={categoriesData} />
    </main>
  );
};
