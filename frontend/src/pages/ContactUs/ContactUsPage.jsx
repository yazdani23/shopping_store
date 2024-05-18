import React, { useState } from "react";
import "./ContactUsPage.css";
import ContactService from "../../service/contactService";
import {
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";
import Layout from "../../components/layout/Layout";

function ContactUsPage() {
  // state for email name and user message
  const [form, setForm] = useState({
    email: "",
    name: "",
    message: "",
  });

  // input change handler
  const handleChange = (e) => {
    const newForm = { ...form };
    newForm[e.target.name] = e.target.value;
    setForm(newForm);
  };

  // submit form handler and send message to server
  function handleSubmit(e) {
    e.preventDefault();

    ContactService.sendMessage(form)
      .then((res) => {
        showSuccessMessage("your message successfully sent");
        setForm({
          email: "",
          name: "",
          message: "",
        });
      })
      .catch((err) => showErrorMessageByAxiosError(err));
  }

  return (
    <Layout withoutNavbar>
      <div className="container my-5 w-50 m-auto ">
        <form
          className="form-contact row g-3 needs-validation py-4 px-5 rounded-3 "
          novalidate
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-darkblue-2 mt-0 mb-4">Contact Us</h2>
          <div className="col-12">
            <label for="validationCustom01" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              value={form.name}
              name={"name"}
              onChange={handleChange}
              id="validationCustom01"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-12">
            <label for="validationCustom03" className="form-label">
              Email
            </label>

            <div className="input-group has-validation">
              <input
                type="text"
                className="form-control"
                value={form.email}
                name={"email"}
                onChange={handleChange}
                id="validationCustom03"
                required
              />
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
          </div>

          <div className="col-12">
            <label className="form-check-label" for="invalidCheck">
              Message :
            </label>
            <textarea
              value={form.message}
              name={"message"}
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>

            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
          <div className="col-12 text-center">
            <button
              className="btn bg-warning text-white w-75 p-2"
              type="submit"
            >
              Submit form
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default ContactUsPage;
