import { Button, InputNumber, Spin, message } from "antd";
import { IUserWithdrawResponse } from "models/user";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hear from "assets/images/heart.png";
import { findUserWithdrawApi } from "api/user";
import { valueType } from "antd/es/statistic/utils";
import { withdrawChapaPaymentApi } from "api/payment";

export default function Withdraw() {
  const id = useParams().id!;
  const [user, setUser] = useState<IUserWithdrawResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id)
      findUserWithdrawApi(id).then(({ data, error }) => {
        if (data) {
          setLoading(false);
          setUser(data);
        } else message.error(error!.message);
      });
    else message.error("User id not found");
    // eslint-disable-next-line
  }, []);

  const handleAmountChange = (e: valueType | null) => {
    if (e) {
      if (typeof e === "string") e = Number(e);
      setAmount(e);
    }
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount) message.error("Amount is required");
    else if (amount > user?.data?.coin!) message.error("Insufficient balance");
    else if (amount < user?.minimumWithdrawableCoin!)
      message.error(
        `Minimum coin you can withdraw is ${user?.minimumWithdrawableCoin!}`
      );
    else if (user?.data.coin! - amount < user?.minimumWithdrawableCoin!)
      message.error(
        `Maximum remaining coin you can withdraw is ${
          user?.data.coin! - user?.minimumWithdrawableCoin!
        }`
      );
    else {
      setButtonLoading(true);
      const { data, error } = await withdrawChapaPaymentApi(id, amount!);
      if (error) message.error(error.message);
      else window.location.href = data!.checkout_url;

      setButtonLoading(false);
    }
  };

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
              src={user?.data?.image}
              alt="profile"
              width={200}
              height={200}
              className="rounded-full mx-auto z-20 relative w-[200px] h-[200px] object-cover"
              style={{ boxShadow: "0px 4px 8px rgba(0,0,0,.25)" }}
            />
          </div>
          <div className="grow bg-white rounded-2xl relative -my-12 z-10 py-12 px-6">
            <div className="w-full flex items-center gap-x-3 justify-center">
              <h1 className="font-bold text-3xl">{user?.data.name}</h1>
              <p className="font-normal text-3xl">{user?.data.age}</p>
            </div>
            <div className="w-full px-6 text-center">
              <div className="w-full flex flex-col gap-y-2 py-8">
                <h1 className="text-base font-light">Total Coin</h1>
                <h2 className="text-3xl font-semibold">
                  {user?.data.coin.toLocaleString("en")}
                </h2>
              </div>
              <div className="w-full flex flex-col gap-y-2 pb-8">
                <h1 className="text-base font-light">Withdrawable Coin</h1>
                <h2 className="text-3xl font-semibold">
                  {(
                    (user?.data.coin ?? 0) -
                    (user?.minimumWithdrawableCoin ?? 0)
                  ).toLocaleString("en")}
                </h2>
              </div>
              <div className="w-full pb-2 px-6 flex flex-col items-center text-start">
                <form onSubmit={handleOnSubmit} className="w-full">
                  <div className="w-full px-4 py-8">
                    <div className="w-full flex flex-col gap-y-1">
                      <label
                        htmlFor="amount"
                        className="text-base font-semibold"
                      >
                        Coin Amount
                      </label>
                      <InputNumber
                        onChange={handleAmountChange}
                        id="amount"
                        name="amount"
                        value={amount}
                        className="w-full bg-white py-1.5"
                        placeholder="Enter coin you want to withdraw"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-y-1 mt-8">
                      <label className="text-base font-semibold">
                        Coin Amount in ETB
                      </label>
                      <InputNumber
                        disabled
                        className="w-full bg-white py-1.5"
                        value={(amount ?? 0) * (user?.oneCoinInBirr ?? 1)}
                      />
                    </div>
                    <div className="w-full py-5">
                      <Button
                        loading={buttonLoading}
                        htmlType="submit"
                        className="w-full h-auto px-6 py-3 font-bold"
                        type="primary"
                      >
                        Withdraw
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// <div className="w-full min-h-screen max-w-xl mx-auto bg-[#1e1e1e]">

// </div>
