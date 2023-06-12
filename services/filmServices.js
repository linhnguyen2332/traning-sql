const db = require("../config/connectDB");

const getInfoAllFilms = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = "SELECT title, rental_rate, replacement_cost FROM film";
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getTop5mostRentedFilms = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = "SELECT title, rental_rate, replacement_cost FROM film";
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAvgRentalDuration = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT c.name AS "Category", AVG(TIMESTAMPDIFF(DAY, r.rental_date, r.return_date)) AS "Average duration"
        FROM category c
        JOIN film_category fc ON c.category_id = fc.category_id
        JOIN film f ON fc.film_id = f.film_id
        JOIN inventory i ON f.film_id = i.film_id
        JOIN rental r ON i.inventory_id = r.inventory_id
        GROUP BY c.category_id`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getRatingPG13LengthMore120MinFilms = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT title FROM film WHERE rating = "PG-13" and length>120`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUnReturnedFilms = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT f.title
        FROM film f
        JOIN inventory i ON f.film_id = i.film_id
        JOIN rental r ON i.inventory_id = r.inventory_id
        WHERE r.return_date IS NULL`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getPopularFilmsUniqueRentals = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT film.title, film.film_id
        FROM film
        JOIN inventory ON film.film_id = inventory.film_id
        JOIN rental ON inventory.inventory_id = rental.inventory_id
        GROUP BY film.film_id
        HAVING COUNT(DISTINCT rental.customer_id) > 30
        AND COUNT(DISTINCT rental.customer_id) = COUNT(*)`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getFilmsRentedByAllActionCustomers = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `
                SELECT DISTINCT f.title 
                FROM film f
                JOIN inventory i ON f.film_id = i.film_id 
                JOIN rental r ON i.inventory_id = r.inventory_id 
                JOIN customer c ON r.customer_id = c.customer_id 
                JOIN film_category fc ON f.film_id = fc.film_id 
                JOIN category ca ON fc.category_id = ca.category_id 
                WHERE ca.name = 'Action'  
                AND c.customer_id IN ( 
                SELECT DISTINCT c.customer_id 
                FROM customer c 
                JOIN rental r ON c.customer_id = r.customer_id 
                JOIN inventory i ON r.inventory_id = i.inventory_id 
                JOIN film f ON i.film_id = f.film_id 
                JOIN film_category fc ON f.film_id = fc.film_id
                JOIN category ca ON fc.category_id = ca.category_id
                WHERE ca.name = 'Action')`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getFilmsRepeatedRentedFilmsByCustomer = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT f.title, c.first_name, c.last_name, COUNT(*) AS rental_count
                  FROM rental r
                  INNER JOIN inventory i ON r.inventory_id = i.inventory_id
                  INNER JOIN film f ON i.film_id = f.film_id
                  INNER JOIN customer c ON r.customer_id = c.customer_id
                  GROUP BY f.title, c.first_name, c.last_name
                  HAVING COUNT(*) > 1;
                  `;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getPopularFilmsWithoutGratedCustomers = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT film.title, COUNT(rental.rental_id) as rental_count
                  FROM film
                  JOIN inventory ON film.film_id = inventory.film_id
                  JOIN rental ON inventory.inventory_id = rental.inventory_id
                  JOIN customer ON rental.customer_id = customer.customer_id
                  WHERE film.film_id NOT IN (
                    SELECT inventory.film_id
                    FROM inventory
                    JOIN rental ON inventory.inventory_id = rental.inventory_id
                    JOIN customer ON rental.customer_id = customer.customer_id
                    JOIN film AS film1 ON inventory.film_id = film1.film_id
                    WHERE film1.rating = 'G'
                  )
                  GROUP BY film.film_id
                  HAVING COUNT(rental.rental_id) > 30;`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRentalRateFilmsRentedFilmsMoreThan100Service = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE film 
                  SET rental_rate = rental_rate * 1.1
                  WHERE film_id IN (
                    SELECT inventory.film_id 
                    FROM rental
                    JOIN inventory ON rental.inventory_id = inventory.inventory_id
                    GROUP BY inventory.film_id 
                    HAVING COUNT(*) > 100
                  );`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateDurationsFilmsRentedMoreThan5Service = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE film 
                SET rental_duration = ROUND(rental_duration * 1.1) 
                WHERE film_id IN (
                  SELECT film_id 
                  FROM rental 
                  GROUP BY film_id 
                  HAVING COUNT(rental_id) > 5
                );`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateRentalRateActionFilmsReleasedBefore2005Service = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE film f
                  INNER JOIN film_category fc ON f.film_id = fc.film_id
                  INNER JOIN category c ON fc.category_id = c.category_id
                  SET f.rental_rate = f.rental_rate * 1.2
                  WHERE c.name = 'Action' AND f.release_year < 2005;`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateRentalRateRentedFilmsMoreThan10Sevice = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE film
                  SET rental_rate = LEAST(rental_rate * 1.05, 4.00)
                  WHERE film_id IN (
                    SELECT inventory.film_id
                    FROM rental
                    JOIN inventory ON rental.inventory_id = inventory.inventory_id
                    GROUP BY inventory.film_id
                    HAVING COUNT(DISTINCT rental.customer_id) > 10
                  );`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRentalRateFilmPG13Length2hService = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE film
SET rental_rate = 3.50
WHERE rating = 'PG-13' AND length > 120;`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRentalDurationSciFiFilmsReleased2010Service = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE film
                  SET rental_duration = length
                  WHERE film_id IN (
                      SELECT film_id FROM film_category
                      WHERE category_id = (
                          SELECT category_id FROM category WHERE name = 'Sci-Fi'
                      )
                  ) AND YEAR(release_year) = 2010;
                  `;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRentalRateComedyFilms2007Service = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = ` UPDATE film
                  SET rental_rate = rental_rate * 0.85
                  WHERE film_id IN (
                  SELECT fc.film_id
                  FROM film_category fc
                  JOIN category c ON fc.category_id = c.category_id
                  WHERE c.name = 'Comedy'
                  ) AND release_year >= 2006;`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRentalRateRatingGLengthMax1hService = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = ` UPDATE film
                  SET rental_rate = 1.50
                  WHERE rating = 'G' AND length < 60;`;
      db.query(query, (error, results) => {
        if (error) {
          resolve({
            errCode: 1,
            errMessage: "Error retrieving users",
          });
        } else {
          resolve(results);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getInfoAllFilms,
  getTop5mostRentedFilms,
  getAvgRentalDuration,
  getRatingPG13LengthMore120MinFilms,
  getUnReturnedFilms,
  getPopularFilmsUniqueRentals,
  getFilmsRentedByAllActionCustomers,
  getFilmsRepeatedRentedFilmsByCustomer,
  getPopularFilmsWithoutGratedCustomers,
  updateRentalRateFilmsRentedFilmsMoreThan100Service,
  updateDurationsFilmsRentedMoreThan5Service,
  updateRentalRateActionFilmsReleasedBefore2005Service,
  updateRentalRateRentedFilmsMoreThan10Sevice,
  updateRentalRateFilmPG13Length2hService,
  updateRentalDurationSciFiFilmsReleased2010Service,
  updateRentalRateComedyFilms2007Service,
  updateRentalRateRatingGLengthMax1hService,
};
