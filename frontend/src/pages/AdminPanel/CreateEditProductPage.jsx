import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../assets/images/default.jpg";
import ProductService from "../../service/productService";
import {
  showErrorMessage,
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";

import AdminPanelLayout from "../../components/layout/AdminPanelLayout";
import {
  FormInput,
  FormSelect,
  FormTextArea,
} from "../../components/FormInputs";
import CategoryService from "../../service/categoryService";

// create or update product
function CreateEditProductPage() {
  // id for update product , possible is null
  let { id } = useParams();
  const navigate = useNavigate();
  // state for update or create mode
  const [editState, setEditState] = useState(false);
  // state for image
  const [productImage, setProductImage] = useState({
    empty: true,
    file: null,
    filePreview: null,
  });

  // state for input values
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
    brand: "",
  });

  // if update mode, get product detail and fill inputs and image and date picker
  useEffect(() => {
    if (id) {
      ProductService.getProductDetailById(id)
        .then(({ data }) => {
          setEditState(true);
          setProductInfo(data);
          const img = data.image ? data.image : defaultImage;
          setProductImage({ ...productImage, filePreview: img });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

   const [Categories, setCategories] = useState([]);

   useEffect(() => {
     CategoryService.getCategories()
       .then((res) => {
         setCategories(res.data);
       })
       .catch((error) => console.error(error));
   }, []);

  // Die ganze Form wird leer:
  const clearForm = () => {
    setProductInfo({
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
      brand: "",
    });
    setProductImage({
      empty: true,
      file: null,
      filePreview: null,
    });
  };

  //######## handle set image state #################
  const handleInputChange = (event) => {
    setProductImage({
      ...productImage,
      empty: false,
      file: event.target.files[0],
      filePreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  // handle upload image
  const submitUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", productImage.file);
    try {
      let res = await ProductService.uploadImage(formData);
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

  //######## submit form  #################//
  const formHandler = async (e) => {
    e.preventDefault();
    // validation
    let result;
    // upload image
    if (!productImage.empty) {
      result = await submitUploadImage();
      if (!result) {
        return showErrorMessage("Image upload failed");
      }
    }
    if (result) productInfo.image = result;

    if (editState) {
      // edit product
      ProductService.editProduct(id, productInfo)
        .then(({ data }) => {
          showSuccessMessage(data.message);
          navigate("/admin-panel/productList");
        })
        .catch((error) => showErrorMessageByAxiosError(error));
    } else {
      // create product
      ProductService.addProduct(productInfo)
        .then(({ data }) => {
          showSuccessMessage(data.message);
          navigate("/admin-panel/productList");
        })
        .catch((error) => showErrorMessageByAxiosError(error));
    }
  };

  return (
    <AdminPanelLayout>
      <div className="text-center">
        <h3 className="text-center mt-5">
          {id ? "Update Product" : "Create Product"}
        </h3>
        {productImage.filePreview !== null ? (
          <img
            className="previewImg mt-3 "
            src={productImage.filePreview}
            alt="UploadImage"
          />
        ) : null}
      </div>
      <form
        className="row g-3 needs-validation w-50 m-auto p-5 pt-4"
        noValidate
        onSubmit={formHandler}
      >
        <div className="col-12">
          <label
            htmlFor="validationCustom01"
            className="form-label d-block fw-bold"
          >
            Image <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            className="form-control"
            id="validationCustom01"
            required
            name="image"
            onChange={handleInputChange}
          />

          <div className="valid-feedback">Looks good!</div>
        </div>

        <FormInput
          value={productInfo.title}
          required
          label={"Title"}
          name="title"
          onChange={(e) =>
            setProductInfo({ ...productInfo, title: e.target.value })
          }
        />

        <FormSelect
          label="CategoryItem"
          required
          value={productInfo.category}
          onChange={(e) =>
            setProductInfo({ ...productInfo, category: e.target.value })
          }
          options={Categories.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />
        <FormInput
          name="width"
          type="number"
          value={productInfo.width}
          required
          label={"Width (cm)"}
          placeholder="example: 150"
          onChange={(e) =>
            setProductInfo({ ...productInfo, width: e.target.value })
          }
        />
        <FormInput
          name="height"
          type="number"
          value={productInfo.height}
          required
          label={"Height (cm)"}
          placeholder="example: 90"
          onChange={(e) =>
            setProductInfo({ ...productInfo, height: e.target.value })
          }
        />
        <FormInput
          name="depth"
          type="number"
          value={productInfo.depth}
          required
          label={"Depth (cm)"}
          placeholder="example: 110"
          onChange={(e) =>
            setProductInfo({ ...productInfo, depth: e.target.value })
          }
        />
        <FormInput
          name="weight"
          type="number"
          value={productInfo.weight}
          required
          label={"Weight (kg)"}
          placeholder="example: 50"
          onChange={(e) =>
            setProductInfo({ ...productInfo, weight: e.target.value })
          }
        />
        <FormInput
          name="color"
          type="text"
          value={productInfo.color}
          required
          label={"Color"}
          onChange={(e) =>
            setProductInfo({ ...productInfo, color: e.target.value })
          }
        />

        <FormInput
          name="brand"
          type="text"
          value={productInfo.brand}
          required
          label={"Brand"}
          onChange={(e) =>
            setProductInfo({ ...productInfo, brand: e.target.value })
          }
        />
        <FormInput
          name="price"
          type="number"
          value={productInfo.price}
          required
          label={"Price"}
          onChange={(e) =>
            setProductInfo({ ...productInfo, price: e.target.value })
          }
        />

        <FormTextArea
          name="description"
          label={"Description"}
          required
          value={productInfo.description}
          onChange={(e) =>
            setProductInfo({ ...productInfo, description: e.target.value })
          }
        />

        <div className="col-12 text-center">
          <button className="btn btn-warning" type="reset" onClick={clearForm}>
            Clear
          </button>

          {/* Wenn "agree"-Checkbox ist noch nicht angehakt, "Send" Button wird disable */}
          <button className={`btn btn-success ms-3 `} type="submit">
            Save
          </button>
        </div>
      </form>
    </AdminPanelLayout>
  );
}

export default CreateEditProductPage;
