import axios, { AxiosError } from "axios";
import { FetchParamsType } from "../types";
import { getTokenAPI } from "./github-oauth";

let refreshAttempts = 0;
let apiCallHeaders = {};
const fetcherInstance = axios.create();

export const fetcher = async ({url, method} : FetchParamsType) => {
  fetcherInstance.interceptors.request.use(
  (config) => {
    config.headers.Accept = 'application/vnd.github+json';
    config.headers['X-GitHub-Api-Version'] = '2022-11-28';
  
    const storedToken = sessionStorage.getItem('githubTokenObject');
    if (storedToken) {
      const {access_token} = JSON.parse(storedToken);
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    apiCallHeaders = config.headers;
    config.method = method || 'GET';
    return config;
  });
	try {
    console.log(`using method ${method}\nand headers ${JSON.stringify(apiCallHeaders)}\ncalling API ${url}`);
    const response = await fetcherInstance(url);
    console.log('API response:', response);
    const jsonResp = response.data;
    return Promise.resolve(jsonResp);
  } catch (error) {
    console.log('API error:', error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        refreshAttempts += 1;
        if (refreshAttempts === 2) {
          refreshAttempts = 0;
          return Promise.resolve(error);
        }
        return refreshTokenAndRecallAPI({ url, method });
      }
    }
    return Promise.reject(error);
  }
};

export const refreshTokenAndRecallAPI = async ({url, method} : FetchParamsType) : Promise<unknown> => {
	const storedToken = await sessionStorage.getItem('githubTokenObject');
	const { refresh_token } = storedToken? JSON.parse(storedToken) : null;
	await getTokenAPI({refreshToken: refresh_token});
	return fetcher({url, method});
}