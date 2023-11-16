import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setformData] = useState({});
  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
      console.log(error);
    },
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
        setformData({ ...formData, avatar: downloadURL })
      );
    }
    )
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-slate-700 font-extrabold text-3xl text-center my-7 uppercase">
        Your Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar|| currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 objecy-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError?
          (<span className="text-red-700 font-semibold">Error in Image upload(image must be less than 2 MB)</span>
          ):filePerc > 0 && filePerc < 100 ? (
            <span className ="text-slate-700">
              {`Uploading ${filePerc} %` }
            </span>)
            :
            filePerc === 100?(
              <span className="text-green-700">
                Image successfully uploaded
              </span>)
              : " "
            }
        </p>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
        ></input>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
        ></input>
        <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 font-semibold text-xl">
          UPDATE PROFILE
        </button>
      </form>
      <div className="flex justify-between mt-2">
        <span className="text-red-700 cursor-pointer font-bold">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-bold">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
