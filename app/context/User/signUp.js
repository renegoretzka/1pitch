const { Auth } = require("aws-amplify");

const signUp = async ({ username, password, attributes }) => {
  try {
    const user = await Auth.signUp({
      username,
      password,
      attributes,
    });
    return user;
  } catch (error) {
    if (error.code === "UsernameExistsException") {
      throw new Error("USER_ALREADY_REGISTERED");
    } else {
      console.log("Error signUp", error);
    }
  }
};

export default signUp;
