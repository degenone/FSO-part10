import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = (refetch) => {
    const [mutate] = useMutation(DELETE_REVIEW, {
        onCompleted: () => refetch(),
    });
    const deleteReview = (deleteReviewId) =>
        mutate({ variables: { deleteReviewId } });
    return deleteReview;
};

export default useDeleteReview;
