/* global require */
/* eslint-disable */

const fs = require('fs');
const blah = require('country-city-location');
const _ = require('lodash');

const c = (f) => parseFloat(f).toFixed(3);

const allCities = blah.countries.reduce(
    (acc, i) => ({
        ...acc,
        [i.Name]: {
            co: [c(i.Longitude), c(i.Latitude)],
            ct: blah.getCitiesByCountryCode(i.Alpha2Code).reduce(
                (acc2, i2) => ({
                    ...acc2,
                    [i2.name]: [c(i2.lng), c(i2.lat)],
                }),
                {},
            ),
        },
    }),
    {},
);

fs.writeFileSync('all-cities.json', JSON.stringify(allCities));

const countries = blah.countries.reduce(
    (acc, i) => ({
        ...acc,
        [i.Name]: [c(i.Longitude), c(i.Latitude)],
    }),
    {},
);

fs.writeFileSync('public/countries.json', JSON.stringify(countries));

blah.countries.forEach((i) => {
    console.log(i.Name);
    fs.writeFileSync(
        `public/countries/${_.snakeCase(i.Name)}.json`,
        JSON.stringify(
            blah.getCitiesByCountryCode(i.Alpha2Code).reduce(
                (acc2, i2) => ({
                    ...acc2,
                    [i2.name]: [c(i2.lng), c(i2.lat)],
                }),
                {},
            ),
        ),
    );
});
