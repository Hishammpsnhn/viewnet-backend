export default async (accessToken, { accessTokenManager }) => {
  console.log("accessToken1111", accessToken);
  if (!accessToken) {
    throw Object.assign(new Error("unauthorized, no access token"), {
      statusCode: 401,
    });
  }
  console.log("accessToken", accessToken);
  const decoded = accessTokenManager.decode(accessToken);

  //const user = await userRepository.findByUsername(decoded.username);
  // if (!user) {
  //     throw Object.assign(new Error("user not found."), { statusCode: 404 });
  // }
  console.log("decoded: " + decoded);

  return decoded;
};
