import { Button, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useUserContext } from "contexts/useUserContext";
import { IProfileEditInput } from "models/auth";
import { useState } from "react";

export default function EditProfile() {
  const {
    data: {
      data: { name, age, bio },
    },
  } = useUserContext();
  const [input, setInput] = useState<IProfileEditInput>({ bio, name, age });

  return (
    <div className="w-full min-h-dvh flex flex-col">
      <div
        className="w-full py-16 px-10 text-center"
        style={{ backgroundColor: "rgb(33,33,33)" }}
      >
        <h1 className="text-white font-bold text-2xl">Edit Profile</h1>
        <p className="w-full mt-2 text-sm text-light-gray">
          You Can edit your profile information below. Click the save changes
          button to save the changes.
        </p>
      </div>
      <div className="w-full h-4 bg-dark"></div>
      <div
        className="w-full grow p-5 flex flex-col gap-y-5"
        style={{ backgroundColor: "rgb(33,33,33)" }}
      >
        <div className="w-full flex flex-col gap-y-1">
          <input
            type="text"
            name="name"
            id="name"
            value={input.name}
            className="text-white focus:bg-transparent w-full bg-transparent  outline-none ring-0 pt-2 pb-1 transition-colors duration-100 border-b border-x-0 border-t-0 rounded-none border-light-gray"
          />
          <label htmlFor="name" className="text-sm text-light-gray">
            Name
          </label>
        </div>
        <div className="w-full flex flex-col gap-y-1">
          <TextArea
            value={input.bio}
            name="name"
            id="name"
            className="text-white focus:bg-transparent w-full bg-transparent  outline-none ring-0 pt-2 pb-1 transition-colors duration-100 border-b border-x-0 border-t-0 rounded-none border-light-gray"
            showCount
            maxLength={120}
            style={{
              resize: "none",
              backgroundColor: "transparent",
            }}
          />
          <label htmlFor="name" className="text-sm text-light-gray">
            Bio
          </label>
        </div>
        <div className="w-full flex flex-col gap-y-1">
          <InputNumber
            value={input.age}
            name="name"
            id="name"
            className="text-white focus:bg-transparent w-full bg-transparent  outline-none ring-0 pt-2 pb-1 transition-colors duration-100 border-b border-x-0 border-t-0 rounded-none border-light-gray"
            style={{ color: "white" }}
          />
          <label htmlFor="name" className="text-sm text-light-gray">
            Age
          </label>
        </div>
        <div className="grow"></div>
      </div>
      <Button
        className="border-none h-14 uppercase font-semibold"
        style={{
          backgroundColor: "rgb(135, 116, 225)",
          color: "rgb(255, 255, 255)",
        }}
      >
        Save Changes
      </Button>
    </div>
  );
}
