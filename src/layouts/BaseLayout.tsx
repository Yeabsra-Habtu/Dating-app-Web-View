import { Spin, message } from "antd";
import { loginApi } from "api/auth";
import ChatIcon from "components/icons/ChatIcon";
import HomeIcon from "components/icons/HomeIcon";
import MatchIcon from "components/icons/MatchIcon";
import ProfileIcon from "components/icons/ProfileIcon";
import { RouteName, includeHomeRoute } from "constants/router";
import { useTelegramContext } from "contexts/useTelegramContext";
import { useUserContext } from "contexts/useUserContext";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export default function BaseLayout() {
  const { pathname: path, search } = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const { setData } = useUserContext();
  const { initData } = useTelegramContext();

  useEffect(() => {
    const query = path.startsWith(`${RouteName.MATCH}`)
      ? `${search}&user=${`{"id":${7453169187}}`}`
      : initData;
    loginApi(query).then(({ data, error }) => {
      if (error) message.error(error.message);
      else {
        setData(data);
        setLoading(false);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full bg-[#212121]">
      <div className="w-full min-h-dvh max-w-xl mx-auto flex flex-col">
        {loading ? (
          <div className="w-full flex grow items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="w-full grow overflow-y-auto">
              <Outlet />
            </div>
            {includeHomeRoute(path) ? (
              <div className="w-full py-2 text-gray-500 dark:text-white text-xs flex items-center">
                <NavLink
                  to={RouteName.HOME}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[rgb(135_116_225)]"
                        : "text-[rgb(rgb(170_170_170)]"
                    } h-full flex flex-col items-center justify-center w-1/3 gap-y-1.5 font-normal text-xs"`
                  }
                >
                  <HomeIcon />
                  <p>Home</p>
                </NavLink>
                <NavLink
                  to={RouteName.MATCH}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[rgb(135_116_225)]"
                        : "text-[rgb(rgb(170_170_170)]"
                    } h-full flex flex-col items-center justify-center w-1/3 gap-y-1.5 font-normal text-xs"`
                  }
                >
                  <MatchIcon />
                  <p>Matches</p>
                </NavLink>
                <NavLink
                  to={RouteName.CHAT_TAB}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[rgb(135_116_225)]"
                        : "text-[rgb(rgb(170_170_170)]"
                    } h-full flex flex-col items-center justify-center w-1/3 gap-y-1.5 font-normal text-xs"`
                  }
                >
                  <ChatIcon />
                  <p>Chat</p>
                </NavLink>
                <NavLink
                  to={RouteName.PROFILE}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[rgb(135_116_225)]"
                        : "text-[rgb(rgb(170_170_170)]"
                    } h-full flex flex-col items-center justify-center w-1/3 gap-y-1.5 font-normal text-xs"`
                  }
                >
                  <ProfileIcon />
                  <p>Profile</p>
                </NavLink>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}
