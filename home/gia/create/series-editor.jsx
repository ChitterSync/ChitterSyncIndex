import React, { useState } from "react";
import "./CreateShow.css"; // Import your CSS or inline styles if needed.

const CreateShow = () => {
  const [seasons, setSeasons] = useState([
    {
      id: 1,
      title: "",
      episodes: [
        { id: 1, title: "", description: "", video: null },
      ],
    },
  ]);

  const addSeason = () => {
    setSeasons((prevSeasons) => [
      ...prevSeasons,
      {
        id: prevSeasons.length + 1,
        title: "",
        episodes: [{ id: 1, title: "", description: "", video: null }],
      },
    ]);
  };

  const deleteSeason = (seasonId) => {
    setSeasons((prevSeasons) =>
      prevSeasons.filter((season) => season.id !== seasonId)
    );
  };

  const addEpisode = (seasonId) => {
    setSeasons((prevSeasons) =>
      prevSeasons.map((season) =>
        season.id === seasonId
          ? {
              ...season,
              episodes: [
                ...season.episodes,
                {
                  id: season.episodes.length + 1,
                  title: "",
                  description: "",
                  video: null,
                },
              ],
            }
          : season
      )
    );
  };

  const deleteEpisode = (seasonId, episodeId) => {
    setSeasons((prevSeasons) =>
      prevSeasons.map((season) =>
        season.id === seasonId
          ? {
              ...season,
              episodes: season.episodes.filter(
                (episode) => episode.id !== episodeId
              ),
            }
          : season
      )
    );
  };

  const handleSeasonChange = (seasonId, field, value) => {
    setSeasons((prevSeasons) =>
      prevSeasons.map((season) =>
        season.id === seasonId ? { ...season, [field]: value } : season
      )
    );
  };

  const handleEpisodeChange = (seasonId, episodeId, field, value) => {
    setSeasons((prevSeasons) =>
      prevSeasons.map((season) =>
        season.id === seasonId
          ? {
              ...season,
              episodes: season.episodes.map((episode) =>
                episode.id === episodeId
                  ? { ...episode, [field]: value }
                  : episode
              ),
            }
          : season
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty titles and descriptions
    const invalidSeason = seasons.some(
      (season) => !season.title || season.episodes.some((episode) => !episode.title || !episode.description)
    );

    if (invalidSeason) {
      alert("Please fill out all fields for each season and episode.");
      return;
    }

    console.log("Submitted Data:", seasons);
    alert("Your series has been submitted!");
  };

  return (
    <div className="form-container">
      <h1>Create Your Show</h1>
      <form onSubmit={handleSubmit}>
        {seasons.map((season) => (
          <div key={season.id} className="season">
            <label htmlFor={`season-title-${season.id}`}>
              Season {season.id} Title:
            </label>
            <input
              type="text"
              id={`season-title-${season.id}`}
              value={season.title}
              onChange={(e) =>
                handleSeasonChange(season.id, "title", e.target.value)
              }
              placeholder="Enter season title"
              required
            />

            <h3>Episodes:</h3>
            {season.episodes.map((episode) => (
              <div key={episode.id} className="episode">
                <label htmlFor={`episode-title-${season.id}-${episode.id}`}>
                  Episode {episode.id} Title:
                </label>
                <input
                  type="text"
                  id={`episode-title-${season.id}-${episode.id}`}
                  value={episode.title}
                  onChange={(e) =>
                    handleEpisodeChange(
                      season.id,
                      episode.id,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Enter episode title"
                  required
                />

                <label
                  htmlFor={`episode-description-${season.id}-${episode.id}`}
                >
                  Episode {episode.id} Description:
                </label>
                <textarea
                  id={`episode-description-${season.id}-${episode.id}`}
                  value={episode.description}
                  onChange={(e) =>
                    handleEpisodeChange(
                      season.id,
                      episode.id,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Enter episode description"
                  required
                />

                <label htmlFor={`episode-video-${season.id}-${episode.id}`}>
                  Upload Video:
                </label>
                <input
                  type="file"
                  id={`episode-video-${season.id}-${episode.id}`}
                  onChange={(e) =>
                    handleEpisodeChange(
                      season.id,
                      episode.id,
                      "video",
                      e.target.files[0]
                    )
                  }
                />

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteEpisode(season.id, episode.id)}
                >
                  Delete Episode
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-episode-btn"
              onClick={() => addEpisode(season.id)}
            >
              Add Episode
            </button>

            <button
              type="button"
              className="delete-btn"
              onClick={() => deleteSeason(season.id)}
            >
              Delete Season
            </button>
          </div>
        ))}

        <button type="button" id="add-season" onClick={addSeason}>
          Add Season
        </button>

        <input type="submit" value="Create Show" />
      </form>
    </div>
  );
};

export default CreateShow;
