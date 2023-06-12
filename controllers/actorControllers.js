
const actorServices = require("../services/actorServices");

const fullNameAllActors = async(req, res, next) => {
    try {
        let data = await actorServices.getAllActor()
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
          errCode: -1,
          errMessage: "Error from the server",
        });
    }
};

const actorAppearedInMore20Films = async (req, res, next) => {
  try {
    let data = await actorServices.getActorAppearedInMore20Films();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const actorsInEachCategory = async (req, res, next) => {
  try {
    let data = await actorServices.getActorsInEachCategory();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const actorRepvenueTotals = async (req, res, next) => {
  try {
    let data = await actorServices.getActorRepvenueTotals();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const actorsRatedRWithoutG = async (req, res, next) => {
  try {
    let data = await actorServices.getActorsRatedRWithoutG();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const avgRentalDurationByActorCategory = async (req, res, next) => {
  try {
    let data = await actorServices.getAvgRentalDurationByActorCategory();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const actorRRatedLongFilmsWithoutGrated = async (req, res, next) => {
  try {
    let data = await actorServices.getActorRRatedLongFilmsWithoutGrated();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const apprearedFilmsPG13length2hR90p = async (req, res, next) => {
  try {
    let data = await actorServices.getActorApprearedFilmsPG13length2hR90p();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const actorsApprearedEveryOtherActor = async (req, res, next) => {
  try {
    let data = await actorServices.actorsApprearedEveryOtherActorService();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};



module.exports = {
  fullNameAllActors,
  actorAppearedInMore20Films,
  actorsInEachCategory,
  actorRepvenueTotals,
  actorsRatedRWithoutG,
  avgRentalDurationByActorCategory,
  actorRRatedLongFilmsWithoutGrated,
  apprearedFilmsPG13length2hR90p,
  actorsApprearedEveryOtherActor,
};