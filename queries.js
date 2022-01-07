const { gql } = require("graphql-request");

module.exports = {
  getSoundAudioInfo: gql`
    query getMintedRelease($soundHandle: String!, $releaseSlug: String!) {
      getMintedRelease(soundHandle: $soundHandle, releaseSlug: $releaseSlug) {
        ...sharedReleaseFields
        __typename
      }
    }

    fragment sharedReleaseFields on Release {
      id
      title
      titleSlug
      type
      createdAt
      description
      behindTheMusic
      rewards {
        id
        title
        description
        numOfBackers
        price
        __typename
      }
      mintInfos {
        id
        createdAt
        chainId
        editionId
        quantity
        numSold
        price
        startTime
        totalRaised
        totalRaisedUSD
        __typename
      }
      genre {
        id
        name
        __typename
      }
      coverImage {
        id
        url
        key
        __typename
      }
      goldenEggImage {
        id
        url
        key
        __typename
      }
      tracks {
        ...sharedTrackFields
        __typename
      }
      __typename
    }

    fragment sharedTrackFields on Track {
      id
      title
      trackNumber
      audio {
        id
        url
        key
        __typename
      }
      normalizedPeaks
      duration
      audioRevealTime
      __typename
    }
  `
};
