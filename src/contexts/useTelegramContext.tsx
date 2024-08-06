import { ReactNode, createContext, useContext, useEffect } from "react";

interface ITelegram {
  initDataUnsafe: { [key: string]: string | number };
  isExpanded: boolean;
  expand: () => void;
  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
  setHeaderColor: (value: string) => void;
  setBackgroundColor: (value: string) => void;
  showScanQrPopup: (
    value: any,
    callback: (value: string | undefined) => void
  ) => void;
  closeScanQrPopup: () => void;
  ready: () => void;
  isClosingConfirmationEnabled: boolean;
  close: () => void;
  initData: string;
  onEvent: (event: string, callback: () => void) => void;
  SettingsButton: { isVisible: boolean };
  openLink: (url: string) => void;
  BackButton: {
    show: () => void;
    hide: () => void;
  };
}

type ITelegramContext = {
  closeTelegramWeb: () => boolean;
  initData: string;
  showOneTimeBackButton: (callback: () => void) => boolean;
};

export const useTelegramContext = () => useContext(TelegramContext);

export const TelegramContext = createContext<ITelegramContext>(
  {} as ITelegramContext
);

const Telegram: ITelegram = (window as any).Telegram?.WebApp;

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  console.log("Telegram.ready", Telegram);
  console.log("Telegram.initData", Telegram.initDataUnsafe);
  useEffect(() => {
    Telegram.ready();
    //   check if Telegram Object exist and user data exist on Telegram Object
    if (Telegram) {
      // expand to full height
      if (!Telegram.isExpanded) Telegram.expand();
      //   set header color to dark green
      Telegram.setHeaderColor("#0F0F0F");
      //   set background color to white
      Telegram.setBackgroundColor("#0F0F0F");
    }
    // eslint-disable-next-line
  }, []);

  const showOneTimeBackButton = (callback: () => void): boolean => {
    Telegram.BackButton.show();
    Telegram.onEvent("backButtonClicked", () => {
      callback();
      Telegram.BackButton.hide();
    });
    return true;
  };

  const closeTelegramWeb = (): boolean => {
    if (Telegram.isClosingConfirmationEnabled)
      Telegram.disableClosingConfirmation();
    Telegram.close();
    return true;
  };

  return (
    <TelegramContext.Provider
      // TODO: remove default value on production
      value={{
        closeTelegramWeb,
        initData: Telegram.initData,
        showOneTimeBackButton,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
};
