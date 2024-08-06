import { Button, message } from "antd";
import { boostChapaPaymentApi } from "api/payment";
import logo from "assets/images/logo.jpeg";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Boost() {
  const id = useParams().id;
  const [loading, setLoading] = useState<boolean>(false);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  useEffect(() => {
    if (!queryParams.get("token")) message.error("Token is missing");
    // eslint-disable-next-line
  }, []);

  const handleNext = async () => {
    if (!queryParams.get("token")) message.error("Token is missing");
    else {
      setLoading(true);
      const boost = id === "1" ? 24 : id === "2" ? 12 : 6;
      const { data, error } = await boostChapaPaymentApi(
        id!,
        boost,
        queryParams.get("token")!
      );
      if (error) message.error(error.message);
      else {
        window.location.href = data!.checkout_url;
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex w-full items-center flex-col vip-top-gradient px-4 pt-1 pb-6 rounded-br-[50%] rounded-bl-[40%]">
        <img src={logo} alt="logo" height={40} className="h-10" />
        <h1 className="font-bold text-2xl py-2 text-white">Telegram Dating</h1>
      </div>
      <div className="w-full mt-8">
        <div className="w-full px-4"></div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 font-normal py-4">
          🚀 Boost your self for {id === "1" ? 24 : id === "2" ? 12 : 6} hours
        </p>
      </div>
      <div className="grow" />
      <div className="w-full p-4">
        <Button
          onClick={handleNext}
          loading={loading}
          type="primary"
          className="h-auto rounded-xl w-full text-center py-5 px-3 text-white block text-sm font-bold"
        >
          <span className="px-4 uppercase">
            GET 🚀 {id === "1" ? 24 : id === "2" ? 12 : 6} hours boost 🚀
          </span>
        </Button>
      </div>
    </div>
  );
}
