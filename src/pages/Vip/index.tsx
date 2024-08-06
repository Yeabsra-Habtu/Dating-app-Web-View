import { Button, message } from "antd";
import { vipChapaPaymentApi } from "api/payment";
import logo from "assets/images/logo.jpeg";
import start from "assets/svg/start.svg";
import { SubscriptionType } from "models/payment";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Vip() {
  const id: string = useParams().id!;
  const [index, setIndex] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setLoading(true);
    const subscriptionType: SubscriptionType =
      index === 1
        ? SubscriptionType["12Month"]
        : index === 2
        ? SubscriptionType["6Month"]
        : SubscriptionType["1Month"];
    const { data, error } = await vipChapaPaymentApi(id, subscriptionType);
    if (error) message.error(error.message);
    else {
      window.location.href = data!.checkout_url;
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex w-full items-center flex-col vip-top-gradient px-4 pt-1 pb-6 rounded-br-[50%] rounded-bl-[40%]">
        <img src={logo} alt="logo" height={40} className="h-10" />
        <h1 className="font-bold text-2xl py-2 text-white">Telegram Dating</h1>
      </div>
      <div className="w-full mt-8">
        <div className="w-full px-4">
          <div className="w-full text-center">
            <div className="w-full font-bold text-xl">
              <h1>Special Promotion!</h1>
              <h1>Final Days, Hurry Up!</h1>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full flex items-center gap-x-3">
              <img src={start} alt="start" width={20} className="w-5" />
              <p className="font-normal text-base">VIP</p>
            </div>
            <div className="w-full flex flex-col pt-6 gap-y-4 text-xs text-white">
              <div className="w-full">
                <button
                  onClick={() => setIndex(1)}
                  className={`w-full ${
                    index === 1
                      ? "bg-[#49c778] text-white"
                      : "bg-slate-200 text-black"
                  } text-start px-3 rounded-xl relative`}
                >
                  <div className="absolute text-white bg-[#740117] right-6 -translate-y-1/2 rounded-[10px] px-4 py-1">
                    Best price
                  </div>
                  <div className="w-full pt-4 pb-3">
                    <p className="text-sm font-bold">4.17 Birr/month</p>
                    <div className="w-full flex justify-between items-center mt-1">
                      <p className="relative old-price">9.99 Birr</p>
                      <p>12 months</p>
                    </div>
                  </div>
                </button>
                <p className="pt-2 text-[#adb0b6]">Total: 49.99 Birr</p>
              </div>
              <div className="w-full">
                <button
                  onClick={() => setIndex(2)}
                  className={`w-full ${
                    index === 2
                      ? "bg-[#49c778] text-white"
                      : "bg-slate-200 text-black"
                  } text-start px-3 rounded-xl relative`}
                >
                  <div className="w-full pt-4 pb-3">
                    <p className="text-sm font-bold">5 Birr/month</p>
                    <div className="w-full flex justify-between items-center mt-1">
                      <p className="relative old-price">9.99 Birr</p>
                      <p>6 months</p>
                    </div>
                  </div>
                </button>
                <p className="pt-2 text-[#adb0b6]">Total: 29.99 Birr</p>
              </div>
              <div className="w-full">
                <button
                  onClick={() => setIndex(3)}
                  className={`w-full ${
                    index === 3
                      ? "bg-[#49c778] text-white"
                      : "bg-slate-200 text-black"
                  } text-start px-3 rounded-xl relative`}
                >
                  <div className="w-full pt-4 pb-3">
                    <p className="text-sm font-bold">9.99 Birr/month</p>
                    <div className="w-full flex justify-between items-center mt-1">
                      <p className="relative old-price">15 Birr</p>
                      <p>1 months</p>
                    </div>
                  </div>
                </button>
                <p className="pt-2 text-[#adb0b6]">Total: 9.99 Birr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grow" />
      <div className="w-full p-4">
        <Button
          type="primary"
          loading={loading}
          onClick={handleNext}
          className="h-auto rounded-xl w-full text-center py-5 px-3 text-white block text-sm font-bold"
        >
          <span className="uppercase px-3">👉 NEXT 👈</span>
        </Button>
      </div>
    </div>
  );
}
