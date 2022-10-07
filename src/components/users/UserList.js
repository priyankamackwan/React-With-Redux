import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PaginationComponent from "./PaginationComponent";
import { useState, useEffect } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Button from 'react-bootstrap/Button';
import EditUser from "./EditUser";
import { deleteUser as deleteAction } from "../../store/actions/UserAction";

function UserList({ users }) {
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(5);
  const [userData, setUserData] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [editUserDetail, setEditUserDetail] = useState({});
  const handleEditModalClose = (updated=false) => { 
    // close edit modal
    loadData(1);
    setModalShow(false); 
  }
  // open edit modal
  const handleEditModalShow = () => setModalShow(true);

  useEffect(() => {
    loadData(1);
  },[users, searchVal]);

  const loadData = (page) =>{
    // get user data based on search and pagination
      setPage(page);
      if(searchVal != ""){
        users = users.filter((ele) => {
          return (ele.name.toLowerCase().includes(searchVal) || ele.lastname.toLowerCase().includes(searchVal) || ele.email.toLowerCase().includes(searchVal));
        });
      }
      setTotalRecords(users.length);
      setUserData(users.slice((page-1) * limit, ((page -1) + 1) * limit));
      // axios
      //     .get(`https://reqres.in/api/users?page=`+page)
      //     .then(res => {

      //         const data = res.data;
      //         console.log('data>>>>',data)
      //         this.setState({
      //             data: data.data,
      //             totalRecords : data.total ? data.total : 0,
      //             limit : data.per_page ? data.per_page : 6
      //         })
      //     });

  }
  const getPaginatedData = (page) => {
    // get data on click of pagination link
    loadData(page);
  }
  const handleEditUser = (userId) => {
    // get user details to edit
    const edituser  = users.filter(object => {
        return object.id === userId;
    });
    if(edituser.length > 0) { setEditUserDetail(edituser[0]); }
    setModalShow(true);
  }
  const confirmDeleteUser = (id) => {
    // confirmation dialog for delete user
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure to delete this user ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteUser(id)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }
  const deleteUser = (id) => {
    // delete users
    deleteAction(id,() => {
      loadData(1);
      NotificationManager.success('User deleted successfully!', 'Success');
    });
  }
  return (
      <>
        <EditUser 
          handleEditModalClose={handleEditModalClose} 
          handleEditModalShow={handleEditModalShow}
          show={modalShow}
          editUserDetail = {editUserDetail}
        />
        <div className="container mt-5">
          <Link to="/add"><button className='btn btn-primary float-end mt-2 mb-4 '>Add User</button></Link>
          <br/>
          <br/>
          <br/>
          <input type="text" className='float-end mb-2' placeholder="Search" onChange={(e) => setSearchVal(e.target.value.toLowerCase())}/>
          <table className="table table-hover table-bordered  table-striped table-sm">
            <thead>
              <tr className="table-primary">
                  <th>Sr No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { userData.map((user,index) => (
                  <tr className='table table-light' key={index*page}>
                    <td>{ (page - 1) * limit + index + 1 }</td>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleEditUser(user.id)}>
                        Edit
                      </Button>
                      <Button variant="danger" className="ml-2" onClick={() => confirmDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              )}
              {userData.length <=0 && 
                <tr><td colspan="5" align="center" className="font-weight-bold">No users exist</td></tr>
              }
            </tbody>
          </table>
          {userData.length > 0 && users.length > limit &&
              <PaginationComponent
                  getAllData={getPaginatedData}
                  totalRecords={totalRecords}
                  itemsCountPerPage = {limit} 
                  activePage={page} />
          }
        </div>
    </>
  );
}
const  mapStateToProps = (state) => {
  return {
    users: state.user.users
  }
};
export default connect(mapStateToProps,{ })(UserList);
