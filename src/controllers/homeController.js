import sequelize from "sequelize";
import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render("homepage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};
let getAboutPage = (req, res) => {
    return res.render("text/about.ejs");
};

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    // let data = await CRUDService.getAlluser();
    console.log(message);
    return res.send("post crud from server");
    // return res.render("displayCRUD.ejs", {
    //     dataTable: data,
    // });
};

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAlluser();
    // console.log("-------------");
    // console.log(data);

    return res.render("displayCRUD.ejs", {
        dataTable: data,
    });
};

let getEditCRUD = async (req, res) => {
    let userId = req.query.id; //get id

    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId); //call to func of crudservice

        return res.render("editCRUD.ejs", {
            user: userData,
        });
    } else {
        return res.send("user not found");
    }
};

let putCRUD = async (req, res) => {
    let data = req.body; //get all data of input
    let allUsers = await CRUDService.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers,
    });
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id; //get id
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send("delete user success!");
    } else {
        return res.send("user not found!");
    }
};

export default {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
};
