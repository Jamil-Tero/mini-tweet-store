// Get User objects by username, using bearer token authentication
// https://developer.twitter.com/en/docs/twitter-api/users/lookup/quick-start

const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

//const endpointURL = "https://api.twitter.com/2/users/714509613236883456/tweets"

async function getRequest(userId) {
    const endpointURL ="https://api.twitter.com/2/users/"+userId+"/tweets";// `https://api.twitter.com/2/users/${userId}/tweet`;
    // These are the parameters for the API request
    // specify User names to fetch, and any additional fields that are required
    // by default, only the User ID, name and user name are returned
    const params = {
        usernames: "TwitterDev,TwitterAPI", // Edit usernames to look up
        "user.fields": "created_at,description", // Edit optional query parameters here
        "expansions": "pinned_tweet_id"
    }

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL, {
        headers: {
            "User-Agent": "v2UserLookupJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request')
    }
}

exports.getTweets =async (userId) => {

    try {
        // Make request
        const response = await getRequest(userId);
        console.log(response.data);
        return response.data;
        
    } catch (e) {
        console.log(e);
    }
};
