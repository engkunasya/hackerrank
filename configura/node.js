const fs = require('fs');
const fetch = require('node-fetch');
const readLine = require('readline');

async function highestInternationalStudents(firstCity, secondCity) {
  try {
    let currentPage = 1;
    let totalPages = 1;
    let universities = [];

    while (currentPage <= totalPages) {
      const response = await fetch(`https://jsonmock.hackerrank.com/api/universities?page=${currentPage}`);
      const { data, total_pages } = await response.json();

      universities = universities.concat(data);
      totalPages = total_pages;
      currentPage++;
    }

    const universitiesInFirstCity = universities.filter(uni => uni.location.city === firstCity);
    const universitiesInSecondCity = universities.filter(uni => uni.location.city === secondCity);

    const highestIntlStudentsInFirstCity = universitiesInFirstCity.length > 0
      ? Math.max(...universitiesInFirstCity.map(uni => parseInt(uni['international_students'].replace(',', ''))))
      : 0;

    const highestIntlStudentsInSecondCity = Math.max(...universitiesInSecondCity.map(uni => parseInt(uni['international_students'].replace(',', ''))));

    let universityName = '';

    if (highestIntlStudentsInFirstCity > 0) {
      const universityInFirstCity = universitiesInFirstCity.find(
        uni => parseInt(uni['international_students'].replace(',', '')) === highestIntlStudentsInFirstCity
      );
      universityName = universityInFirstCity.university;
    } else {
      const universityInSecondCity = universitiesInSecondCity.find(
        uni => parseInt(uni['international_students'].replace(',', '')) === highestIntlStudentsInSecondCity
      );
      universityName = universityInSecondCity.university;
    }

    return universityName;
  } catch (error) {
    throw new Error('An error occurred while retrieving university data.');
  }
}

// async function main() {
//   const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

//   const firstCity = readLine();

//   const secondCity = readLine();

//   const result = await highestInternationalStudents(firstCity, secondCity);

//   ws.write(result + '\n');

//   ws.end();
// }

// Assuming the readLine function is available for input
// my code:highestInternationalStudents()

main().catch(error => console.error(error));