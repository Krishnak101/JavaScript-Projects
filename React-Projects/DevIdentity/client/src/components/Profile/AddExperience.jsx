import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUserExperience } from "../utils/actions/profile";
import { validateDateRange } from "../utils/validate";
import { setAlertWithTimeOut } from "../utils/actions/alerts";
const AddExperience = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title = useRef(null);
  const company = useRef(null);
  const location = useRef(null);
  const from = useRef(null);
  const currentJob = useRef(true);
  const to = useRef(null);
  const description = useRef(null);

  const [currentJobCheck, setcurrentJobCheck] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateDateRange(
      from.current.value,
      to?.current?.value,
      currentJobCheck
    );
    if (errorMessage) {
      dispatch(setAlertWithTimeOut(errorMessage, "danger"));
      return;
    }
    const experienceFormData = {
      title: title.current.value,
      company: company.current.value,
      location: location.current.value || "",
      from: from.current.value || "",
      current: currentJob.current.checked || false,
      to: !currentJobCheck ? to.current.value : "",
      description: description.current.value || "",
    };
    dispatch(setCurrentUserExperience(experienceFormData, navigate));
  };
  const clearForm = () => {
    return navigate("/dashboard");
  };
  return (
    <div className="register_form_container z-5 absolute bg-black  w-1/3 top-1/5 relative  left-[30%]">
      <h1 className="font-bold text-3xl">Add Your Experience</h1>
      <form
        className="register_form"
        onSubmit={(e) => {
          onFormSubmit(e);
        }}
      >
        <small>* = required field</small>
        <input
          type="text"
          placeholder="* Job Title"
          name="title"
          ref={title}
          required
        />
        <input
          type="text"
          placeholder="* Company"
          name="company"
          ref={company}
          required
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          ref={location}
        />
        <div className="dates">
          <i id="dates_info">* From Date : </i>
          <input
            type="date"
            required
            className="dates_input"
            name="from"
            ref={from}
          />
        </div>
        <p>
          <input
            type="checkbox"
            id="current_box"
            name="current"
            ref={currentJob}
            onChange={() => setcurrentJobCheck(!currentJobCheck)}
          />{" "}
          <label htmlFor="current_box">Current Job</label>
        </p>
        <br></br>
        {!currentJobCheck && (
          <div className="dates">
            <i id="dates_info">* To Date : </i>
            <input
              type="date"
              required
              className="dates_input"
              name="to"
              ref={to}
              disabled={currentJobCheck}
            />
          </div>
        )}

        <textarea
          name="description"
          cols="35"
          rows="3"
          placeholder="Job Description"
          ref={description}
        />
        <div className="form_btns">
          <button type="submit" className="submit_btn btn btn-primary my-1">
            Submit
          </button>
          <button
            type="button"
            className="cancel_btn btn btn-light my-1"
            onClick={clearForm}
          >
            Go Back{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExperience;
