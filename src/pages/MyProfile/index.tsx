import hear from "assets/images/heart.png";
import pin from "assets/images/pin.png";
// import gift from "assets/images/gift.png";
import logo from "assets/images/logo.jpeg";
import { useEffect, useState } from "react";
import { deleteUserPhoto, getUserByIdApi, updateQuestion } from "api/user";
import { useParams } from "react-router-dom";
import { Spin, message, Upload, Popconfirm, Modal, Input } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { IUser } from "models/user";
import { BASE_URL } from "api";
import TextArea from "antd/es/input/TextArea";

export default function MyProfile() {
  const id = useParams().id;
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleDelete = (photoUrl: string) => {
    const encodedURL = encodeURIComponent(photoUrl);

    deleteUserPhoto(id!, encodedURL);
  };
  const updateData = {
    question: selectedQuestion,
    answer: inputValue,
  };

  const handleOk = () => {
    setIsModalOpen(false);
    updateQuestion(id!, updateData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  }, [user?.photoUrls]);

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
                {/* <img src={gift} alt="gift" /> */}
                <p className="font-normal text-base">{user?.gift}</p>
              </div>
              <div className="w-full flex items-center gap-x-5 flex-wrap">
                {user?.photoUrls.length! > 0 &&
                  user?.photoUrls.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={"photo"}
                        className="w-24 h-24 rounded-lg overflow-hidden shadow-inner object-cover group-hover:opacity-50"
                      />
                      <Popconfirm
                        title="Are you sure you want to delete this photo?"
                        onConfirm={() => handleDelete(photo)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className=" size-6 absolute top-2 right-2 hover:scale-110 cursor-pointer font-bold hidden group-hover:block"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </Popconfirm>
                    </div>
                  ))}
                {user?.photoUrls.length! < 5 && (
                  <Upload
                    action={`${BASE_URL}users/${user?._id}/upload`}
                    listType="picture-card"
                    name="image"
                  >
                    + Upload
                  </Upload>
                )}
              </div>
            </div>
          </div>
          <div className="w-full profile-bottom-gradient pb-6 pt-[70px] relative">
            <div className="relative group">
              {user?.questions &&
                user.questions.map((question) => (
                  <div className="bg-white shadow-md rounded-md p-4 max-w-lg mx-auto m-2">
                    <div className="flex flex-row justify-between">
                      <h4 className=" font-bold mb-4 ">{question.question}</h4>
                      <button
                        onClick={() => {
                          setSelectedQuestion(question.question);
                          setInputValue(question.answer || "");
                          setIsModalOpen(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-7 h-7 text-black hover:scale-110 cursor-pointer font-bold"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                    </div>
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
      <Modal
        title={selectedQuestion}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          rows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </div>
  );
}
