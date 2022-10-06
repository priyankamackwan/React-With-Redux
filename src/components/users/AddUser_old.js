import { connect } from "react-redux";
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { addUser } from "../../store/actions/UserAction";
import {NotificationContainer, NotificationManager} from 'react-notifications';

function AddUser({ users }) {
  const navigate  = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      gender:"male"
    }
  });
  const onSubmit = (data) => {
    addUser(data,(success) => {
      if(success){
        NotificationManager.success('User added successfully!', 'Success');
        navigate('/');
      }
      else
      {
        NotificationManager.error('Something went wrong!', 'Error');
      }
    });
  }
  return (
    <div className="container py-3 text-center">
      <div className="row">
        <div className="col-md-12"> 
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card card-outline-secondary">
                <div className="card-header">
                  <h3 className="mb-0">Add User Information</h3>
                </div>
                <div className="card-body">
                  <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="form" noValidate="" >
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
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Gender</label>
                      <div className="form-check mt-2 ml-4">
                        <input type="radio" {...register("gender",{ required: true }) } className="form-check-input mt-1" name="gender" value="male" />
                        <label className="form-check-label">Male</label>
                      </div>
                      <div className="form-check mt-2 ml-4">
                        <input type="radio" {...register("gender",{ required: true }) } className="form-check-input mt-1" name="gender" value="female" />
                        <label className="form-check-label">Female</label>
                      </div>
                      <br/>
                    </div>
                    <div className="form-group row">
                      <div className="col-lg-12">
                        <input className="btn btn-primary" type="submit" value="Save" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const  mapStateToProps = (state) => {
  return {
    users: state.user.users
  }
};
export default connect(mapStateToProps,{ })(AddUser);
