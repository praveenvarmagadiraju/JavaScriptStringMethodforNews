const https = require('https');

function getLatestStories() {
    const url = 'https://time.com';

    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            const startIndex = data.indexOf('<section class="latest-stories">');
            const endIndex = data.indexOf('</section>', startIndex);
            const latestStoriesSection = data.slice(startIndex, endIndex + 10);

            let count = 0;
            let storyStartIndex = 0;

            while (count < 6) {
               
                storyStartIndex = latestStoriesSection.indexOf('<a href=', storyStartIndex);
                const storyEndIndex = latestStoriesSection.indexOf('</a>', storyStartIndex);
                const story = latestStoriesSection.slice(storyStartIndex, storyEndIndex + 4);
                console.log("Story:", story);

                storyStartIndex = storyEndIndex + 4;
                count += 1;
            }
        });
    }).on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });
}

getLatestStories();
