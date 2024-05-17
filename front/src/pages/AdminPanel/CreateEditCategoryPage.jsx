import CreateOrEditCategoryForm from "../../components/Category/CreateOrEditCategoryForm";
import AdminPanelLayout from "../../components/layout/AdminPanelLayout";

function CreateEditCategory() {
  return (
    <AdminPanelLayout>
      <CreateOrEditCategoryForm />
    </AdminPanelLayout>
  );
}

export default CreateEditCategory;
