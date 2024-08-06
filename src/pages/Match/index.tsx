import { Spin, message } from "antd";
import { mineMatchesApi } from "api/match";
import HeartIcon from "components/icons/HeartIcon";
import { RouteName } from "constants/router";
import { useUserContext } from "contexts/useUserContext";
import { IMatch } from "models/match";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Match() {
  const navigate = useNavigate();
  const [data, setData] = useState<IMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    data: {
      token,
      data: { _id },
    },
  } = useUserContext();

  useEffect(() => {
    mineMatchesApi(token).then(({ data, error }) => {
      if (error) message.error(error.message);
      else {
        setData(data!);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-80px)] flex flex-col overflow-y-auto">
      <div className="w-full pt-10 pb-5">
        <div className="mx-auto p-5 rounded-full flex items-center justify-center h-24 w-24 bg-dark">
          <HeartIcon />
        </div>
        <div className="w-5/6 mt-5 text-center mx-auto">
          <h1 className="text-2xl text-white font-bold">
            People You've Matched.
          </h1>
          <p className="text-sm mt-2 text-light-gray">
            These are people that you have matched with. Reach out and connect
            with them.
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
            data.map((match) => (
              <Link
                to={RouteName.USER_PROFILE.replace(
                  ":id",
                  match.liker_id._id === _id
                    ? match.liked_id._id
                    : match.liker_id._id
                )}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-950"
                key={match._id}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-inner">
                  <img
                    src={
                      match.liker_id._id === _id
                        ? match.liked_id.image
                        : match.liker_id.image
                    }
                    alt={
                      match.liker_id._id === _id
                        ? match.liked_id.name
                        : match.liker_id.name
                    }
                    className="object-cover h-14 w-14 max-w-14 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <h3 className="text-lg font-semibold text-white">
                    {match.liker_id._id === _id
                      ? match.liked_id.name
                      : match.liker_id.name}
                  </h3>
                  <p className="text-xs text-light-gray">
                    {moment(match.createdAt).format("DD, MMM YYYY")}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-light-gray">No Matches !</p>
          )}
        </div>
      )}
    </div>
  );
}
