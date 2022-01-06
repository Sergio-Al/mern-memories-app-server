import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // if is lesser than 500 is google OAuth, otherwise is our custom Token (bearer)

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // google attribute for user Id
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
