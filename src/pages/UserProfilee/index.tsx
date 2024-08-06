import hear from "assets/images/heart.png";
import pin from "assets/images/pin.png";
import gift from "assets/images/gif.png";
import logo from "assets/images/logo.jpeg";
import { useEffect, useState } from "react";
import { getUserByIdApi } from "api/user";
import { useParams } from "react-router-dom";
import { Spin, message } from "antd";
import { IUser } from "models/user";

export default function UserProfile() {
  const id = useParams().id;
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id)
      getUserByIdApi(id).then(({ data, error }) => {
        if (data) {
          setLoading(false);
          setUser(data);
        } else message.error(error!.message);
      });
    else message.error("User id not found");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full text-[#323235]">
      {loading ? (
        <div className="w-full flex p-8 min-h-screen justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto min-h-screen flex flex-col">
          <div className="relative profile-top-gradient pt-4 pb-6">
            <div className="w-full flex items-center pl-5 gap-x-2">
              <p className="text-sm font-bold text-white">Tindu</p>
              <img src={hear} alt="heart" />
            </div>
            <img
              src={user?.image}
              alt="profile"
              width={200}
              height={200}
              className="rounded-full mx-auto z-20 relative w-[200px] h-[200px] object-cover"
              style={{ boxShadow: "0px 4px 8px rgba(0,0,0,.25)" }}
            />
          </div>
          <div className="grow bg-white rounded-2xl relative -my-12 z-10 py-12 px-6">
            <div className="w-full flex items-center gap-x-3">
              <h1 className="font-bold text-3xl">{user?.name}</h1>
              <p className="font-normal text-3xl">{user?.age}</p>
            </div>
            <div className="w-full pt-6 flex flex-col gap-2">
              <div className="w-full flex items-center gap-x-5">
                <img src={pin} alt="location" />
                <p className="font-normal text-base">{user?.country}</p>
              </div>
              <div className="w-full flex items-center gap-x-5">
                <img src={gift} alt="gift" />
                <p className="font-normal text-base">{user?.gift}</p>
              </div>
              <div className="w-full flex items-center gap-x-5">
                {user?.photoUrls.length! > 0 &&
                  user?.photoUrls.map((photo, index) => (
                    <div
                      key={index}
                      className="w-24 h-24 rounded-lg overflow-hidden shadow-inner  "
                    >
                      <img
                        src={photo}
                        alt={"name"}
                        className="w-full h-full object-cover"
                      ></img>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full profile-bottom-gradient pb-6 pt-[70px] relative">
            <div className="bg-purple-500 shadow-md rounded-md p-4 max-w-lg mx-auto">
              {user?.questions &&
                user.questions.map((question) => (
                  <div className="bg-white shadow-md rounded-md p-4 max-w-lg mx-auto">
                    <h2 className="text-xl font-bold mb-4">
                      {question.question}
                    </h2>
                    <p className="text-gray-800 mb-6">{question.answer}</p>
                  </div>
                ))}
            </div>
            <div
              className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.76)" }}
            >
              <img src={logo} alt="logo" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
