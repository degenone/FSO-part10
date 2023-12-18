import { Formik } from 'formik';
import FormikTextInput from '../SignIn/FormikTextInput';
import { Pressable, StyleSheet, View } from 'react-native';
import { Heading, Text } from '../Typography';
import * as yup from 'yup';
import { Platform } from 'react-native';
import useCreateReview from '../../hooks/useCreateReview';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import theme from '../../theme';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingVertical: 5,
    },
    btn: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.light,
        borderRadius: 5,
        marginTop: 5,
        padding: 10,
        textAlign: 'center',
    },
});

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner username is required.'),
    repositoryName: yup.string().required('Repository name is required.'),
    rating: yup
        .number()
        .min(0, 'Rating must be 0 or above.')
        .max(100, 'Rating must be 100 or below.')
        .required('Rating is required.'),
});

export const CreateReviewContainer = (props) => {
    const { onSubmit, errorMessage } = props;
    return (
        <View>
            <Formik
                initialValues={{
                    ownerName: '',
                    repositoryName: '',
                    rating: '',
                    text: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <View style={styles.container}>
                        <FormikTextInput
                            name='ownerName'
                            placeholder='Repository owner username'
                        />
                        <FormikTextInput
                            name='repositoryName'
                            placeholder='Repository name'
                        />
                        <FormikTextInput
                            name='rating'
                            placeholder='Rating (0-100)'
                            keyboardType={Platform.select({
                                android: 'numeric',
                                default: 'number-pad',
                            })}
                        />
                        <FormikTextInput
                            name='text'
                            placeholder='Review'
                            multiline
                        />
                        <Pressable onPress={handleSubmit}>
                            <Text style={styles.btn}>Create review</Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
            {errorMessage && (
                <Heading color='error' style={styles.container}>
                    Error occured: {errorMessage}
                </Heading>
            )}
        </View>
    );
};

const CreateReview = () => {
    const [createReview] = useCreateReview();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;
        try {
            const result = await createReview(
                ownerName,
                repositoryName,
                +rating,
                text
            );
            navigate(`/${result.data.createReview.repositoryId}`);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    return (
        <CreateReviewContainer
            onSubmit={onSubmit}
            errorMessage={errorMessage}
        />
    );
};

export default CreateReview;
