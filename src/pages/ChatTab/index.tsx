import { Spin, message } from "antd";
import { mineChatsApi } from "api/chat";
import HeartIcon from "components/icons/HeartIcon";
import { RouteName } from "constants/router";
import { useTelegramContext } from "contexts/useTelegramContext";
import { useUserContext } from "contexts/useUserContext";
import { IChatList } from "models/chat";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import anonymousAvatar from "assets/images/anonymous.jpeg";

export default function ChatTab() {
  const navigate = useNavigate();
  const { showOneTimeBackButton } = useTelegramContext();
  const [data, setData] = useState<IChatList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    data: {
      token,
      data: { _id },
    },
  } = useUserContext();

  useEffect(() => {
    mineChatsApi(token).then(({ data, error }) => {
      if (error) message.error(error.message);
      else {
        setData(data!);
        setLoading(false);
      }
    });
  }, []);

  const handleShowBackButton = () => {
    showOneTimeBackButton(() => {
      navigate(-1);
    });
  };
  return (
    <div className="w-full h-[calc(100dvh-80px)] flex flex-col">
      <div className="w-full pt-10 pb-5">
        <div className="mx-auto p-5 rounded-full flex items-center justify-center h-24 w-24 bg-dark">
          <HeartIcon />
        </div>
        <div className="w-5/6 mt-5 text-center mx-auto">
          <h1 className="text-2xl text-white font-bold">People You've Chat.</h1>
          <p className="text-sm mt-2 text-light-gray">
            These are people that you have chat with. Reach out and connect with
            them.
          </p>
        </div>
      </div>
      <div className="w-full pt-6 bg-dark"></div>
      {loading ? (
        <div className="w-full flex grow items-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full pt-12 px-6 flex flex-col gap-y-3 pb-8">
          {data.length > 0 ? (
            data.map((chat) => (
              <ChatCard
                _id={_id}
                chat={chat}
                key={chat._id}
                handleShowBackButton={handleShowBackButton}
              />
            ))
          ) : (
            <p className="text-center text-light-gray">No Chats !</p>
          )}
        </div>
      )}
    </div>
  );
}
function ChatCard({
  chat,
  handleShowBackButton,
  _id,
}: {
  _id: string;
  chat: IChatList;
  handleShowBackButton: () => void;
}) {
  const isAnonymous = useMemo(() => {
    if (chat.anonymiseUserId) {
      if (chat.anonymiseUserId !== _id) return true;
      return false;
    } else return false;
  }, [chat._id]);
  return (
    <Link
      onClick={handleShowBackButton}
      to={RouteName.USER_CHAT.replace(":id", chat._id)}
      className="flex items-center gap-4 p-3 rounded-xl bg-gray-950"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden shadow-inner">
        <img
          src={isAnonymous ? anonymousAvatar : chat.image}
          alt={isAnonymous ? "Anonymous" : chat.name}
          className="object-cover h-14 w-14 max-w-14 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <h3 className="text-lg font-semibold text-white">
          {isAnonymous ? "Anonymous" : chat.name}
        </h3>
        <p className="text-xs text-light-gray">
          {moment(chat.lastMessageTime).format("DD, MMM YYYY")}
        </p>
      </div>
    </Link>
  );
}
