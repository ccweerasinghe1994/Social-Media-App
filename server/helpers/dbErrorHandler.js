const getErrorMessage = (error) => {
  let message = "";
  const { code, errors } = error;
  if (code) {
    switch (code) {
      case 11000:
      case 11001:
        message = getUniqErrorMessage(error);
        break;
      default:
        message = "some thing went wrong";
    }
  } else {
    for (let errorName in errors) {
      if (errors[errorName].message) message = errors[errorName].message;
    }
  }
};

const getUniqErrorMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + "already exists";
  } catch (errors) {
    output = "Unique field already exists";
  }
  return output;
};
export default { getErrorMessage };
