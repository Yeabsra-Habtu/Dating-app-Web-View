import { Button, Input, Spin } from "antd";
import SendIcon from "components/icons/SendIcon";
import SentIcon from "components/icons/SentIcon";
import { IChat } from "models/chat";
import userAvatar from "assets/images/user-avatar.png";
import anonymousAvatar from "assets/images/anonymous.jpeg";
import moment from "moment";
import useUserChat from "hooks/useUserChat";

export default function UserChat() {
  const { data, handleInputChange, handleSendMessage, input, receiverId } =
    useUserChat();

  return (
    <div className="w-full min-h-screen flex flex-col">
      {data.loading ? (
        <div className="w-full flex p-8 justify-center items-center grow">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <header className="fixed bg-dark z-10 top-0 left-0 w-full px-4 py-3 shadow-md shadow-gray-700">
            <div className="flex w-full items-center gap-x-3">
              <div className="relative">
                <img
                  src={
                    data.receiver._id
                      ? data.data[0]?.anonymiseUserId === data.receiver._id
                        ? anonymousAvatar
                        : data.receiver.image
                      : userAvatar
                  }
                  className="w-12 h-12 max-w-12 rounded-full object-cover overflow-clip relative"
                  alt="profile"
                />
                <div className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="w-full">
                <p className="text-base font-semibold text-gray-300">
                  {data.data[0]?.anonymiseUserId === data.receiver._id
                    ? "Anonymous"
                    : data.receiver.name}
                </p>
                {!data.receiver.is_online && (
                  <span className="text-xs font-normal text-gray-300 block">
                    last seen {moment(data.receiver.last_seen).fromNow()}
                  </span>
                )}
              </div>
            </div>
          </header>
          <main className="w-full py-20">
            <div className="w-full px-6 grow">
              {data.data.map((chat, key) =>
                chat.sender._id === receiverId ? (
                  <ReceiverMessage key={key} chat={chat} />
                ) : (
                  <SenderMessage chat={chat} key={key} />
                )
              )}
            </div>
          </main>
          <footer className="fixed bg-dark bottom-0 left-0 w-full border-t border-t-gray-700 px-2 py-3 flex items-end gap-x-3 shadow-2xl">
            <Input
              value={input}
              onChange={handleInputChange}
              type="text"
              className="message-input w-full bg-primary rounded-md px-4 py-3 text-sm font-normal border border-gray-700 outline-none placeholder-white"
              placeholder="Type a message..."
            />
            <Button
              disabled={input.trim().length === 0}
              onClick={handleSendMessage}
              className="h-full py-2.5 px-4 text-2xl flex items-center justify-center send-btn disabled:bg-primary disabled:text-gray-400"
              type="primary"
            >
              <SendIcon />
            </Button>
          </footer>
        </>
      )}
    </div>
  );
}

function SenderMessage({ chat }: { chat: IChat }) {
  return (
    <div className="w-full flex items-start gap-x-2.5 mt-4 justify-end">
      <div className="w-full max-w-80 p-4 bg-gray-600 text-white rounded-s-xl rounded-ee-xl">
        <div className="w-full flex gap-x-2 items-center">
          <span className="text-sm font-semibold">{chat.sender.name}</span>
        </div>
        <p className="w-full py-2.5 font-normal text-sm">{chat.message}</p>
        <div className="w-full flex gap-x-1 items-end justify-end">
          <span className="text-xs font-normal text-white">
            {new Date().getHours()}:{new Date().getMinutes()}
          </span>
          <span className="text-base font-normal text-white">
            <SentIcon />
          </span>
        </div>
      </div>
      <img
        className="h-10 w-10 rounded-full overflow-clip"
        alt="profile"
        src={chat.sender.image}
      />
    </div>
  );
}
function ReceiverMessage({ chat }: { chat: IChat }) {
  return (
    <div className="w-full flex items-start gap-x-2.5 mt-4">
      <img
        className="h-10 w-10 rounded-full overflow-clip"
        alt="profile"
        src={
          chat.sender._id === chat.anonymiseUserId
            ? anonymousAvatar
            : chat.sender.image
        }
      />
      <div className="w-full max-w-80 p-4 bg-gray-400 rounded-e-xl rounded-es-xl shadow-sm">
        <div className="w-full flex gap-x-2 items-center">
          <span className="text-sm font-semibold text-gray-900">
            {chat.sender._id === chat.anonymiseUserId
              ? "Anonymous"
              : chat.sender.name}
          </span>
        </div>
        <p className="w-full py-2.5 text-gray-900 font-normal text-sm">
          {chat.message}
        </p>
        <div className="w-full flex gap-x-1 items-end justify-end">
          <span className="text-xs font-normal text-gray-500">
            {moment(chat.createdAt).format("h:mm")}
          </span>
          <span className="text-base font-normal text-gray-500">
            <SentIcon />
          </span>
        </div>
      </div>
    </div>
  );
}
