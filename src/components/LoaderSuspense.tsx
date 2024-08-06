import { Spin } from "antd";
import { Suspense } from "react";

const LoaderSuspense = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100dvh-80px)] flex  justify-center items-center p-10 mx-auto">
          <Spin tip="" size="large"></Spin>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

export default LoaderSuspense;
