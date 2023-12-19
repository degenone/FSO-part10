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
    query Repositories(
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
    ) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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
            reviews {
                edges {
                    node {
                        user {
                            username
                            id
                        }
                        createdAt
                        id
                        rating
                        text
                    }
                }
            }
        }
    }
    ${REPO_DETAILS}
`;
