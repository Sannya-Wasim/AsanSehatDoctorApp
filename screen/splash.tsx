import { View, Text, Image, Dimensions } from 'react-native';
import { ScaledSheet,  } from 'react-native-size-matters';
import Logo from '../assets/svg/logo';
import { useEffect, useState } from 'react';
// import LogoImage from '../assets/png/logo'
import Animated, { withTiming, withRepeat, withSequence, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const height = Dimensions.get('screen').height

const SplashScreen = () => {

    const scale = useSharedValue(1);

    useEffect(() => {
        // Start the animation when component mounts
        scale.value = withSequence(
            withTiming(1.2, { duration: 500 }), // Pulse animation
            withTiming(1, { duration: 500 }),   // Return to original scale
            withTiming(1.2, { duration: 500 }), // Pulse animation
            withTiming(1, { duration: 500 }),
            withTiming(100, { duration: 500 })    // Scale up to fill screen
        );
    }, []);

    // Define animated style for the red box
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });
    return (
        <Animated.View style={styles.mainContainer}>
            <Animated.View style={[styles.redbox, animatedStyle]} />
            <View style={styles.logoBox}>
                <Logo />
            </View>

        </Animated.View>
    );
};

export default SplashScreen;

const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    redbox: {
        backgroundColor: '#BC1817',
        borderRadius: 30,
        // Initial width and height can be set here (optional)
        width: '220@s',
        height: '220@s', // Remove these if using initial dimensions
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }, logoBox: {
        position: 'absolute',
        width: '120@s',
        height: '120@s',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: height/2.5, // Half the height of the redbox
    },

});
