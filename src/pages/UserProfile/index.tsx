import { Spin, message } from "antd";
import { findUserByIdApi } from "api/user";
import { useUserContext } from "contexts/useUserContext";
import { IUser } from "models/user";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gift from "assets/images/gif.png";
import { useTelegramContext } from "contexts/useTelegramContext";
import { RouteName } from "constants/router";

export default function UserProfile() {
  const id: string = useParams().id!;
  const navigate = useNavigate();
  const { showOneTimeBackButton } = useTelegramContext();
  const [loading, setLoading] = useState<boolean>(true);
  const {
    data: { token },
  } = useUserContext();
  const [data, setData] = useState<IUser>();

  useEffect(() => {
    showOneTimeBackButton(() => navigate(RouteName.HOME, { replace: true }));
    findUserByIdApi(id, token).then(({ data, error }) => {
      if (error) message.error(error.message);
      else {
        setData(data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-80px)] flex flex-col">
      {loading ? (
        <div className="w-full flex items-center justify-center grow">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full pt-28 grow flex flex-col bg-dark">
          <div
            className="w-full grow rounded-t-xl"
            style={{ backgroundColor: "rgb(33, 33,33)" }}
          >
            <div className="w-full flex flex-col gap-y-2 items-center justify-center -mt-12">
              <div className="w-[130px] h-[130px] rounded-full bg-slate-100 b border-[5px] border-[rgb(15_15_15)]">
                <div className="relative h-full w-full">
                  <img
                    src={data?.image}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full overflow-clip"
                  />
                </div>
              </div>
              <p className="text-xl font-bold text-white mt-1">{data?.name}</p>
            </div>
            <div className="w-full mt-5"></div>
            <div className="w-full mt-3 px-8">
              <div className="w-full py-3">
                <h1 className="text-white font-normal text-base">
                  {data?.name}
                </h1>
                <p className="text-sm font-normal mt-0.5 text-light-gray">
                  Name
                </p>
              </div>
              {data?.bio && (
                <div className="w-full py-3">
                  <h1 className="text-white font-normal text-base">Bio</h1>
                  <p className="text-sm font-normal mt-0.5 text-light-gray">
                    {data?.bio ?? "Add a few words about yourself."}
                  </p>
                </div>
              )}
              <div className="w-full py-3">
                <h1 className="text-white font-normal text-base">
                  {data?.age}
                </h1>
                <p className="text-sm font-normal mt-0.5 text-light-gray">
                  Age
                </p>
              </div>
              <div className="w-full py-3">
                <h1 className="text-white font-normal text-base capitalize">
                  {data?.gender}
                </h1>
                <p className="text-sm font-normal mt-0.5 text-light-gray">
                  Gender
                </p>
              </div>
              <div className="w-full py-3">
                <h1 className="text-white font-normal text-base">
                  {data?.city}, {data?.country}
                </h1>
                <p className="text-sm font-normal mt-0.5 text-light-gray">
                  Location
                </p>
              </div>
              <div className="w-full py-3">
                <div className="w-full flex items-center gap-x-2">
                  <img src={gift} alt="gift" />
                  <h1 className="text-white font-normal text-base">
                    {data?.gift}
                  </h1>
                </div>
                <p className="text-sm font-normal mt-0.5 text-light-gray">
                  Gift
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
