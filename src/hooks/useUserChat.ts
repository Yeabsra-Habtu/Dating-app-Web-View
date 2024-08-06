import { message } from "antd";
import { userMessagesApi } from "api/chat";
import { useUserContext } from "contexts/useUserContext";
import { socket } from "helpers/socket";
import {
  IPagination,
  IChatData,
  IChat,
  ISendMessageResponse,
} from "models/chat";
import {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  ChangeEvent,
} from "react";
import { useParams } from "react-router-dom";

export default function useUserChat() {
  const {
    data: {
      data: { _id },
      token,
    },
  } = useUserContext();
  const { id: receiverId } = useParams();
  const dataRef = useRef<IPagination>({
    limit: 10,
    offset: 0,
    loading: true,
    total: 0,
  });
  const [data, setData] = useState<IChatData>({
    data: [],
    limit: 10,
    loading: true,
    offset: 0,
    receiver: {} as any,
    total: 0,
    user: {} as any,
  });
  const [input, setInput] = useState<string>("");
  const io = useMemo(() => socket(token), []); // eslint-disable-line

  const onConnect = useCallback(() => {}, []);
  const onDisconnect = useCallback(() => {}, []);

  useEffect(() => {
    if (_id) {
      io.connect();
      io.on("connect", onConnect);
      io.on("disconnect", onDisconnect);
      io.on("receive_message", (data: IChat) => {
        setData((prev) => ({ ...prev, data: [...prev.data, data] }));
      });

      // fetch messages
      fetchMessages();
      const handleScroll = () => {
        // check if user scrolled to the top and data is not loading
        if (window.scrollY < 10 && !dataRef.current.loading) {
          // check if all data is loaded
          if (
            dataRef.current.limit * dataRef.current.offset <
            dataRef.current.total
          ) {
            fetchMessages();
          }
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        io.off("receive_message");
        io.off("connect", onConnect);
        io.off("disconnect", onDisconnect);
        io.disconnect();
        window.removeEventListener("scroll", handleScroll);
      };
    } else message.error("Token is missing");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: window.innerHeight });
    // eslint-disable-next-line
  }, [data.data.length]);

  const fetchMessages = async () => {
    dataRef.current.loading = true;
    const { data: response, error } = await userMessagesApi(
      receiverId!,
      data.limit,
      dataRef.current.offset + 1,
      token
    );
    if (response) {
      setData((prev) => ({
        ...prev,
        ...response,
        data: [...response.data, ...prev.data],
        loading: false,
      }));
      dataRef.current = {
        loading: false,
        limit: response.limit,
        offset: response.offset,
        total: response.total,
      };
    } else {
      message.error(error!.message);
      dataRef.current.loading = false;
    }
  };

  const handleSendMessage = () => {
    if (input.trim().length > 0) {
      setInput("");
      io.emit(
        "send_message",
        { message: input, receiverId },
        (response: ISendMessageResponse) => {
          if (response.success)
            setData((prev) => ({
              ...prev,
              data: [...prev.data, response.data],
            }));
        }
      );
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  return { handleInputChange, handleSendMessage, input, receiverId, data };
}
