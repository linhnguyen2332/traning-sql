const express = require('express');
let router = express.Router();
const {actorControllers, customerControllers, filmControllers} = require('../controllers')

let initWebRoutes = (app) => {
        //actors
        router.get("/api/full-name-all-actors-11", actorControllers.fullNameAllActors);
        router.get('/api/actor-appeared-in-more-20films', actorControllers.actorAppearedInMore20Films);
        router.get('/api/actors-in-each-category', actorControllers.actorsInEachCategory);
        router.get('/api/actor-revenue-totals', actorControllers.actorRepvenueTotals);
        router.get('/api/actors-rated-R-without-G', actorControllers.actorsRatedRWithoutG);
        router.get("/api/avg-rental-duration-by-actor-category", actorControllers.avgRentalDurationByActorCategory);
        router.get('/actors/appreared-every-other-actor', actorControllers.actorsApprearedEveryOtherActor);
        router.get("/actors/r-rated-long-films-without-g-rated", actorControllers.actorRRatedLongFilmsWithoutGrated);
        router.get("/actors/appreared-films-PG13length2h-R90p", actorControllers.apprearedFilmsPG13length2hR90p);

        //customers
        router.get('/api/top10-revenue-generating-customers', customerControllers.top10RevenueGeneratingCustomers);
        router.get('/api/contact-info-all-customer', customerControllers.contactInfoAllCustomers);
        router.get('/api/customers-with-multiple-rentals', customerControllers.customersWithMultipleRentals);
        router.get("/api/customers-with-new-category-rentals",customerControllers.customersWithNewCategoryRentals);
        router.get('/customers/rented-more-than-10', customerControllers.customersRentedMoreThan10);
        router.get('/customers/rented-every-film', customerControllers.customersRentedEveryFilm);
        router.get('/customers/rented-film-each-category', customerControllers.customersRentedFilmEachCategory);
        router.get('/customers/rented-film-shorter-3h', customerControllers.customersRentedFilmShorter3h)
        router.put('/customers/update-nameCustomers-rented-horrorCategory', customerControllers.updateNameCustomersRentedHorrorCategory)
        router.put('/customers/update-address-same-city-lastName', customerControllers.updateAddressSameCityLastName)

        //films
        router.get('/api/info-all-films-12', filmControllers.infoAllFilms);
        router.get('/api/top5-most-rented-films-13', filmControllers.top5mostRentedFilms);
        router.get('/api/average-rental-duration-14', filmControllers.avgRentalDuration);
        router.get('/api/rating-pg-13-length-more-120min-films', filmControllers.ratingPG13LengthMore120MinFilms);
        router.get('/api/unreturned-films', filmControllers.unReturnedFilms);
        router.get('/api/popular-films-unique-rentals', filmControllers.popularFilmsUniqueRentals);
        router.get('/api/films-rented-by-all-action-customers', filmControllers.filmsRentedByAllActionCustomers);
        router.get('/films/get-repeated-rented-films-by-customer', filmControllers.filmsGetRepeatedRentedFilmsByCustomer);
        router.get('/films/popular-films-without-g-rated-customers', filmControllers.popularFilmsWithoutGratedCustomers);
        
        router.put('/films/update-rentalRate-films-rented-morethan100', filmControllers.updateRentalRateFilmsRentedFilmsMoreThan100);
        router.put('/films/update-durations-films-rented-morethan5', filmControllers.updateDurationsFilmsRentedMoreThan5)
        router.put('/films/update-rentalRate-actionFilms-releasedBefore2005', filmControllers.updateRentalRateActionFilmsReleasedBefore2005);
        router.put('/films/update-rentalRate-rentedFilms-moreThan10', filmControllers.updateRentalRateRentedFilmsMoreThan10)
        router.put('/films/update-rentalRate-films-PG13-length2h', filmControllers.updateRentalRateFilmPG13Length2h)
        router.put('/films/update-rentalDuration-sci-fi-films-released2010', filmControllers.updateRentalDurationSciFiFilmsReleased2010)
        router.put('/films/update-rentalRate-comedy-films2007', filmControllers.updateRentalRateComedyFilms2007)
        router.put('/films/update-rentalRate-ratingG-lengthmax1h', filmControllers.updateRentalRateRatingGLengthMax1h)

        return app.use("/", router);
}
module.exports = initWebRoutes