import { message } from "antd";
import {
  dislikeSuggestionApi,
  findSuggestionApi,
  likeSuggestionApi,
} from "api/suggestion";
import { useUserContext } from "contexts/useUserContext";
import { ISuggestionResponse } from "models/suggestion";
import { useState, useEffect } from "react";

export default function useHome() {
  const {
    data: { token },
  } = useUserContext();
  const [loading, setLoading] = useState<{
    page: boolean;
    button: boolean;
  }>({
    button: false,
    page: true,
  });
  const [data, setData] = useState<ISuggestionResponse>();

  useEffect(() => {
    findSuggestionApi(token).then(({ data, error }) => {
      if (error) message.error(error.message);
      else {
        setData(data);
        setLoading({ page: false, button: false });
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleLikeSuggestion = async () => {
    setLoading({ page: false, button: true });
    const { data: response, error } = await likeSuggestionApi(
      data!.data._id,
      token
    );
    if (error) message.error(error.message);
    else {
      setData(response);
      setLoading({ page: false, button: false });
    }
  };

  const handleDislikeSuggestion = async () => {
    setLoading({ page: false, button: true });
    const { data: response, error } = await dislikeSuggestionApi(
      data!.data._id,
      token
    );
    if (error) message.error(error.message);
    else {
      setData(response);
      setLoading({ page: false, button: false });
    }
  };

  return { data, loading, handleDislikeSuggestion, handleLikeSuggestion };
}
