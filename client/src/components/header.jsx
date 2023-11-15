import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500" style={{ fontSize: "2.0em" }}>
            Get
          </span>
          <span className="text-slate-700" style={{ fontSize: "2.0em" }}>
            Estate
          </span>
          </h1>
        </Link>
        <form
          className="bg-slate-100 p-3 rounded-lg flex items-center"
          style={{ fontSize: "1.5em" }}
        >
          <input
            type="text"
            placeholder="Search properties..."
            className="bg-slate-100 text-slate-800 focus:outline-none w-24 sm:w-80"
          />
          <FaSearch className="text-slate-600"></FaSearch>
        </form>
        <ul className="flex gap-4">
            <Link to='/'><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
            <Link to='/about'> <li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
            <Link to='sign-in'>  <li className='text-slate-700 hover:underline'>Sign-in</li></Link>
            <Link to='sign-up'>  <li className='text-slate-700 hover:underline'>Sign-up</li></Link>
        </ul>
      </div>
    </header>
  );
}
