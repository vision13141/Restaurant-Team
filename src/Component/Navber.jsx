import React, { useContext, useState, useEffect } from 'react'
import Container from './Container'
import logo6 from "../assets/logo6.png"
import List from './List'
import { FaCartPlus } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Context from '../Context/Context';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { successMessage } from '../Toast/toast';

const Navber = ({ className }) => {

  const list = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Menu",
      path: "/menu",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Contact",
      path: "/contact",
    }
  ]

  const { totalQuantity, CartDropDown, totalFv } = useContext(Context)

  const cartBtn = () => {
    CartDropDown()
  }

  const [dropdown, setdropdown] = useState(false);
  const auth = getAuth();
  const user = auth?.currentUser;

  const [sign, setsign] = useState(false);
  useEffect(() => {
    if (user !== null) {

      setsign(true);
    } else {
      setsign(false);
    }
  }, [auth.currentUser]);

  const HandleUserOpen = () => {
    setdropdown(!dropdown);
  };


  // Log out
  const HandleLogout = () => {
    setdropdown(false);
    signOut(auth)
      .then(() => {
        setsign(false);
        successMessage("Logged out", "top-center", "dark");
      })
      .catch((error) => {
        errorMessage(error.message);
      });
  };

  return (
    <div className={`py-4 z-50 bg-[#ffffff98] backdrop-blur-[2px] left-0 w-full ${className}`}>
      <Container className={"flex items-center justify-between"}>

        <Link to={'/'}>
          <img src={logo6} alt="" className='w-[100px] h-[80px]' />
        </Link>

        <div className="flex items-center">

          <ul className='flex gap-[8px] mr-[200px]'>
            {
              list.map((el, idx) => {
                return (
                  <List to={el.path} key={idx} text={el.name} />
                )
              })
            }
          </ul>


          <div className="flex gap-8 items-center">
            <button className='relative'>
              <IoIosNotifications className='text-2xl' />
              <p className='absolute -top-[14px] -right-3 w-[1.3vw] h-[1.3vw] text-[14px] flex items-center justify-center text-white font-semibold bg-btn rounded-[100%]'>
                0
              </p>
            </button>

            <Link to={'/wishlist'} className='relative'>
              <button className='mt-1'>
                <CiHeart className='text-[26px]' />
                <p className='absolute -top-2 -right-4 w-[1.3vw] h-[1.3vw] text-[14px] flex items-center justify-center text-white font-semibold bg-btn rounded-[100%]'>
                  {totalFv}
                </p>
              </button>
            </Link>


            <button onClick={() => cartBtn()} className='relative'>
              <FaCartPlus className='text-[22px] text-blck' />

              <p className='absolute -top-4 -right-4 w-[1.3vw] h-[1.3vw] text-[14px] flex items-center justify-center text-white font-semibold bg-btn rounded-[100%]'>
                {totalQuantity}
              </p>
            </button>


            <div className="relative">
              <div
                onClick={HandleUserOpen}
                className="text-[30px] text-black cursor-pointer"
              >
                <FaUserCircle />
              </div>
              {/* drop down */}
              {dropdown && (
                <div className="absolute bottom-[-218px] right-0 w-[320px] mx-auto border-2 rounded-lg bg-white py-6 mb-10">
                  <div className="text-center pb-2">
                    <h3 className="font-montserrat font-bold text-lg">
                      Accounts
                    </h3>
                  </div>
                  {sign ? (
                    <div className="flex gap-x-2 justify-center pb-2">
                      <div className="">
                        <button
                          onClick={HandleLogout}
                          className="font-montserrat font-semibold text-md text-white bg-btn border rounded-full py-2 px-8"
                        >
                          Log out
                        </button>
                      </div>
                      <div className="">
                        <Link to={"/details"}>
                          {" "}
                          <button
                            onClick={() => setdropdown(false)}
                            className="font-montserrat font-semibold text-md text-white bg-btn border rounded-full py-2 px-6"
                          >
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-x-2 justify-center pb-2">
                      <div className="">
                        <Link onClick={() => setdropdown(false)} to={"/login"}>
                          <button className="font-montserrat font-semibold text-md text-white bg-btn border rounded-full py-2 px-8">
                            Login
                          </button>
                        </Link>
                      </div>
                      <div className="">
                        <Link onClick={() => setdropdown(false)} to={"/signup"}>
                          <button className="font-montserrat font-semibold text-md text-white bg-btn border rounded-full py-2 px-6">
                            Sign Up
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}

export default Navber