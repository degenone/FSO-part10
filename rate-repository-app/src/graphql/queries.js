import { gql } from '@apollo/client';

export const GET_REPOS = gql`
    query Query {
        repositories {
            edges {
                node {
                    fullName
                    description
                    language
                    forksCount
                    reviewCount
                    ratingAverage
                    stargazersCount
                    ownerAvatarUrl
                    id
                }
            }
        }
    }
`;
