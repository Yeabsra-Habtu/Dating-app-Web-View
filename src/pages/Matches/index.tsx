import { useEffect, useState } from "react";
import { Spin, Tabs, message } from "antd";
import { IMatch } from "models/match";
import { getMatch } from "api/match";
import { useNavigate, useParams } from "react-router-dom";
import { generateChatTokenApi } from "api/user";
import { getAllChats } from "api/chat";
import { IChatList } from "models/chat";
import { RouteName } from "constants/router";

const { TabPane } = Tabs;

export default function MatchPage() {
  const id = useParams().id!;
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [chats, setChats] = useState<IChatList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMatch(id).then(async ({ data, error }) => {
      if (data) {
        setLoading(false);

        const matchesData = Array.isArray(data) ? data : [data];
        setMatches(matchesData);
      } else {
        console.log("error", error);
      }
    });
    getAllChats(id).then(async ({ data, error }) => {
      if (data) {
        setLoading(false);
        const chatData = Array.isArray(data) ? data : [data];
        setChats(chatData);
        console.log("Chat Data", chatData);
      } else {
        console.log("error", error);
      }
    });
    // chatUserApi().then(async ({ data }) => {});
    // eslint-disable-next-line
  }, []);

  const handleNavigation = async (chat: IChatList) => {
    const { data, error } = await generateChatTokenApi(id);
    if (data) {
      navigate(
        RouteName.CHATS.replace(":receiverId", chat._id).replace(":id", id)
      );
    } else message.error(error?.message);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* <nav className="w-full bg-white shadow-md"> */}
      <div className="max-w-3xl mx-auto flex justify-start p-4">
        <Tabs
          indicator={{
            align: "center",
          }}
          defaultActiveKey="1"
          className="w-full"
        >
          <TabPane
            tab={
              <span className="text-sm w-full font-bold text-[#323235] inline-block text-center">
                Matches
              </span>
            }
            key="1"
          >
            <div className="w-full min-h-screen">
              {/* Match content */}
              {loading ? (
                <div className="w-full flex p-8 min-h-screen justify-center items-center">
                  <Spin size="large" />
                </div>
              ) : (
                <div className="w-full flex flex-col gap-6 mt-8 px-4 overflow-auto">
                  {matches.length > 0 ? (
                    matches.map((match, index) => (
                      <div
                        key={index}
                        className="shadow-md rounded-lg bg-white p-4 mb-4 transition-transform duration-300 hover:scale-105"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden shadow-inner">
                            <img
                              src={
                                match.liker_id._id === id
                                  ? match.liked_id.image
                                  : match.liker_id.image
                              }
                              alt={
                                match.liker_id._id === id
                                  ? match.liked_id.name
                                  : match.liker_id.name
                              }
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900">
                              {match.liker_id._id === id
                                ? match.liked_id.name
                                : match.liker_id.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-center text-gray-600 mt-4">
                      No users available.
                    </h1>
                  )}
                </div>
              )}
            </div>
          </TabPane>
          <TabPane
            tab={
              <span className="text-sm w-full font-bold text-[#323235]">
                Chats
              </span>
            }
            key="2"
          >
            {/* Match content */}
            {loading ? (
              <div className="w-full flex p-8 min-h-screen justify-center items-center">
                <Spin size="large" />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4 mt-8 px-4">
                <div className="w-full flex flex-col gap-4 mt-8 px-4">
                  {chats.length > 0 ? (
                    chats.map((chat, index) => (
                      <div
                        onClick={() => handleNavigation(chat)}
                        key={index}
                        className="cursor-pointer shadow-md rounded-lg bg-white p-4 mb-4 transition-transform duration-300 hover:scale-105"
                      >
                        {/* Chat content */}
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden shadow-inner">
                            <img
                              src={chat.image}
                              alt={chat.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900">
                              {chat.name}
                            </h3>
                            <p className="text-gray-600">
                              {chat.lastMessageTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-center text-gray-600 mt-4">
                      No chats available.
                    </h1>
                  )}
                </div>
              </div>
            )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
