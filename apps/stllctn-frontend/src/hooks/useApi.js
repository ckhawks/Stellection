import useSWR from "swr";

import { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// https://refine.dev/blog/data-fetching-next-js-useswr/

const swrApi = async (payload) => {
  const {
    path,
    method,
    body,
    contentType: contentTypeSent,
    header,
    // token,
    params,
    formData,
    // showError = true
  } = payload;
  let url = `${API_BASE_URL}/v1/${path}`;
  if (params) {
    const query = Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&");
    url = `${url}?${query}`;
  }
  const contentType = contentTypeSent;

  const headers = {
    ...header,
    "Content-Type": `${contentType}`,
    // Authorization: token ? `Bearer ${token}` : '',
    // CompanyId: getCompanyTemp()
  };

  // TODO: we shoul figure out how to do this better.
  if (formData) delete headers["Content-Type"];

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : formData ?? undefined,
    });
    const responseBody = await response.json();
    responseBody.ok = true;

    if (response.status !== 200 && response.status !== 201) {
      const { message } = await responseBody;
      // Token has expired errors
      if (
        message === "jwt expired" ||
        message === "No authorization token was found"
      ) {
        // logoutRedirect();
        responseBody.ok = true;
      } else {
        // if (showError) toast.error(message, TOAST_OPTIONS);
        responseBody.ok = false;
      }
    }
    return responseBody;
  } catch (error) {
    throw Error(error);
  }
};

// old
export function useApi(params) {
  // const token = useSelector(getTokenSelector);

  const response = useSWR(
    {
      // token,
      ...params,
    },
    (...args) => swrApi(...args)
  );

  return response;
}

// new
export function useApi2() {
  // const token = useSelector(getTokenSelector);
  const [token, setToken] = useState(undefined);

  const makeRequest = async (params) => {
    if (!token) {
      throw new Error("BAD!!! useApi must be initiated with token");
    }
    const response = await swrApi({ ...params, token });
    return response;
  };

  return { token, setToken, makeRequest };
}

// const { setToken } = useApi();
// const { makeRequest } = useApi();

// makeRequest({});
