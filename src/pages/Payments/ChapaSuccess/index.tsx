import { Button, Result } from "antd";
import { useTelegramContext } from "contexts/useTelegramContext";

export default function ChapSuccess() {
  const { closeTelegramWeb } = useTelegramContext();
  return (
    <div className="w-full flex min-h-screen p-8 items-center justify-center">
      <Result
        status="success"
        title="Chapa Payment Success"
        subTitle="Check you telegram account."
        extra={[
          <Button
            onClick={closeTelegramWeb}
            type="primary"
            className="px-10 min-w-48 h-auto py-2 rounded-3xl"
          >
            Go Back To Telegram
          </Button>,
        ]}
      />
    </div>
  );
}
