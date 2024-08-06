import { Spin, message } from "antd";
import { getUserByIdApi } from "api/user";
import logo from "assets/images/logo.jpeg";
import { IUser } from "models/user";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useLocation } from "react-router-dom";
import { RouteName } from "constants/router";

export default function BuyVip() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const token = queryParams.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token) as any;
        setUserId(decoded.userId);
        if (decoded.suggestedId) {
          getUserByIdApi(decoded.suggestedId).then(({ data, error }) => {
            if (data) {
              setLoading(false);
              setUser(data);
            } else message.error(error!.message);
          });
        } else setLoading(false);
      } catch (_) {
        message.error("Invalid token");
      }
    } else message.error("Token not found");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full min-h-screen">
      {loading ? (
        <div className="w-full flex p-8 min-h-screen justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full min-h-screen flex flex-col">
          <div className="flex w-full items-center flex-col vip-top-gradient px-4 pt-1 pb-6 rounded-br-[50%] rounded-bl-[40%]">
            <img src={logo} alt="logo" height={40} className="h-10" />
            <h1 className="font-bold text-2xl py-2 text-white">
              Telegram Dating
            </h1>
          </div>
          <div className="w-full mt-8">
            <div className="w-full px-4">
              {user ? (
                <div className="w-full border-[3px] border-[#40677c] bg-[#edeff6] p-3 rounded-xl flex  items-center gap-x-4">
                  <div className="border-[3px] border-[#40677c] rounded-full">
                    <img
                      src={user?.image}
                      alt="user"
                      height={70}
                      width={70}
                      className="h-[70px] w-[70px] max-w-[70px] rounded-full object-cover"
                    />
                  </div>
                  <div className="w-full">
                    <div className="w-full font-semibold text-base">
                      <p>{user?.name}</p>
                      <p>liked you!</p>
                    </div>
                    <div className="w-full font-semibold text-xs mt-1">
                      <p>Get VIP and Start Chatting</p>
                      <p>Right Now</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full text-center">
                  <div className="w-full font-bold text-xl">
                    <h1>Special Promotion!</h1>
                    <h1>Final Days, Hurry Up!</h1>
                  </div>
                  <p className="text-sm">Save you money while activating VIP</p>
                </div>
              )}
              <p className="w-full mt-10 font-bold text-sm">
                With VIP you will get:
              </p>
              <div className="w-full mt-4 pl-1 text-sm font-normal flex flex-col gap-y-2 py-2">
                <p>✅ See who likes you</p>
                <p>✅ Unlimited access to all profiles</p>
                <p>✅ Access to “Stories” filters</p>
                <p>✅ Get matches faster</p>
                <p>✅ + 1,000 coins each month</p>
                <p>✅ Personal support</p>
                <p>✅ No ads</p>
              </div>
            </div>
          </div>
          <div className="grow" />
          <div className="w-full p-4">
            <Link
              to={RouteName.VIP.replace(":id", userId!)}
              className="rounded-xl bg-[#49c778] w-full text-center py-5 px-3 text-white block text-sm font-bold"
            >
              👉 GET VIP 👈
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
