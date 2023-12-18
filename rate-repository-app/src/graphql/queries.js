import { gql } from '@apollo/client';

const REPO_DETAILS = gql`
    fragment RepoDetails on Repository {
        description
        forksCount
        fullName
        id
        language
        ownerAvatarUrl
        ratingAverage
        reviewCount
        stargazersCount
    }
`;

export const GET_REPOS = gql`
    query Query {
        repositories {
            edges {
                node {
                    ...RepoDetails
                }
            }
        }
    }
    ${REPO_DETAILS}
`;

export const ME = gql`
    query Me {
        me {
            id
            username
        }
    }
`;

export const GET_REPO = gql`
    query Repository($repositoryId: ID!) {
        repository(id: $repositoryId) {
            ...RepoDetails
            url
        }
    }
    ${REPO_DETAILS}
`;
