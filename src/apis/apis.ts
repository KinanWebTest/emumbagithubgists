import { useMutation, useQuery } from "@tanstack/react-query";
import { githubGistsBaseURL, githubGistsPageSize, githubPublicGistsBaseURL, githubUserURL } from "../const-urls";
import { fetcher } from "./api-fetcher";
import { GistDataType } from "../types";

export const getGithubUser = () => {
  return fetcher({
    url: githubUserURL,
    method: 'GET',
  });
};

export const useGetPublicGists = ({ page }: { page: number }) => {
  const url = `${githubPublicGistsBaseURL}${githubGistsPageSize}&page=${page}`;
  return useQuery<GistDataType[], Error>({
    queryKey: ['publicGists', {page}],
    queryFn: () => fetcher({ url, method: 'GET' })
  });
};

export const useGetGistsByID = ({ id }: { id: string | number }) => {
  const url = `${githubGistsBaseURL}/${id}`;
  return useQuery<GistDataType, Error>({
    queryKey: ['singleGist', {id}],
    queryFn: () => fetcher({ url, method: 'GET' }),
    enabled: !!id && id !== '',
  });
};

export const useGetUserGists = ({ username }: { username: string | undefined }) => {
  const url = `${githubUserURL}s/${username}/gists`;
  return useQuery<GistDataType[], Error>({
    queryKey: ['userGists', {username}],
    queryFn: () => fetcher({ url, method: 'GET' }),
    enabled: !!username && username !== '',
  });
};

export const useGetStarredGists = () => {
  const url = `${githubGistsBaseURL}/starred`;
  return useQuery<GistDataType[], Error>({
    queryKey: ['starredGists'],
    queryFn: () => fetcher({ url, method: 'GET' })
  });
};

export const useStarGist = ({ gistID }: { gistID: string | undefined }) => {
  const url = `${githubGistsBaseURL}/${gistID}/star`;
  return useQuery<GistDataType[], Error>({
    queryKey: ['starGist', {gistID}],
    queryFn: () => fetcher({ url, method: 'PUT' }),
    enabled: !!gistID && gistID !== '',
  });
};

export const useUnstarGist = ({ gistID }: { gistID: string | undefined }) => {
  const url = `${githubGistsBaseURL}/${gistID}/star`;
  return useQuery<GistDataType[], Error>({
    queryKey: ['unstarGist', {gistID}],
    queryFn: () => fetcher({ url, method: 'DELETE' }),
    enabled: !!gistID && gistID !== '',
  });
};

export const useCreateGist = ({
  description,
  files,
  onCreation
}: {
  description: string,
  files: object,
  onCreation: () => void
}) => {
  const url = `${githubGistsBaseURL}`;
  const body = {description, files};
  const method = 'POST';
  return useMutation<GistDataType[], Error>({
    mutationKey: ['createGist'],
    mutationFn: () => fetcher({ url, method, body }),
    onSuccess: onCreation
  });
};

export const useUpdateGist = ({
  gistID,
  description,
  files,
  onCreation,
}: {
  gistID: string | undefined,
  description: string,
  files: object,
  onCreation: () => void
}) => {
  const url = `${githubGistsBaseURL}/${gistID}`;
  const body = {description, files};
  const method = 'PATCH';
  return useMutation<GistDataType[], Error>({
    mutationKey: ['editGist', {gistID}],
    mutationFn: () => fetcher({ url, method, body }),
    onSuccess: onCreation
  });
};

export const useDeleteGist = ({
  id,
  onDeletion
} : {
  id: string,
  onDeletion: () => void
}) => {
  const url = `${githubGistsBaseURL}/${id}`;
  const method = 'DELETE';
  return useMutation<GistDataType[], Error>({
    mutationKey: ['deleteGist'],
    mutationFn: () => fetcher({ url, method }),
    onSuccess: onDeletion
  });
};
