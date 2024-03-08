const getTokenFromLocalStorage = localStorage.getItem("adminUser")
  ? JSON.parse(localStorage.getItem("adminUser"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage.accessToken
        : ""
    }`,
  },
};
