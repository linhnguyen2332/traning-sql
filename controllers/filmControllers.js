
const filmServices = require("../services/filmServices")

const infoAllFilms = async (req, res, next) => {
  try {
    let data = await filmServices.getInfoAllFilms();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const top5mostRentedFilms = async (req, res, next) => {
  try {
    let data = await filmServices.getTop5mostRentedFilms();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const avgRentalDuration = async (req, res, next) => {
  try {
    let data = await filmServices.getAvgRentalDuration();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const ratingPG13LengthMore120MinFilms = async (req, res, next) => {
  try {
    let data = await filmServices.getRatingPG13LengthMore120MinFilms();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const unReturnedFilms = async (req, res, next) => {
  try {
    let data = await filmServices.getUnReturnedFilms();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const popularFilmsUniqueRentals = async (req, res, next) => {
  try {
    let data = await filmServices.getPopularFilmsUniqueRentals();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const filmsRentedByAllActionCustomers = async (req, res, next) => {
  try {
    let data = await filmServices.getFilmsRentedByAllActionCustomers();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const filmsGetRepeatedRentedFilmsByCustomer = async (req, res, next) => {
  try {
    let data = await filmServices.getFilmsRepeatedRentedFilmsByCustomer();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const popularFilmsWithoutGratedCustomers = async (req, res, next) => {
  try {
    let data = await filmServices.getPopularFilmsWithoutGratedCustomers();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateRentalRateFilmsRentedFilmsMoreThan100 = async (req, res, next) => {
  try {
    let data = await filmServices.updateRentalRateFilmsRentedFilmsMoreThan100Service();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateDurationsFilmsRentedMoreThan5 = async (req, res, next) => {
  try {
    let data = await filmServices.updateDurationsFilmsRentedMoreThan5Service();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateRentalRateActionFilmsReleasedBefore2005 = async (req, res, next) => {
  try {
    let data =
      await filmServices.updateRentalRateActionFilmsReleasedBefore2005Service();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateRentalRateRentedFilmsMoreThan10 = async (req, res, next) => {
  try {
    let data = await filmServices.updateRentalRateRentedFilmsMoreThan10Sevice();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateRentalRateFilmPG13Length2h = async (req, res, next) => {
  try {
    let data = await filmServices.updateRentalRateFilmPG13Length2hService();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateRentalDurationSciFiFilmsReleased2010 = async (req, res, next) => {
  try {
    let data = await filmServices.updateRentalDurationSciFiFilmsReleased2010Service();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateRentalRateComedyFilms2007 = async (req, res, next) => {
  try {
    let data = await filmServices.updateRentalRateComedyFilms2007Service();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const updateRentalRateRatingGLengthMax1h = async (req, res, next) => {
  try {
    let data = await filmServices.updateRentalRateRatingGLengthMax1hService();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};



module.exports = {
  infoAllFilms,
  top5mostRentedFilms,
  avgRentalDuration,
  ratingPG13LengthMore120MinFilms,
  unReturnedFilms,
  popularFilmsUniqueRentals,
  filmsRentedByAllActionCustomers,
  filmsGetRepeatedRentedFilmsByCustomer,
  popularFilmsWithoutGratedCustomers,
  updateRentalRateFilmsRentedFilmsMoreThan100,
  updateDurationsFilmsRentedMoreThan5,
  updateRentalRateActionFilmsReleasedBefore2005,
  updateRentalRateRentedFilmsMoreThan10,
  updateRentalRateFilmPG13Length2h,
  updateRentalDurationSciFiFilmsReleased2010,
  updateRentalRateComedyFilms2007,
  updateRentalRateRatingGLengthMax1h,
};
