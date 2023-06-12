
const customerServices = require("../services/customerServices");

const top10RevenueGeneratingCustomers = async (req, res, next) => {
  try {
    let data = await customerServices.getTop10RevenueGeneratingCustomers();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const contactInfoAllCustomers = async (req, res, next) => {
  try {
    let data = await customerServices.getContactInfoAllCustomers();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const customersWithMultipleRentals = async (req, res, next) => {
  try {
    let data = await customerServices.getCustomersWithMultipleRentals();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const customersWithNewCategoryRentals = async (req, res, next) => {
  try {
    let data = await customerServices.getCustomersWithNewCategoryRentals();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const customersRentedMoreThan10 = async (req, res, next) => {
  try {
    let data = await customerServices.getCustomersRentedMoreThan10();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const customersRentedEveryFilm = async (req, res, next) => {
  try {
    let data = await customerServices.getCustomersRentedEveryFilm();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const customersRentedFilmEachCategory = async (req, res, next) => {
  try {
    let data = await customerServices.getCustomersRentedFilmEachCategory();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const customersRentedFilmShorter3h = async (req, res, next) => {
  try {
    let data = await customerServices.getCustomersRentedFilmShorter3h();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateNameCustomersRentedHorrorCategory = async (req, res, next) => {
  try {
    let data = await customerServices.updateNameCustomersRentedHorrorCategoryService();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateAddressSameCityLastName = async (req, res, next) => {
  try {
    let data = await customerServices.updateAddressSameCityLastNameService();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};




module.exports = {
  top10RevenueGeneratingCustomers,
  contactInfoAllCustomers,
  customersWithMultipleRentals,
  customersWithNewCategoryRentals,
  customersRentedMoreThan10,
  customersRentedEveryFilm,
  customersRentedFilmEachCategory,
  customersRentedFilmShorter3h,
  updateNameCustomersRentedHorrorCategory,
  updateAddressSameCityLastName,
};