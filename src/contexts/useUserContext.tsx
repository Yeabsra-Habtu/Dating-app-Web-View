import { ILoginResponse } from "models/auth";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type IUserContext = {
  data: ILoginResponse;
  setData: Dispatch<React.SetStateAction<ILoginResponse | undefined>>;
};

export const useUserContext = () => useContext(UserContext);

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ILoginResponse>();

  return (
    <UserContext.Provider
      value={{
        data: data!,
        setData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
