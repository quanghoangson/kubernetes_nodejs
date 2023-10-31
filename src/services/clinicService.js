const db = require("../models");
let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.address ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                await db.clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });
                resolve({
                    errCode: 0,
                    errMessage: "ok",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.clinic.findAll({});

            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, "base64").toString(
                        "binary"
                    );
                    return item;
                });
            }
            resolve({
                errCode: 0,
                errMessage: "ok",
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                });
            } else {
                let data = await db.clinic.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: [
                        "name",
                        "address",
                        "descriptionHTML",
                        "descriptionMarkdown",
                    ],
                });

                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: inputId,
                        },
                        attributes: ["doctorId", "provinceId"],
                    });
                    data.doctorClinic = doctorClinic;

                    resolve({
                        errCode: 0,
                        errMessage: "ok",
                        data,
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};
export default {
    createClinic,
    getDetailClinicById,
    getAllClinic,
};
