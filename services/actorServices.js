const db = require("../config/connectDB");

const getAllActor = () => {
  return new Promise((resolve, reject) => {
    try {
      let query =
        'SELECT CONCAT(first_name, " " ,last_name) as full_name_actor FROM actor';
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

const getActorAppearedInMore20Films = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT CONCAT(first_name, " " ,last_name) AS full_name_actor
                FROM (SELECT actor_id, COUNT(*) as countFilmS 
                FROM film_actor 
                Group BY actor_id
                HAVING countFilmS > 20) as data
                LEFT JOIN actor ON data.actor_id = actor.actor_id`;
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

const getActorsInEachCategory = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `
        SELECT actor.first_name, actor.last_name 
        FROM actor 
        JOIN film_actor ON actor.actor_id = film_actor.actor_id 
        JOIN film_category ON film_actor.film_id = film_category.film_id 
        GROUP BY actor.actor_id 
        HAVING COUNT(DISTINCT film_category.category_id) = (
        SELECT COUNT(*) FROM category)`;
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

const getActorRepvenueTotals = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT actor.actor_id, actor.first_name, actor.last_name, 
        SUM(payment.amount) AS total_revenue 
        FROM actor 
        JOIN film_actor ON actor.actor_id = film_actor.actor_id 
        JOIN film ON film_actor.film_id = film.film_id 
        JOIN inventory ON film.film_id = inventory.film_id 
        JOIN rental ON inventory.inventory_id = rental.inventory_id 
        JOIN payment ON rental.rental_id = payment.rental_id 
        GROUP BY actor.actor_id, actor.first_name, actor.last_name 
        ORDER BY total_revenue DESC`;
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

const getActorsRatedRWithoutG = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT actor.first_name, actor.last_name
        FROM actor
        JOIN film_actor ON actor.actor_id = film_actor.actor_id
        JOIN film ON film_actor.film_id = film.film_id
        WHERE film.rating = 'R'
        AND actor.actor_id NOT IN (
            SELECT actor.actor_id
            FROM actor
            JOIN film_actor ON actor.actor_id = film_actor.actor_id
            JOIN film ON film_actor.film_id = film.film_id
            WHERE film.rating = 'G'
        )
        GROUP BY actor.actor_id, actor.first_name, actor.last_name`;
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

const getAvgRentalDurationByActorCategory = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT a.actor_id, c.name AS category_name, AVG(DATEDIFF(return_date, rental_date)) AS avg_rental_duration
                FROM  actor a 
                    JOIN film_actor fa ON a.actor_id = fa.actor_id 
                    JOIN film_category fc ON fa.film_id = fc.film_id 
                    JOIN category c ON fc.category_id = c.category_id 
                    JOIN inventory i ON fc.film_id = i.film_id 
                    JOIN rental r ON i.inventory_id = r.inventory_id 
                WHERE a.actor_id IN (
                    SELECT fa.actor_id
                    FROM film_actor fa
                    JOIN film_category fc ON fa.film_id = fc.film_id
                    GROUP BY fa.actor_id
                    HAVING COUNT(DISTINCT fc.category_id) > 0)
                GROUP BY a.actor_id, c.category_id`;
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

const getActorRRatedLongFilmsWithoutGrated = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT a.first_name, a.last_name
                  FROM actor a
                  JOIN film_actor fa ON a.actor_id = fa.actor_id
                  JOIN film  f ON fa.film_id = f.film_id
                  JOIN film_category fc ON f.film_id = fc.film_id
                  JOIN category c ON fc.category_id = c.category_id
                  WHERE f.rating = 'R' AND f.length > 120
                  AND a.actor_id NOT IN (
                  SELECT DISTINCT actor.actor_id
                  FROM actor
                  JOIN film_actor ON actor.actor_id = film_actor.actor_id
                  JOIN film ON film_actor.film_id = film.film_id
                  JOIN film_category ON film.film_id = film_category.film_id
                  JOIN category ON film_category.category_id = category.category_id
                  WHERE film.rating = 'G')`;
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

const getActorApprearedFilmsPG13length2hR90p = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT DISTINCT actor.first_name, actor.last_name
                  FROM actor 
                  INNER JOIN film_actor ON actor.actor_id = film_actor.actor_id
                  INNER JOIN film ON film.film_id = film_actor.film_id
                  WHERE film.rating = 'PG-13' AND film.length > 120
                  AND actor.actor_id IN (
                  	SELECT film_actor.actor_id
                  	FROM film_actor
                  	INNER JOIN film ON film.film_id = film_actor.film_id
                  	WHERE film.rating = 'R' AND film.length < 90
                  )`;
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

const actorsApprearedEveryOtherActorService = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT CONCAT(A1.first_name, ' ', A1.last_name) AS actor1,
                           CONCAT(A2.first_name, ' ', A2.last_name) AS actor2,
                           COUNT(*) AS film_count
                    FROM actor A1
                    JOIN film_actor FA1 ON FA1.actor_id = A1.actor_id
                    JOIN film_actor FA2 ON FA2.film_id = FA1.film_id
                    JOIN actor A2 ON A2.actor_id = FA2.actor_id AND A2.actor_id <> A1.actor_id
                    GROUP BY actor1, actor2
                    HAVING COUNT(*) = (
                        SELECT COUNT(*)
                        FROM actor
                    ) - 1
                    ORDER BY film_count DESC;
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
module.exports = {
  getAllActor,
  getActorAppearedInMore20Films,
  getActorsInEachCategory,
  getActorRepvenueTotals,
  getActorsRatedRWithoutG,
  getAvgRentalDurationByActorCategory,
  getActorRRatedLongFilmsWithoutGrated,
  getActorApprearedFilmsPG13length2hR90p,
  actorsApprearedEveryOtherActorService,
};
