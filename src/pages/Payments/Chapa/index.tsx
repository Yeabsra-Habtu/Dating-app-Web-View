import { Spin, message } from "antd";
import { chapaPaymentApi } from "api/payment";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ChapaPayment() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  useEffect(() => {
    const token = queryParams.get("token");
    if (token) {
      chapaPaymentApi(token).then(({ data, error }) => {
        if (error) message.error(error.message);
        else {
          window.location.href = data!.checkout_url;
        }
      });
    } else message.error("Token not found");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full flex p-8 min-h-screen justify-center items-center">
      <Spin size="large" />
    </div>
  );
}
