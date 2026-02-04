const modifyReq = (req, res, next) => {
  if(req.headers.name === "Aniket"){
    next()
  }else{
    res.status(401).json({
        success : false,
        message : "You are not authorized"
    })
  }
};

export { modifyReq };