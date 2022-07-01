const getData = async () => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  console.log("token", `${localStorage.getItem("token")}`);
  //const withoutCommasToken = token.replace(/'/g);
  //console.log(withoutCommasToken);
  const headers = { Authorization: `Bearer ${token}` };
  console.log("headers", headers);
  const response = await fetch(url, {
    headers: await headers,
  });
  return await response.json();
};
export default getData;
