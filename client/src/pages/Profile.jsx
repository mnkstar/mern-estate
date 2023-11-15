import { useSelector } from "react-redux"

function Profile() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
     <h1 className="text-slate-700 font-extrabold text-3xl text-center my-7 uppercase">Your Profile</h1>
     <form className ="flex flex-col gap-4" >
      <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 objecy-cover cursor-pointer self-center mt-2" id='username' />
      <input type="text" placeholder="Username"  className="border p-3 rounded-lg focus:outline-none" id="email"></input>
      <input type="email" placeholder="Email" className="border p-3 rounded-lg focus:outline-none" id="password"></input>
      <input type="password" placeholder="Password" className="border p-3 rounded-lg focus:outline-none"></input>
      <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 font-semibold text-xl">UPDATE PROFILE</button>
     </form>
     <div className="flex justify-between mt-2">
      <span className="text-red-700 cursor-pointer font-bold">
        Delete Account
      </span>
      <span className="text-red-700 cursor-pointer font-bold">
       Sign out
      </span>
     </div>
    </div>
  )
}

export default Profile
