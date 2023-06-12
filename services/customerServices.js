const db = require("../config/connectDB");
const getTop10RevenueGeneratingCustomers = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT CONCAT(customer.first_name, ' ', customer.last_name) AS "Full name of top 10 customer", data.totalPayment
                FROM (
                SELECT customer_id, SUM(amount) AS totalPayment
                FROM payment
                GROUP BY customer_id
                ORDER BY totalPayment DESC
                LIMIT 10
                ) AS data
                LEFT JOIN customer ON data.customer_id = customer.customer_id`;
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

const getContactInfoAllCustomers = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT c.first_name, c.last_name, c.email, a.address, a.phone
        FROM customer c
        JOIN rental r ON c.customer_id = r.customer_id
        JOIN address a ON a.address_id = c.address_id
        JOIN inventory i ON r.inventory_id = i.inventory_id
        JOIN film_category fc ON i.film_id = fc.film_id
        JOIN category cate ON fc.category_id = cate.category_id
        GROUP BY c.customer_id
        HAVING COUNT(DISTINCT cate.category_id) = (SELECT COUNT(*) FROM category)`;
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

const getCustomersWithMultipleRentals = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT c.first_name, c.last_name, COUNT(*) as rental_count
        FROM customer c
        JOIN rental r1 ON c.customer_id = r1.customer_id
        JOIN rental r2 ON r1.customer_id = r2.customer_id AND 
        r1.rental_id <> r2.rental_id AND r1.rental_date = r2.rental_date
        JOIN inventory i ON r1.inventory_id = i.inventory_id
        GROUP BY c.customer_id
        HAVING rental_count > 1`;
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

const getCustomersWithNewCategoryRentals = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT DISTINCT customer.first_name, customer.last_name
                FROM customer
                JOIN rental ON customer.customer_id = rental.customer_id
                JOIN inventory ON rental.inventory_id = inventory.inventory_id
                JOIN film ON inventory.film_id = film.film_id
                JOIN film_category ON film.film_id = film_category.film_id
                JOIN category ON film_category.category_id = category.category_id
                WHERE NOT EXISTS (
                SELECT *
                FROM category
                WHERE NOT EXISTS (
                SELECT *
                FROM film_category
                JOIN inventory ON film_category.film_id = inventory.film_id
                JOIN rental ON inventory.inventory_id = rental.inventory_id
                WHERE rental.customer_id = customer.customer_id
                AND category.category_id = film_category.category_id))`;
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

const getCustomersRentedMoreThan10 = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT c.first_name,  c.last_name, 
                  COUNT(*) as number_of_rentals,  
                  SUM(p.amount) as total_rental_fee 
                  FROM customer c  
                  INNER JOIN payment p ON c.customer_id = p.customer_id  
                  INNER JOIN rental r ON p.rental_id = r.rental_id 
                  GROUP BY c.customer_id  
                  HAVING COUNT(*) > 10 `;
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

const getCustomersRentedEveryFilm = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT CONCAT(c.first_name, ' ', c.last_name) AS full_name, COUNT(*) AS total_rentals, SUM(f.rental_rate) AS total_fees
                  FROM customer c
                  JOIN rental r ON c.customer_id = r.customer_id
                  JOIN inventory i ON r.inventory_id = i.inventory_id
                  JOIN film f ON i.film_id = f.film_id
                  JOIN film_category fc ON f.film_id = fc.film_id
                  JOIN category ca ON fc.category_id = ca.category_id
                  GROUP BY full_name
                  HAVING total_rentals > 0`;
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

const getCustomersRentedFilmEachCategory = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT c.first_name,c.last_name,
                  COUNT(r.rental_id) AS total_rentals,
                  COUNT(DISTINCT f.category_id) AS total_categories
                  FROM customer c
                  INNER JOIN rental r ON c.customer_id = r.customer_id
                  INNER JOIN inventory i ON r.inventory_id = i.inventory_id
                  INNER JOIN film_category f ON i.film_id = f.film_id
                  WHERE f.category_id IN (
                      SELECT category_id 
                      FROM category)
                  GROUP BY c.customer_id
                  HAVING COUNT(DISTINCT f.category_id) = (
                  SELECT COUNT(*) 
                  FROM category
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

const getCustomersRentedFilmShorter3h = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT DISTINCT customer.first_name, customer.last_name
                  FROM customer
                  JOIN rental ON rental.customer_id = customer.customer_id
                  JOIN inventory ON rental.inventory_id = inventory.inventory_id
                  JOIN film ON inventory.film_id = film.film_id
                  WHERE film.length <= 180 
                  AND customer.customer_id NOT IN (
                      SELECT DISTINCT rental.customer_id
                      FROM rental
                      JOIN inventory ON rental.inventory_id = inventory.inventory_id
                      JOIN film_category ON inventory.film_id = film_category.film_id
                      WHERE rental.customer_id = customer.customer_id
                      AND film_category.category_id NOT IN (
                          SELECT DISTINCT film_category.category_id
                          FROM rental
                          JOIN inventory ON rental.inventory_id = inventory.inventory_id
                          JOIN film_category ON inventory.film_id = film_category.film_id
                          WHERE rental.customer_id = customer.customer_id
                      )
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

const updateNameCustomersRentedHorrorCategoryService = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE customer
SET email = CONCAT(email, 'horrorlover')
WHERE customer_id IN (
  SELECT rental.customer_id
  FROM rental
  JOIN inventory ON rental.inventory_id = inventory.inventory_id
  JOIN film ON inventory.film_id = film.film_id
  JOIN film_category ON film.film_id = film_category.film_id
  JOIN category ON film_category.category_id = category.category_id
  WHERE category.name = 'Horror' 
    AND MONTH(rental.return_date) = 10
    AND YEAR(rental.return_date) = 2021
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

const updateAddressSameCityLastNameService = () => {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE customer AS c1
                  JOIN customer AS c2
                  ON c1.address_id = c2.address_id AND c1.last_name = c2.last_name AND c1.customer_id != c2.customer_id
                  JOIN address AS a
                  ON c1.address_id = a.address_id
                  SET a.address = CONCAT(a.address, 'samecity');
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
  getTop10RevenueGeneratingCustomers,
  getContactInfoAllCustomers,
  getCustomersWithMultipleRentals,
  getCustomersWithNewCategoryRentals,
  getCustomersRentedMoreThan10,
  getCustomersRentedEveryFilm,
  getCustomersRentedFilmEachCategory,
  getCustomersRentedFilmShorter3h,
  updateNameCustomersRentedHorrorCategoryService,
  updateAddressSameCityLastNameService,
};
