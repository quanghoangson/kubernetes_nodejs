import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "error form sever...",
        });
    }
};

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from the server",
        });
    }
};

let postInforDoctor = async (req, res) => {
    try {
        console.log("check responkg", req.body);
        let response = await doctorService.saveDetailInfoDoctor(req.body);

        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from the server",
        });
    }
};
let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id);
        //console.log(infor);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "error from the server",
        });
    }
};

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        //console.log("adsf", req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "error from the server",
        });
    }
};

let getScheduleByDate = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleByDate(
            req.query.doctorId,
            req.query.date
        );

        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "error from the server",
        });
    }
};
let getExtraInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getExtraInforDoctorById(
            req.query.doctorId
        );
        //console.log("check inopput: ", req.query.doctorId);

        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "error from the server",
        });
    }
};

let getProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getProfileDoctorById(
            req.query.doctorId
        );
        // console.log("check inopput: ", req.query.doctorId);

        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "error from the server",
        });
    }
};

let getListPatientForDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getListPatientForDoctor(
            req.query.doctorId,
            req.query.date
        );
        // console.log("check inopput: ", req.query.doctorId);

        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "error from the server",
        });
    }
};

let sendRemedy = async (req, res) => {
    try {
        let infor = await doctorService.sendRemedy(req.body);

        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: 1,
            errMessage: "error from the server",
        });
    }
};
export default {
    getTopDoctorHome,
    getAllDoctors,
    postInforDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    getListPatientForDoctor,
    sendRemedy,
};
