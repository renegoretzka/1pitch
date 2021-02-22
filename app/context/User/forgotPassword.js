const { Auth } = require("aws-amplify");

const forgotPassword = async ({ username }) => {
  try {
    await Auth.forgotPassword(username);
    return true;
  } catch (error) {
    if (error.code === "LimitExceededException") {
      throw new Error("LIMIT_EXCEEDED");
    } else {
      console.log("Error from forgotPassword", error);
    }
  }
};

export default forgotPassword;
