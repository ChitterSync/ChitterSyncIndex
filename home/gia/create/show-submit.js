const form = document.getElementById('show-form');
const episodeContainer = document.getElementById('episode-container');
const addEpisodeButton = document.getElementById('add-episode');

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const genre = document.getElementById('genre').value;

    // Get the episode data
    const episodes = [];
    const episodeElements = episodeContainer.children;
    for (let i = 0; i < episodeElements.length; i++) {
        const episode = {
            title: episodeElements[i].querySelector('input').value,
            description: episodeElements[i].querySelector('textarea').value
        };
        episodes.push(episode);
    }

    // Create a show object with the user's input
    const show = {
        title,
        description,
        genre,
        episodes
    };

    // You can then store the show object in local storage, send it to a server, or use it in your application
    console.log(show);
});

// Handle add episode button click
addEpisodeButton.addEventListener('click', () => {
    const episodeHtml = `
        <div class="episode">
            <label for="episode-title-${episodeContainer.children.length + 1}">Episode ${episodeContainer.children.length + 1} Title:</label>
            <input type="text" id="episode-title-${episodeContainer.children.length + 1}" name="episode-title-${episodeContainer.children.length + 1}">

            <label for="episode-description-${episodeContainer.children.length + 1}">Episode ${episodeContainer.children.length + 1} Description:</label>
            <textarea id="episode-description-${episodeContainer.children.length + 1}" name="episode-description-${episodeContainer.children.length + 1}"></textarea>
        </div>
    `;
    episodeContainer.insertAdjacentHTML('beforeend', episodeHtml);
});