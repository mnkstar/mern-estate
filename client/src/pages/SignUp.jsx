import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-extrabold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
        />
        <button  className="bg-slate-700 text-white p-3 rounded-lg uppercase  font-extrabold hover:bg-red-500 disabled:bg-slate-700">
          Sign-Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-extrabold">Have an Account?</p>
        <Link to={"/sign-in"}>
            <span className="text-red-700 font-semibold">Sign in!</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
