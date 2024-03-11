
var cloudinary = require('cloudinary')

const cloud_name=process.env.CLOUD_NAME
const api_key=process.env.FILE_UPLOAD_API_KEY
const api_secret=process.env.FILE_UPLOAD_API_SECRET

cloudinary.config({
    cloud_name:cloud_name,
    api_key:api_key,
    api_secret:api_secret
});

const opts={
    overwrite:true,
    invalidate:true,
    resource_type:"auto",
};

// module.exports=(file)=>{
//     return new Promise((resolve,reject)=>{
//         cloudinary.uploader.upload(file,opts,(error,result)=>{
//             if (result && result.secure_url){
//                 console.log(result.secure_url);
//                 return resolve(result.secure_url);
//             }
//             console.log(error.message);
//             return reject({message:error.message});
//         });
//     });
// };

async function uploadFiles(file){
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, (err, url) => {
          if (err) return reject(err);
          return resolve(url);
        })
      });
};

module.exports={uploadFiles}