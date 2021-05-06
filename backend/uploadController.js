const aws = require("aws-sdk");
require("dotenv").config();

aws.config.update({
  region: "eu-west-2",
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const bucket = process.env.Bucket;

exports.sign_s3 = (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  //Payload
  const s3Params = {
    Bucket: bucket,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: "public-read",
  };

  //Getting signed URL
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }

    const returnData = {
      signedRequest: data,
      url: `https://${bucket}.s3.amazonaws.com/${fileName}`,
    };
    res.json({ success: true, data: { returnData } });
  });
};
