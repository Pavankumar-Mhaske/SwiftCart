const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage.accessToken
        : ""
    }`,
    Accept: "application/json",
  },
};
