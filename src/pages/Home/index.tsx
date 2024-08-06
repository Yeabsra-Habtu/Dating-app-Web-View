import { Button, Spin } from "antd";
import CloseIcon from "components/icons/CloseIcon";
import LikeIcon from "components/icons/LikeIcon";
import useHome from "hooks/useHome";
import { SuggestionStatus } from "models/suggestion";

export default function Home() {
  const {
    data,
    loading: { button, page },
    handleDislikeSuggestion,
    handleLikeSuggestion,
  } = useHome();

  return (
    <div className="w-full h-[calc(100dvh-80px)]">
      {page ? (
        <div className="w-full relative h-[calc(100%-100px)] flex flex-col justify-center items-center">
          <Spin size="large" />
        </div>
      ) : [SuggestionStatus.NOT_FOUND, SuggestionStatus.OUT_OF_COIN].includes(
          data?.status ?? ("undefined" as any)
        ) ? (
        <div className="w-full flex items-center justify-center grow h-[calc(100%-100px)]">
          <h1 className="text-white">{data!.message}</h1>
        </div>
      ) : (
        <>
          <div className="w-full relative h-[calc(100%-100px)] flex flex-col justify-center">
            <div className="w-full relative max-h-full">
              <img
                className="w-full relative object-cover h-full"
                src={data?.data.image}
                alt="profile"
              />
              <div className="w-full absolute bottom-0 p-4 bg-gradient-to-b from-transparent via-black/20 to-black/40 flex flex-col gap-y-2 text-white">
                <p className="text-2xl font-bold drop-shadow ">
                  {data?.data.name}
                </p>
                <span className="inline-block drop-shadow font-bold">
                  Age: {data?.data.age}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full py-5"></div>
          <div className="w-full flex gap-x-4 px-4 pb-10">
            <Button
              onClick={handleDislikeSuggestion}
              loading={button}
              className="border-transparent hover:border-transparent suggestion-dislike-btn w-1/2 h-[45px] rounded flex justify-center items-center"
            >
              <CloseIcon />
            </Button>
            <Button
              onClick={handleLikeSuggestion}
              loading={button}
              className="border-transparent hover:border-transparent suggestion-like-btn w-1/2 h-[45px] rounded flex justify-center items-center"
            >
              <LikeIcon />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
