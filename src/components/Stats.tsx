import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  url: string;
};
function Stats({ url }: Props) {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchStats = async () => {
      try {
        const stats = await axios.get(url);
        setStats(stats.data);
      } catch (error) {
        setError(true);
      }
    };
    fetchStats();
    setLoading(false);
  }, []);
  return (
    <header>
      <div className="stat--container grid grid-cols-1 sm:grid-cols-3 gap-1 my-4">
        <div className="stat-block bg-gray-200 p-2">
          <h3 className="text-3xl">Confirmed:</h3>
          <span className="text-yellow-400 font-bold text-3xl">
            {stats !== null && stats.confirmed
              ? stats.confirmed.value
              : 'Loading...'}
          </span>
        </div>
        <div className="stat-block bg-gray-200 p-2">
          <h3 className="text-3xl">Deaths:</h3>
          <span className="text-yellow-400 font-bold text-3xl">
            {stats !== null && stats.confirmed
              ? stats.deaths.value
              : 'Loading...'}
          </span>
        </div>
        <div className="stat-block bg-gray-200 p-2">
          <h3 className="text-3xl">Recovered:</h3>
          <span className="text-yellow-400 font-bold text-3xl">
            {stats !== null && stats.recovered
              ? stats.recovered.value
              : 'Loading...'}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Stats;
