import bcrypt from "bcryptjs";
import db from "../models";
import { raw } from "body-parser";
import { resolveInclude } from "ejs";
import sequelize from "sequelize";
import { Operators } from "sequelize";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            });

            resolve("OK! create user success!");
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

let getAlluser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true, //log ra 1 object
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });

            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            // if (user) {
            //     user.firstName = data.firstName;
            //     user.lastName = data.lastName;
            //     user.address = data.address;

            //     let allUsers = await db.User.findAll();
            //     resolve(allUsers);
            // } else {
            //     resolve();
            // }
            if (user) {
                await user.update({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                });
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};

let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
            });

            if (id) {
                await db.User.destroy({
                    where: { id: id },
                });
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    createNewUser,
    getAlluser,
    hashUserPassword,
    getUserInfoById,
    updateUserData,
    deleteUserById,
};
