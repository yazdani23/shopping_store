import { Link } from "react-router-dom";
import AdminPanelLayout from "../../components/layout/AdminPanelLayout";
import DataTable from "../../components/Category/CategoryTable/DataTable";

function CategoriesListPage() {
  return (
    <AdminPanelLayout>
      <h2 className="my-5 text-center">The List Of Categories</h2>
      <Link
        to="/admin-panel/create-edit-category"
        className="btn btn-success mb-4"
      >
        Create New Category
      </Link>
      <DataTable />
    </AdminPanelLayout>
  );
}

export default CategoriesListPage;
