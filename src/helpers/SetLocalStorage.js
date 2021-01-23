export const SetLocalStorage = response => {
  const myResponse = response.data.data;
  const myUid = response.headers.uid;
  const myClient = response.headers.client;
  const myAccessToken = response.headers['access-token'];
  localStorage.setItem('eycUser', JSON.stringify({
    myResponse, myUid, myClient, myAccessToken,
  }));
};