const { Auth } = require("aws-amplify");

const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("Error: signOut", error);
  }
};

export default signOut;
