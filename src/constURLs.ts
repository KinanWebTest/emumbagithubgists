export const homePage = 'http://localhost:3000/';
export const appID = '813887';
export const clientID = 'Iv1.8a54821697c7a0bd';
export const clientSecret = '927b82c44bec748cec9d795817e4a8c592b80afb';
export const githubAuthURL = 'https://github.com/login/oauth/authorize';
export const githubBaseTokenURL = 'https://github.com/login/oauth/access_token';
export const githubFullTokenURL = `${githubBaseTokenURL}?client_id=${clientID}&client_secret=${clientSecret}`;
export const githubCORSProxy = 'https://corsproxy.io';
export const githubGistsBaseURL = 'https://api.github.com/gists';
export const githubPublicGistsBaseURL = `${githubGistsBaseURL}/public`;
export const githubGistsPageSize = '?per_page=10';