const { Auth } = require("aws-amplify");

const signUpConfirmation = async ({ username, code }) => {
  try {
    const confirmSignUp = await Auth.confirmSignUp(username, code);
    return confirmSignUp;
  } catch (error) {
    if (error.code === "CodeMismatchException") {
      throw new Error("CODE_MISMATCH");
    } else if (error.code === "LimitExceededException") {
      throw new Error("LIMIT_EXCEEDED");
    } else {
      console.log("Error signUpConfirmation", error);
    }
  }
};

export default signUpConfirmation;
