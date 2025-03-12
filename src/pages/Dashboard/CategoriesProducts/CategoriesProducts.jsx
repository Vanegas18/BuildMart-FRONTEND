import {
  categoriesData,
  CategoriesMain,
  HeaderContent,
} from "@/components/Dashboard";
import { FolderTree } from "lucide-react";

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
