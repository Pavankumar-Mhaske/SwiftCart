<div>
  {description && description.length > 70 ? (
    <p dangerouslySetInnerHTML={{ __html: description.substring(0, 68) + "..." }} />
  ) : (
    <p dangerouslySetInnerHTML={{ __html: description }} />
  )}
</div>




try {
} catch (error) {
  // console.log("error in userService is 💖💖💖💖💖💖💖💖💖💖: ", error);
  // console.log(
  //   "statusCode in userService is ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐: ",
  //   error?.response?.data?.statusCode
  // );
  const statusCode = error?.response?.data?.statusCode;
  if ([401, 403].includes(statusCode)) {
    alert(`JWT Expired, Please login again!`);
    localStorage.clear(); // Clear local storage on authentication issues
    window.location.href = "/admin-login"; // Redirect to login page
    // window.location.reload();
  }
}



 