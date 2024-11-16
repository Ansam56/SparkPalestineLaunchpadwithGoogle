const isValidURL = function (url) {
  let testurl;

  try {
    testurl = new URL(url);
  } catch (error) {
    return false;
  }

  return testurl.protocol === "https:" || testurl.protocol === "http:";
};

export { isValidURL };
