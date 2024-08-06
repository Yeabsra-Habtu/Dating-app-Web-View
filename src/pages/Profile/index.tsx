import { Button } from "antd";
import EditIcon from "components/icons/EditIcon";
import { RouteName } from "constants/router";
import { useTelegramContext } from "contexts/useTelegramContext";
import { useUserContext } from "contexts/useUserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const {
    data: { data },
  } = useUserContext();
  const { showOneTimeBackButton } = useTelegramContext();
  const handleShowBackButton = () => {
    showOneTimeBackButton(() => {
      navigate(-1);
    });
  };

  return (
    <div className="w-full h-[calc(100dvh-80px)] flex flex-col">
      <div className="w-full pt-28 grow flex flex-col bg-dark">
        <div
          className="w-full grow rounded-t-xl"
          style={{ backgroundColor: "rgb(33, 33,33)" }}
        >
          <div className="w-full flex flex-col gap-y-2 items-center justify-center -mt-12">
            <div className="w-[130px] h-[130px] rounded-full bg-slate-100 b border-[5px] border-[rgb(15_15_15)]">
              <div className="relative h-full w-full">
                <img
                  src={data.image}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full overflow-clip"
                />
                <Link
                  to={RouteName.PROFILE_EDIT}
                  onClick={handleShowBackButton}
                  className="absolute right-0 top-4 h-8 w-8 rounded-full flex items-center justify-center bg-dark"
                  style={{
                    color: "rgb(135, 116, 225)",
                  }}
                >
                  <EditIcon />
                </Link>
              </div>
            </div>
            <p className="text-xl font-bold text-white mt-1">{data.name}</p>
          </div>
          <div className="w-full mt-5"></div>
          <div className="w-full mt-3 px-5">
            <div className="w-full py-3">
              <h1 className="text-white font-normal text-base">{data.name}</h1>
              <p className="text-sm font-normal mt-0.5 text-light-gray">Name</p>
            </div>
            {data.bio && (
              <div className="w-full py-3">
                <h1 className="text-white font-normal text-base">Bio</h1>
                <p className="text-sm font-normal mt-0.5 text-light-gray">
                  {data.bio ?? "Add a few words about yourself."}
                </p>
              </div>
            )}
            <div className="w-full py-3">
              <h1 className="text-white font-normal text-base">{data.age}</h1>
              <p className="text-sm font-normal mt-0.5 text-light-gray">Age</p>
            </div>
            <div className="w-full py-3">
              <h1 className="text-white font-normal text-base">
                {data.gender}
              </h1>
              <p className="text-sm font-normal mt-0.5 text-light-gray">
                Gender
              </p>
            </div>
            <div className="w-full py-3">
              <h1 style={{ color: "rgb(135, 116, 225)" }} className="text-base">
                Account
              </h1>
              <p className="text-sm font-normal text-light-gray">
                Upgrade to Pro for just $10 and see who has liked you while
                browsing through your feed.
              </p>
              <Button className="mt-5 text-white animate-button p-2 text-center font-bold h-12 border-transparent w-full">
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
