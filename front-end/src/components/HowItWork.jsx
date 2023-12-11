import React from "react";
function HowItWork() {
  const image = ["../image/sushi1.jpg"];

  return (
    <div className="  my-7">
      <div className="relative ">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-0 ">
          <img
            className="h-[350px] object-cover"
            src="../image/deliverer.jpg"
            // src="https://marketplace.foodotawp.com/wp-content/uploads/2021/03/post-3-440x250.jpg"
            alt=""
          />
          <img
            className="h-[350px] object-cover"
            src="https://marketplace.foodotawp.com/wp-content/uploads/2021/03/post-2-1-440x250.jpg"
            alt=""
          />
          <img
            className="h-[350px] object-cover"
            src="https://marketplace.foodotawp.com/wp-content/uploads/2021/04/downtown.jpg"
            alt=""
          />
          <img
            className="h-[350px] object-cover"
            src="https://marketplace.foodotawp.com/wp-content/uploads/2021/03/pexels-abhinav-goswami-291528-440x250.jpg"
            alt=""
          />
        </div>
        <div className="absolute h-[350px] bg-black/40 top-0 w-full">
          <div className="mt-10 text-center ">
            <p className="font-extrabold text-orange-300 text-xl uppercase">
              How it works ?
            </p>
            <p className="font-bold text-white text-5xl">Simple Process</p>
          </div>
        </div>
        <div className="absolute gap-3 m-3 top-[200px] md:grid-cols-2  grid lg:grid-cols-3">
          <div className="rounded p-3 bg-white  shadow-md relative  ">
            <img
              className="h-[200px] items-center text-center w-[200px] mb-4 object-cover "
              src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/002-checklist.png"
              alt="no image"
            />
            <h3 className="font-bold font-mono text-orange-500">Your Order</h3>
            <p className="font-bold  text-gray-400">
              Thank you for being valued customer. We are so grateful to serving
              for the honored be clients pleasure of serving hope we meets.
            </p>
            <div className="absolute bg-blue-600 rounded-full h-10 w-10 top-3 text-white font-bold right-3 flex items-center justify-center">
              1
            </div>
          </div>
          <div className="rounded p-3 bg-white  shadow-md relative ">
            <img
              className="h-[200px] items-center text-center w-[200px] mb-4 object-cover"
              src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/001-salary.png"
              alt=""
            />
            <h3 className="font-bold font-mono text-orange-500">
              Cash on Delivery
            </h3>
            <p className="font-bold  text-gray-400">
              Online food Delivery for hiring Gebbeta Foods We appreciate your
              business, and we’ll do best to continue to give you the new kind.
            </p>
            <div className="absolute bg-blue-600 rounded-full h-10 w-10 top-3 text-white font-bold right-3 flex items-center justify-center">
              2
            </div>
          </div>
          <div className="rounded p-3 bg-white  shadow-md relative ">
            <img
              className="h-[200px] items-center text-center w-[200px] mb-4 object-cover"
              src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/003-box.png"
              alt=""
            />
            <h3 className="font-bold font-mono text-orange-500">
              Recieve Order
            </h3>
            <p className="font-bold  text-gray-400">
              We at truly appreciate your business and we’re grateful for the
              trust you’ve placed in us. We sincerely hope you are satisfied .
            </p>
            <div className="absolute bg-blue-600 rounded-full h-10 w-10 top-3 text-white font-bold right-3 flex items-center justify-center">
              3
            </div>
          </div>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <img
          className="w-full object-cover h-[100px]"
          src="https://marketplace.foodotawp.com/wp-content/uploads/2021/03/post-3-440x250.jpg"
          alt=""
        />
      </div>

      {/* PROMTIONS */}
      <div className="grid lg:grid-cols-2   gap-4 lg:mx-3 m-auto  p-4 border">
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-orange-400 text-2xl font-bold">
              Delivery
            </p>
            <p className="text-4xl font-extrabold capitalize">
              Get started Today !
            </p>
            <p className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus porro inventore eveniet sint beatae. Nobis ducimus
              temporibus minus facilis perspiciatis nulla ab unde cupiditate,
              non, iure quia rerum deleniti optio.
            </p>
            <div className="grid lg:grid-cols-2 gap-3">
              <div className="shadow-lg p-3 rounded ">
                <img
                  src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/profit.png"
                  alt=""
                />
                <h3 className="font-bold text-blue-500">Order</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, expedita veritatis cum ipsam officia illo iusto
                  eius, iste corporis distinctio minima! Illo ea ducimus
                  dignissimos expedita delectus itaque praesentium totam?
                </p>
              </div>
              <div className="shadow-lg p-3 rounded ">
                <img
                  src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/promotion.png"
                  alt=""
                />
                <h3 className="font-bold text-blue-500">Restuarants</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolores maiores nihil aut delectus officia dolorum eligendi
                  quae, nulla deserunt reiciendis ad distinctio? Corporis
                  doloremque quae neque quo nobis. Impedit, repellat?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* image */}
        <div>
          <div className="justify-center items-center flex">
            <img
              className="rounded-full"
              src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/ggfg-min.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Our TEAM */}
      <div className=" bg-black/10 p-3 mt-4">
        <div className="text-center">
          <p className="font-bold text-orange-400 text-2xl ">Team Memebers</p>
          <p className="font-extrabold text-4xl ">Meet Our Best Team</p>
          <p className="font-extrabold text-4xl text-orange-500">
            ____ <span className="font-bold">...</span>
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid lg:grid-cols-4 gap-2">
            <div>
              <img
                src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/team1.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/team2.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/team4.png"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/team3.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWork;
