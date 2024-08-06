import { BrowserRouter, Route, Routes } from "react-router-dom";
import Status404 from "./pages/Status404";
import ChapaPayment from "./pages/Payments/Chapa";
import { RouteName } from "./constants/router";
import ChapSuccess from "pages/Payments/ChapaSuccess";
import { TelegramProvider } from "contexts/useTelegramContext";
import UserProfile from "pages/UserProfilee";
import BuyVip from "pages/BuyVip";
import Vip from "pages/Vip";
import Chat from "pages/Chat";
import Boost from "pages/Boost";
import { ConfigProvider } from "antd";
import Match from "pages/Matches";
import MyProfile from "pages/MyProfile";
import Withdraw from "pages/Withdraw";
import BaseLayout from "layouts/BaseLayout";
import { lazy } from "react";
import { UserProvider } from "contexts/useUserContext";
import LoaderSuspense from "components/LoaderSuspense";

const HomePage = LoaderSuspense(lazy(() => import("pages/Home")));
const MatchPage = LoaderSuspense(lazy(() => import("pages/Match")));
const ChatTabPage = LoaderSuspense(lazy(() => import("pages/ChatTab")));
const ProfilePage = LoaderSuspense(lazy(() => import("pages/Profile")));
const ProfileEditPage = LoaderSuspense(lazy(() => import("pages/EditProfile")));
const UserProfilePage = LoaderSuspense(lazy(() => import("pages/UserProfile")));
const UserChatPage = LoaderSuspense(lazy(() => import("pages/UserChat")));

function App() {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "rgb(73, 199, 120)" },
        components: {
          InputNumber: {
            colorBgContainer: "transparent",
          },
        },
      }}
    >
      <BrowserRouter>
        <TelegramProvider>
          <UserProvider>
            <Routes>
              <Route path={RouteName.Payment.CHAPA} Component={ChapaPayment} />
              <Route
                path={RouteName.Payment.CHAPA_SUCCESS}
                Component={ChapSuccess}
              />
              <Route path={RouteName.USER_PROFILES} Component={UserProfile} />
              <Route path={RouteName.MY_PROFILE} Component={MyProfile} />
              <Route path={RouteName.WITHDRAW} Component={Withdraw} />
              <Route path={RouteName.BUY_VIP} Component={BuyVip} />
              <Route path={RouteName.VIP} Component={Vip} />
              <Route path={RouteName.CHATS} Component={Chat} />
              <Route path={RouteName.BOOST} Component={Boost} />
              <Route path={RouteName.MATCHes} Component={Match} />
              <Route Component={BaseLayout}>
                <Route path={RouteName.HOME} Component={HomePage} />
                <Route path={RouteName.MATCH} Component={MatchPage} />
                <Route path={RouteName.CHAT_TAB} Component={ChatTabPage} />
                <Route path={RouteName.PROFILE} Component={ProfilePage} />
                <Route
                  path={RouteName.PROFILE_EDIT}
                  Component={ProfileEditPage}
                />
                <Route
                  path={RouteName.USER_PROFILE}
                  Component={UserProfilePage}
                />
                <Route path={RouteName.USER_CHAT} Component={UserChatPage} />
              </Route>
              <Route path="*" Component={Status404} />
            </Routes>
          </UserProvider>
        </TelegramProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
