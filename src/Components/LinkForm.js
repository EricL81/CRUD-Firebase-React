import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const LinkForm = (props) => {
	const initialStateValues = {
		url: "",
		name: "",
		description: "",
	};
	const [values, setValues] = useState(initialStateValues);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const validateURL = (str) => {
		return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
			str
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!validateURL(values.url)) {
			return toast("Invalid URL", {
				type: "warning",
				autoClose: 2500,
				theme: "colored",
			});
		}

		props.addOrEditLink(values);
		setValues({ ...initialStateValues });
	};

	const getLinkById = async (id) => {
		const doc = await db.collection("links").doc(id).get();
		setValues({ ...doc.data() });
	};

	useEffect(() => {
		if (props.currentId === "") {
			setValues({ ...initialStateValues });
		} else {
			getLinkById(props.currentId);
		}
	}, [props.currentId]);

	return (
		<form className="card card-body" onSubmit={handleSubmit}>
			<div className="form-group input-group my-2">
				<div className="input-group-text bg-light">
					<i className="material-icons">insert_link</i>
				</div>
				<input type="text" className="form-control bg-white" placeholder="https://someurl.com" name="url" onChange={handleInputChange} value={values.url} />
			</div>

			<div className="form-group input-group my-2">
				<div className="input-group-text bg-light">
					<i className="material-icons">create</i>
				</div>
				<input type="text" className="form-control bg-white" name="name" placeholder="Website name" onChange={handleInputChange} value={values.name} />
			</div>

			<div className="form-group my-2 ">
				<textarea name="description" className="form-control bg-white" rows="3" placeholder="Write a description" onChange={handleInputChange} value={values.description}></textarea>
			</div>

			<button className="btn btn-warning btn-block my-2">{props.currentId === "" ? "Save" : "Update"}</button>
		</form>
	);
};

export default LinkForm;
