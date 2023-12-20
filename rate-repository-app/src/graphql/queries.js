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
        $searchKeyword: String
        $orderBy: AllRepositoriesOrderBy
        $orderDirection: OrderDirection
        $first: Int
        $after: String
    ) {
        repositories(
            searchKeyword: $searchKeyword
            orderBy: $orderBy
            orderDirection: $orderDirection
            first: $first
            after: $after
        ) {
            edges {
                node {
                    ...RepoDetails
                }
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
    ${REPO_DETAILS}
`;

export const ME = gql`
    query Me($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        createdAt
                        rating
                        text
                        id
                        repositoryId
                        repository {
                            fullName
                        }
                    }
                }
            }
        }
    }
`;

export const GET_REPO = gql`
    query Repository($repositoryId: ID!, $first: Int, $after: String) {
        repository(id: $repositoryId) {
            ...RepoDetails
            url
            reviews(first: $first, after: $after) {
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
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                }
            }
        }
    }
    ${REPO_DETAILS}
`;
