import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

const EditContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setTitle(currentContact.title);
    setDiscription(currentContact.discription);
    setStatus(currentContact.status);
    setDate(currentContact.date);
  }, [currentContact]);

  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactTitleExists = contacts.filter((contact) =>
      contact.title === title && contact.id !== currentContact.id
        ? contact
        : null
    );
    
    if (!title || !discription || !status || !date) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactTitleExists.length > 0) {
      return toast.error("This email already exists!!");
    }
   
    const data = {
      id: currentContact.id,
      title,
      discription,
      status,
      date,
    };

    updateContact(data);
    toast.success("Contact updated successfully!!");
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Back
        </button>
        <div className="col-md-6 mx-auto shadow p-5 bg-info">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={title}
                  placeholder={"Title"}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={discription}
                  placeholder={"Discription"}
                  onChange={(e) => setDiscription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={status}
                  placeholder={"Status"}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={date}
                  placeholder={"Date"}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
