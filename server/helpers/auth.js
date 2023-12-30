import bcrypt from "bcrypt";
export const hashPassword = (password) => {
  return new Promise(
    (resolve, reject) =>
      {bcrypt.genSalt(12, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      }); //genSalt how power u want
    });
};
export const ComparePassword = (password,hashed) => {
    return bcrypt.compare(password,hashed); //true or false 
};