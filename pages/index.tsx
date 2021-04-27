import Link from 'next/link';
import Layout from '../src/components/Layout';
import Stats from '../src/components/Stats';
import CountriesState from '../src/components/CountriesState';

const IndexPage = () => (
  <Layout title="Coronavirus statistics">
    <div className="container min-h-screen text-center mx-auto p-1 bg-gray-100">
      <h1 className="text-center text-4xl">Coronavirus Statistics</h1>
      <Stats url="https://covid19.mathdro.id/api" />
      <CountriesState url="https://covid19.mathdro.id/api/countries" />
    </div>
  </Layout>
);

export default IndexPage;
