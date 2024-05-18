import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../service/categoryService";
import { showErrorMessage, showSuccessMessage } from "../../utilitis/toaster";
import defaultImage from "../../assets/images/default.jpg";

function CreateOrEditCategoryForm() {
  const [categoryInfo, setCategoryInfo] = useState({
    image: "",
    name: ""
  });
  const [editState, setEditState] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();
  // state for image
  const [categoryImage, setCategoryImage] = useState({
    empty: true,
    file: null,
    filePreview: null,
  });
  // if update mode, get Category detail and fill inputs and image and date picker
  useEffect(() => {
    if (id) {
      CategoryService.getCategoryDetailById(id)
        .then((res) => {
          setEditState(true);
          const data= res.data
          setCategoryInfo(data);
           const img = data.image ? data.image : defaultImage;
           setCategoryImage({ ...categoryImage, filePreview: img });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  //######## handle set image state #################
  const handleImageInputChange = (event) => {
    setCategoryImage({
      empty: false,
      file: event.target.files[0],
      filePreview: URL.createObjectURL(event.target.files[0]),
    });
    
  };
  //######## handle upload image ##################
  const submitUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", categoryImage.file);
    try {
      let res = await CategoryService.uploadImage(formData);
      let data = await res.data;
      if (!data.error) {
        const img = data.fileName;
        return img;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const insertCategory = async (e) => {
    e.preventDefault();

    // upload image
    let result = "";
    if (!categoryImage.empty) {;
      result = await submitUploadImage();
      if (!result) {
        return showErrorMessage("Image upload failed");
      }
      categoryInfo.image = result;
    }

    if (editState) {
      CategoryService.editCategory(id, categoryInfo)

        .then((res) => {
          showSuccessMessage("Edit Category Successful.");
          navigate("/admin-panel/categoryList");
        })
        .catch((error) => showErrorMessage("Edit Category failed."));
    } else {
      CategoryService.createCategory(categoryInfo)
        .then((res) => {
          if (res.status == 400) {
            showErrorMessage(res.data.error);
          } else {
            showSuccessMessage("Create Category Successful.");
            navigate("/admin-panel/categoryList");
          }
        })
        .catch((error) => showErrorMessage("Create Category failed."));
    }
  };

  const cancelAction = () => {
    navigate("/admin-panel/categoryList");
  };
  return (
    <>
      <div className="text-center">
        <h2 className="my-5 text-center">
          {editState ? "Edit Category Form" : "Create Category Form"}
        </h2>
        {categoryImage.filePreview !== null ? (
          <img
            className="previewImg my-3 "
            src={categoryImage.filePreview}
            alt="UploadImage"
          />
        ) : null}
      </div>
      <form className="w-25 m-auto" action="" onSubmit={insertCategory}>
        <div className="col-12">
          <label htmlFor="image" className="form-label d-block fw-bold">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Name:
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={categoryInfo.name}
            onChange={(e) =>
              setCategoryInfo({ ...categoryInfo, name: e.target.value })
            }
          />
        </div>
       
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={cancelAction}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success ms-3">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateOrEditCategoryForm;
