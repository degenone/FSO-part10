import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.body,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal,
    },
    colorTextSecondary: { color: theme.colors.textSecondary },
    colorPrimary: { color: theme.colors.primary },
    fontSizeSubheading: { fontSize: theme.fontSizes.subheading },
    fontSizeHeading: { fontSize: theme.fontSizes.heading },
    fontSizeSubtext: { fontSize: theme.fontSizes.subtext },
    fontWeightBold: { fontWeight: theme.fontWeights.bold },
});

const Text = (props) => {
    const { color, fontSize, fontWeight, style, ...rest } = props;
    const textStyle = [
        styles.text,
        color === 'textSecondary' && styles.colorTextSecondary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontSize === 'heading' && styles.fontSizeHeading,
        fontSize === 'subtext' && styles.fontSizeSubtext,
        fontWeight === 'bold' && styles.fontWeightBold,
        style,
    ];
    return <NativeText style={textStyle} {...rest} />;
};

const Subheading = (props) => <Text fontSize='subheading' {...props} />;

const Heading = (props) => <Text fontSize='heading' {...props} />;

const SubText = (props) => <Text fontSize='subtext' {...props} />;

export { Text, Subheading, Heading, SubText };
