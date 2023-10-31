import specialService from "../services/specialService";

let createSpecialty = async (req, res) => {
    try {
        let infor = await specialService.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let getAllSpecialty = async (req, res) => {
    try {
        let infor = await specialService.getAllSpecialty();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let getDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await specialService.getDetailSpecialtyById(
            req.query.id,
            req.query.location
        );
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

export default {
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
};
