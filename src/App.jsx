import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.cricapi.com/v1/matches?apikey=81aa138a-2f2a-4f63-b30b-7d9fe4be3a1f&offset=0"
        );

        console.log("API Response:", response.data); // ✅ CHECK CONSOLE FOR DATA

        if (response.data && response.data.data) {
          setMatches(response.data.data);
        } else {
          console.warn("No match data found.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>🏏 Live IPL Scoreboard 🏏</h1>
      {loading ? (
        <p>Loading matches...</p>
      ) : matches.length === 0 ? (
        <p>No live IPL matches currently.</p>
      ) : (
        matches.map((match, index) => (
          <div key={index} className="match-card">
            <h2>{match.name || "Unknown Match"}</h2>
            <p>
              <strong>
                {match.teamInfo?.[0]?.shortname || "Team 1"} vs{" "}
                {match.teamInfo?.[1]?.shortname || "Team 2"}
              </strong>
            </p>
            {match.score && match.score.length > 0 ? (
              match.score.map((inning, i) => (
                <p key={i}>
                  <strong>{inning.inning}:</strong> {inning.r}/{inning.w} ({inning.o} overs)
                </p>
              ))
            ) : (
              <p>No score available</p>
            )}
            <p>
              <strong>Status:</strong> {match.status || "Unknown"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
