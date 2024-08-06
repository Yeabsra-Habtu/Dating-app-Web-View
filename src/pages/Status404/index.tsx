import { Result } from "antd";

export default function Status404() {
  return (
    <div className="w-full min-h-screen p-8 flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
}
