import useSWR from 'swr';

// const BASE_URL = process.env.BACKEND_API_URL;
const BASE_URL = "http://127.0.0.1:5500";

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
    let url = `${BASE_URL}/${path}`;
    if (params) {
      const query = Object.keys(params)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
      url = `${url}?${query}`;
    }
    const contentType = contentTypeSent;
  
    const headers = {
      ...header,
      'Content-Type': `${contentType}`,
      // Authorization: token ? `Bearer ${token}` : '',
      // CompanyId: getCompanyTemp()
    };
  
    // TODO: we shoul figure out how to do this better.
    if (formData) delete headers['Content-Type'];
  
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : formData ?? undefined
      });
      const responseBody = await response.json();
      responseBody.ok = true;
  
      if (response.status !== 200 && response.status !== 201) {
        const { message } = await responseBody;
        // Token has expired errors
        if (
          message === 'jwt expired' ||
          message === 'No authorization token was found'
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

export function useApi(params) {
    // const token = useSelector(getTokenSelector);
    
    const response = useSWR(
        {
        // token,
        ...params
        },
        (...args) => swrApi(...args)
    );
    
    return response;
}