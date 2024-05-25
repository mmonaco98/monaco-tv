import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button } from 'react-native';

const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const style = StyleSheet.create({
    playerPage: {
        width: '100%',
        height: '100%',
    },
});
const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
});

export const PlayerPage = (): JSX.Element => {
    const ref = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    /* const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
    });

    /*useEffect(() => {
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
 */
    return (
        <>
            <View style={style.playerPage}>
                {/* <VideoView
                    ref={ref}
                    style={styles.video}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                />
                <View style={styles.controlsContainer}>
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
                </View> */}
            </View>
        </>
    );

    return <></>;
};
