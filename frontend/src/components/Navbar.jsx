import { FiPlusSquare } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [mode, setMode] = useState(false);
  return (
    <>
      <div
        className={`"w-full min-h-screen bg-gray-800" ${
          !mode ? "bg-gray-800" : "bg-amber-50"
        }`}
      >
        {/* Navbar */}
        <div className="w-[70%] m-auto p-4 rounded-2xl">
          <div className="flex justify-between text-green-600 font-bold text-3xl">
            <Link to={"/"}>Product</Link>
            <div className="flex flex-row gap-5 items-center">
              <Link to={"/create"} className="cursor-pointer">
                <FiPlusSquare />
              </Link>
              <button className="cursor-pointer" onClick={() => setMode(!mode)}>
                {mode ? <MdModeNight /> : <MdLightMode />}
              </button>
            </div>
          </div>
        </div>
        {/* Main  */}
        <div>
          <Outlet />
        </div>
        {/* <div className={`${!mode ? "text-amber-50" : "text-gray-800"}`}>
          <div className="m-auto w-1/3 h-full bg-gray-600 text-white rounded-2xl mt-10">
            <Outlet />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;
