import { connect } from "react-redux";
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { addUser } from "../../store/actions/UserAction";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditUser(props) {
  const navigate  = useNavigate();
  const dispatch = useDispatch()
  const { register, handleSubmit, setValue, getValue, reset, watch, formState: { errors }, clearErrors } = useForm({
    defaultValues: {
      id:"",
      name: "",
      lastname: "",
      email: "",
      phone: "",
      gender:"male"
    }
  });
  useEffect(() => {
    var user = props.editUserDetail;
    if(Object.keys(user).length > 0){
      const fields = ['name', 'lastname', 'email', 'phone', 'gender'];
      fields.forEach(field => setValue(field, user[field]));
    }
  }, [props.editUserDetail]);
  const onSubmit = (data) => {
    console.log(props.editUserDetail.id);
    // props.editUserDetail.id
    const allUsers = props.users;
    const users = allUsers.map(obj => {
      if (obj.id === props.editUserDetail.id) {
        return {...data, id: props.editUserDetail.id};
      }
      else
      {
        return obj;
      }
    })
    console.log(users);
    dispatch({
      type: 'UPDATE_USER',
      payload: users
    })
    props.handleEditModalClose(true);
  }
  return (
    <>
      <Modal show={props.show} onHide={() => { clearErrors();props.handleEditModalClose(); }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="form" noValidate="" >
          <Modal.Body>
            <div className="row">
              <div className="col-md-12"> 
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">First name</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="text"
                        {...register("name", { required: true })}
                      />
                      {errors.name && <span className="text-danger">Firstname is required</span>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Last name</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="text" 
                        {...register("lastname", { required: true })}
                      />
                      {errors.lastname && <span className="text-danger">Lastname is required</span>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Email</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="email" 
                        {...register("email", { required: true, pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Entered value does not match email format"
                              }
                        })}
                      />
                      {errors.email && errors.email.type === "required" && <span className="text-danger">Email is required</span>}
                      {errors.email && errors.email.type === "pattern" && <span className="text-danger">Invalid e-mail address.</span>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Phone</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="number"  
                        {...register("phone", { required: true })}
                      />
                      {errors.phone && <span className="text-danger">Phone is required</span>}
                    </div>
                  </div>
                  <div className="form-group row mb-5">
                    <label className="col-lg-3 col-form-label form-control-label">Gender</label>
                    <div className="col-lg-9 text-left">
                       
                      <div className="form-check form-check-inline mt-2 ml-4">
                        <input type="radio" {...register("gender",{ required: true }) } className="form-check-input mt-1" name="gender" value="male" />
                        <span className="form-check-label">Male</span>
                      </div>
                      <div className="form-check form-check-inline mt-2 ml-4">
                        <input type="radio" {...register("gender",{ required: true }) } className="form-check-input mt-1" name="gender" value="female" />
                        <span className="form-check-label">Female</span>
                      </div>
                    </div>
                    <br/>
                  </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleEditModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
const  mapStateToProps = (state) => {
  return {
    users: state.user.users
  }
};
export default connect(mapStateToProps,{ })(EditUser);
