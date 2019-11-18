import { get } from "../services/storage";
import { storage } from "../config/vars";

export const getTokenFromUrl = () => {
  const { search } = window.location;
  const params = search.replace("?", "").split("&");
  const tokenParam = params.find(i => i.includes("access_token="));

  if (!tokenParam) {
    return "";
  }

  const sections = tokenParam.split("=");
  return sections.length > 1 ? sections[1] : "";
};

export const getTokenFromStorage = () => {
  return get(storage.accessTokenKey) || "";
};
