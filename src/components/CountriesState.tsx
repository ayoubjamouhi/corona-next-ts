import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Props {
  url: string;
}
interface Country {
  name: string;
  iso2: string;
  iso3: string;
}

interface Countries {
  countries: Array<Country>;
}
export const CountriesState: React.FC<Props> = ({ url }: Props) => {
  const [scountries, setScountries] = useState<Array<Object>>([]);
  useEffect(() => {
    async function fetchCountries() {
      const countries: AxiosResponse<Countries> = await axios
        .get<Countries>(url)
        .catch((err) => console.log(err));
      // console.log(countries);
      const c = countries.data.countries.map(
        async (country: { name: string; iso2: string; iso3: string }) => {
          const countryName = country.name;
          const codeCountry = country.iso2;
          // if (countries.data.includes(countries.countries[country])) {
          if (codeCountry !== undefined) {
            const stats = await axios
              .get(`https://covid19.mathdro.id/api/countries/${codeCountry}`)
              .catch((error) => {});
            /* const confirmedInCountry = await this.$axios
              .$get(
                `https://covid19.mathdro.id/api/countries/${codeCountry}/confirmed`
              )
              .catch(error => {}); */
            let datastats = null;
            if (stats !== undefined) {
              datastats = stats.data;
              return {
                countryName,
                codeCountry,
                datastats,
              };
            }
            return {
              countryName,
              codeCountry,
              datastats,
            };
          }
        }
      );

      const data = await Promise.all(c);
      const sort = data
        .filter((elem) => elem !== undefined && elem.datastats !== undefined)
        .sort((a, b) => {
          if (a.datastats != null && b.datastats != null) {
            return b.datastats.confirmed.value - a.datastats.confirmed.value;
          }
        });
      setScountries(sort);
    }
    fetchCountries();
  }, []);
  return (
    <table className="sm:bg-white rounded-lg sm:shadow-lg m-auto">
      <tbody>
        <tr className="flex flex-col sm:table-row mb-2 sm:mb-0">
          <td className="border-grey-light underline sm:no-underline text-red-500 sm:text-black border hover:bg-gray-100 p-3">
            Country
          </td>
          <td className="border-grey-light border hover:bg-gray-100 p-3">
            Cases
          </td>
          <td className="border-grey-light border hover:bg-gray-100 p-3">
            Deaths
          </td>
          <td className="border-grey-light border hover:bg-gray-100 p-3">
            Recovered
          </td>
          <td className="border-grey-light border hover:bg-gray-100 p-3">
            Last updated
          </td>
        </tr>
        {scountries.map((country) => (
          <tr
            className="flex flex-col sm:table-row mb-2 sm:mb-0"
            key={country.codeCountry}
          >
            <td className="border-grey-light underline sm:no-underline text-red-500 sm:text-black border hover:bg-gray-100 p-3">
              {country.countryName}
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-3">
              {country.datastats ? country.datastats.confirmed.value : '0'}
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-3">
              {country.datastats ? country.datastats.deaths.value : '0'}
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-3">
              {country.datastats ? country.datastats.recovered.value : '0'}
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-3">
              {country.datastats
                ? new Date(country.datastats.lastUpdate).toLocaleString()
                : '0'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
