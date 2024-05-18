import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  CATEGORY_EndPoint,
  PRODUCT_EndPoint,
  UPLOAD_IMAGE_EndPoint,
} from "../../../api";
import { showErrorMessage, showSuccessMessage } from "../../utilitis/toaster";
import defaultImage from "../assets/images/default.jpg";
import setHeaders from "../../utilitis/setHeaders";

function CreateOrEditProductForm() {
  const [productInfo, setProductInfo] = useState({
    title: "",
    width: "",
    height: "",
    depth: "",
    weight: "",
    color: "",
    price: "",
    image: "",
    category: "",
    description: "",
    rate: "",
    brand: "",
  });
  const [editState, setEditState] = useState(false);
  const [categories, setCategories] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  // state for image
  const [productImage, setProductImage] = useState({
    empty: true,
    file: null,
    filePreview: null,
  });

  // if update mode, get product detail and fill inputs and image and date picker
  useEffect(() => {
    if (id) {
      fetch(PRODUCT_EndPoint + id, {
        method: "get",
        headers: setHeaders(),
      })
        .then((res) => res.json())
        .then((data) => {
          setEditState(true);
          setProductInfo(data.product);
          const img = data.product.image ? data.product.image : defaultImage;
          setProductImage({ ...productImage, filePreview: img });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetch(CATEGORY_EndPoint, {
      method: "get",
      headers: setHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //######## handle set image state #################
  const handleImageInputChange = (event) => {
    setProductImage({
      empty: false,
      file: event.target.files[0],
      filePreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  //######## handle upload image ##################
  const submitUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", productImage.file);
    try {
      let res = await axios.post(UPLOAD_IMAGE_EndPoint, formData, {
        headers: setHeaders("file"),
      });
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
  /////////// handle submit form /////////////////
  const formHandler = async (e) => {
    e.preventDefault();
    let result = "";
    // upload image
    if (!productImage.empty) {
      result = await submitUploadImage();
      if (!result) {
        return showErrorMessage("Image upload failed");
      }
      productInfo.image = result;
    }

    if (editState) {
      fetch(PRODUCT_EndPoint + id, {
        method: "put",
        headers: setHeaders(),
        body: JSON.stringify(productInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode === 400) {
            showErrorMessage(data.message);
          } else {
            showSuccessMessage("Edit Product Successful.");
            navigate("/admin-panel/productList");
          }
        })
        .catch((error) => showErrorMessage("Edit Product failed."));
    } else {
      fetch(PRODUCT_EndPoint, {
        method: "post",
        headers: setHeaders(),
        body: JSON.stringify(productInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode === 400) {
            showErrorMessage(data.message);
          } else {
            showSuccessMessage("Create Product Successful.");
            navigate("/admin-panel/productList");
          }
        })
        .catch((error) => showErrorMessage("Create Product failed."));
    }
  };
  const cancelAction = () => {
    navigate("/admin-panel/productList");
  };
  return (
    <>
      <div className="text-center">
        <h2 className="my-5 text-center">
          {editState ? "Edit Product Form" : "Create Product Form"}
        </h2>
        {productImage.filePreview !== null ? (
          <img
            className="previewImg mt-3 "
            src={productImage.filePreview}
            alt="UploadImage"
          />
        ) : null}
      </div>
      <form className="w-25 m-auto" action="" onSubmit={formHandler}>
        <div className="col-12">
          <label htmlFor="image" className="form-label d-block">
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
            value={productInfo.name}
            onChange={(e) =>
              setProductInfo({ ...productInfo, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Width
          </label>
          <input
            name="width"
            type="text"
            className="form-control"
            value={productInfo.width}
            onChange={(e) =>
              setProductInfo({ ...productInfo, width: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Height
          </label>
          <input
            name="height"
            type="text"
            className="form-control"
            value={productInfo.height}
            onChange={(e) =>
              setProductInfo({ ...productInfo, height: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Depth
          </label>
          <input
            name="depth"
            type="text"
            className="form-control"
            value={productInfo.depth}
            onChange={(e) =>
              setProductInfo({ ...productInfo, depth: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Weight
          </label>
          <input
            name="weight"
            type="text"
            className="form-control"
            value={productInfo.weight}
            onChange={(e) =>
              setProductInfo({ ...productInfo, weight: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Color
          </label>
          <input
            name="color"
            type="text"
            className="form-control"
            value={productInfo.color}
            onChange={(e) =>
              setProductInfo({ ...productInfo, color: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Price <span className="text-danger">*</span>
          </label>
          <input
            name="price"
            type="text"
            className="form-control"
            value={productInfo.price}
            onChange={(e) =>
              setProductInfo({ ...productInfo, price: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Category <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            onChange={(e) =>
              setProductInfo({ ...productInfo, catId: e.target.value })
            }
          >
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={productInfo.description}
            onChange={(e) =>
              setProductInfo({ ...productInfo, description: e.target.value })
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

export default CreateOrEditProductForm;
