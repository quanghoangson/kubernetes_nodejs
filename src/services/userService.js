import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email); //so sach isExist = true/ false

            if (isExist) {
                //user already exist

                let user = await db.User.findOne({
                    // attributes: ["password"],
                    attributes: [
                        "id",
                        "email",
                        "roleId",
                        "password",
                        "firstName",
                        "lastName",
                    ],
                    where: { email: email },
                    raw: true,
                });

                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(
                        password,
                        user.password
                    );

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        delete user.password;
                        userData.user = user; //in ra data user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `wrong password!`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `user does not exist!`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `email does not exist!`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true); //return  true
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    attributes: {
                        exclude: ["password"],
                    },
                    where: { id: userId },
                });
            }

            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // //check email is exits?
            let check = await checkUserEmail(data.email);

            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "email already used, please enter another email! ",
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(
                    data.password
                );
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar,
                });
            }

            resolve({
                errCode: 0,
                errMessage: "OK ",
            });
        } catch (e) {
            reject(e);
        }
    });
};

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId },
        });

        if (!user) {
            resolve({
                errCode: 1,
                errMessage: "User not found!",
            });
        }
        // await user.destroy()
        await db.User.destroy({
            where: { id: userId },
        });

        resolve({
            errCode: 0,
            errMessage: "OK, delete success!",
        });
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters",
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                // await user.update({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address,
                //     roleId: data.roleId,
                //     positionId: data.positionId,
                //     gender: data.gender,
                //     phonenumber: data.phonenumber,
                // });
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: "update success",
                });
            } else {
                resolve({ errCode: 1, errMessage: "user not found" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getAllCodeService = async (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing requied parameter !",
                });
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput },
                });
                res.errCode = 0;
                res.data = allcode;

                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
};
export default {
    handleUserLogin,
    checkUserEmail,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUserData,
    getAllCodeService,
};
