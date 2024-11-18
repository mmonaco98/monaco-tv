import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button } from 'react-native';
import { hScale, vScale } from '../helpers/sizeHelper';
import { AppColors } from '../enums/colors';

const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const style = StyleSheet.create({
    playerPage: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.black,
    },
});
const styles = StyleSheet.create({
    playerPage: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.black,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    video: {
        width: '50%',
        height: '50%',
        zIndex: -1,
    },
    controlsContainer: {
        //padding: 10,
        /* position: 'absolute', */
        backgroundColor: 'red',
    },
});

export const PlayerPage = (): JSX.Element => {
    const ref = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
    });

    useEffect(() => {
        const subscription = player.addListener(
            'playingChange',
            (isPlaying) => {
                setIsPlaying(isPlaying);
            }
        );

        return () => {
            subscription.remove();
        };
    }, [player]);

    return (
        <>
            <View style={styles.playerPage}>
                <VideoView
                    ref={ref}
                    style={styles.video}
                    player={player}
                    nativeControls={false}
                />
                <View style={styles.controlsContainer} hasTVPreferredFocus>
                    <Button
                        title={isPlaying ? 'Pause' : 'Play'}
                        onPress={() => {
                            if (isPlaying) {
                                player.pause();
                            } else {
                                player.play();
                            }
                            setIsPlaying(!isPlaying);
                        }}
                    />
                </View>
            </View>
        </>
    );
};
