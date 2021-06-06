const errorHandler = async (error: any) => {
  if (error.response) {
    const { response: { status } } = error;

    switch (status) {
      case 401:
        console.log("Unauthorized")
        break;
      default:
        if (error.response.data.key) {
          console.log(`apiErrors.${error.response.data.key}`);
        } else if (error.message) {
          console.log(error.message);
        }

        break;
    }
  }
  throw error;
};

export default errorHandler;
