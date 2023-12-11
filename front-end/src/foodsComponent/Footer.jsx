import React from "react";
import {
  FaFacebook,
  FaGit,
  FaGithub,
  FaInstagram,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="mt-10">
      <div className="bg-black/50  mt-4 grid grid-cols-2 lg:grid-cols-4  gap-2 lg:gap-3  bottom-0 font-bold p-2 text-white ">
        <div className="  flex justify-center items-center list-none">
          <div>
            
          </div>
        </div>
        <div className="flex justify-center items-center list-none font bold p-2  ">
          <div>
            
          </div>
        </div>
        <div className="flex justify-center items-center list-none font bold p-2  ">
          <div>
           
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div>
            <p className="text-center">Contact us</p>
            <div className=" lg:flex items-center grid sm:grid-cols-2 justify-center list-none gap-3 ">
              <li className="">
                <FaFacebook size={30} className="text-blue-500" />
              </li>
              <li>
                <FaInstagram size={30} className="text-purple-500" />
              </li>
              <li>
                <FaTwitter size={30} className="text-blue-300" />
              </li>
              <li>
                <FaGithub size={30} />
              </li>
              <li>
                <FaTelegram size={30} />
              </li>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 bg-orange-400 p-4">copyright</div>
    </div>
  );
}

export default Footer;
