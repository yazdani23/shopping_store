import { Link } from "react-router-dom";
import defaultImage from "../../../assets/images/default.jpg";
function RowDataTable({
  number,
  id,
  name,
  image,
  removeCategory
}) {


  return (
    <tr className="">
      <td className='px-3'>{number}</td>
      <td className='px-3'>{name}</td>
      <td className='px-3'>
        <img src={image ? image : defaultImage} alt={image.name} width="70" />
      </td>
      <td className='px-3'>
        <button
          className="btn btn-danger  me-2"
          onClick={() => removeCategory(id)}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
        <Link
          className="btn btn-warning"
          to={`/admin-panel/create-edit-category/${id}`}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
      </td>
    </tr>
  );
}

export default RowDataTable;
