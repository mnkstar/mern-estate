import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUSerStart,
  deleteUserSuccess,
  singOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import {Link} from "react-router-dom";

function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setformData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const[showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setformData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUSer = async () => {
    try{
       dispatch(deleteUSerStart());
       const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE"
       });
       const data = await res.json();
       if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
       }
       dispatch(deleteUserSuccess(data));
    }catch(error){
      dispatch(deleteUserFailure(error.message))
    }
  };

  const handleSignOut = async () => {

    try {
      dispatch(singOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  const handleShowLisitings =async()=>{
      try{
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if(data.success ===  false){
          setShowListingsError(true);
          return;
        }

        setUserListings(data);
      }catch(error){
       setShowListingsError(true);
      }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-slate-700 font-extrabold text-3xl text-center my-7 uppercase">
        Your Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 objecy-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700 font-semibold">
              Error in Image upload(image must be less than 2 MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded</span>
          ) : (
            " "
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update your profile"}
        </button>
       <Link className="bg-green-700 text-white font-semibold p-3 rounded-lg uppercase text-center hover:opacity-90" to={'/create-listing'}>
       Create Listing
       </Link>
      </form>
      <div className="flex justify-between mt-2">
        <span
          onClick={handleDeleteUSer}
          className="text-red-700 cursor-pointer font-bold"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer font-bold">Sign out</span>
      </div>
    
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated Successfully!" : "Not updated "}
      </p>
      <button onClick={handleShowLisitings} className="w-full text-green-700 uppercase font-semibold hover:underline">
        Show Listings
      </button>
      <p className ='text-red-700 mt-5'>{showListingsError?'Error showing listing' : ''}</p>
      {userListings && userListings.length > 0 && 
      <div className=" flex flex-col gap-4">
        <h1 className="text-center my-t text-2xl font-semibold">Your Listings</h1>
         {userListings.map((listing)=>(
      <div  key={listing._id} className="border rounded-lg p-3 flex justify-between items-center ">
          <Link to ={`/listing/${listing._id}`}>{listing.title}
          <img src = {listing.imageUrls[0]} alt = "listing cover" className="h-16 w-16 object-contain" />
          </Link>
         <Link  className='text-slate-700 font-semibold rounded-lg flex-1 gap-6  hover:underline truncate flex-col' to ={`/listing/${listing._id}`}>
          <p >
            {listing.name}
          </p>
         </Link>
         <div className="flex item-center gap-3">
          <button className="text-red-700 uppercase font-semibold">
              Delete
          </button>
          <button className="text-green-700 uppercase font-semibold">
             Edit
          </button>
         </div>
          </div>))}
        </div>
     }
      
    </div>
  );
}

export default Profile;
