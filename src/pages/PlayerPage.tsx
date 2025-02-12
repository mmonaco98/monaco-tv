import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Pressable,
    Image,
    Text,
    useTVEventHandler,
} from 'react-native';
import { hScale, vScale } from '../helpers/sizeHelper';
import { AppColors } from '../enums/colors';

const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const style = StyleSheet.create({
    playerPage: {
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.black,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: Dimensions.get('window').width - 1,
        height: Dimensions.get('window').height - 1,
        zIndex: -1,
    },
    controlsContainer: {
        position: 'absolute',
        backgroundColor: AppColors.black40,
        zIndex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
    },
    buttonsContainer: {
        height: '80%',
        flexDirection: 'row',
        gap: hScale(250),
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainButton: {
        width: hScale(100),
        height: hScale(100),
        borderRadius: hScale(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButton: {
        width: hScale(50),
        height: hScale(50),
        borderRadius: hScale(50),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainIcon: {
        width: '80%',
        height: '80%',
        tintColor: AppColors.white40,
    },
    secondaryIcon: {
        width: '50%',
        height: '50%',
        tintColor: AppColors.white40,
    },
    iconFocused: {
        tintColor: AppColors.white,
    },
    buttonFocused: {
        backgroundColor: AppColors.black80,
    },
    progressBar: {
        height: vScale(15),
        width: '90%',
        backgroundColor: AppColors.orange20,
        borderRadius: hScale(50),
    },
    progressBack: {
        height: '100%',
        backgroundColor: AppColors.orange,
        borderRadius: hScale(50),
    },
    progressPoint: {
        position: 'absolute',
        top: vScale(-7.5),
        height: vScale(30),
        width: hScale(30),
        borderRadius: hScale(50),
        backgroundColor: AppColors.white,
    },
    timeLabel: {
        backgroundColor: AppColors.black60,
        width: hScale(100),
        borderRadius: hScale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

enum PlayerButtons {
    PLAY,
    BACK,
    FORWARD,
}

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
};

export const PlayerPage = (): JSX.Element => {
    const ref = useRef(null);
    const buttonRef = useRef(null);
    const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout>();
    const [buttonFocused, setButtonFocused] = useState<PlayerButtons>(0);
    const [showControls, setShowControls] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = false;
        player.play();
    });

    useTVEventHandler((evt) => {
        if (evt.eventKeyAction !== 1) return;
        if (!showControls) {
            setShowControls(true);
            buttonRef?.current?.requestTVFocus();
        } else {
            clearTimeout(controlsTimer);
        }
        const timer = setTimeout(() => {
            setShowControls(false);
        }, 5000);
        setControlsTimer(timer);
    });

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((player.currentTime / player.duration) * 100);
            setCurrentTime(player.currentTime);
        }, 100);
        const subscription = player.addListener(
            'playingChange',
            (isPlaying) => {
                setIsPlaying(isPlaying);
            }
        );

        return () => {
            clearInterval(progressInterval);
            subscription.remove();
        };
    }, [player]);

    useEffect(() => {
        if (isPlaying) {
            player.play();
        } else {
            player.pause();
        }
    }, [isPlaying]);

    return (
        <>
            <View style={style.playerPage} focusable={false}>
                <VideoView
                    ref={ref}
                    style={style.video}
                    player={player}
                    nativeControls={false}
                    focusable={false}
                />
            </View>

            {showControls && (
                <View style={style.controlsContainer}>
                    <View style={style.buttonsContainer}>
                        <Pressable
                            style={(state) => {
                                return [
                                    style.secondaryButton,
                                    state.focused && style.buttonFocused,
                                ];
                            }}
                            onPress={() => player.seekBy(-10)}
                            onFocus={() => setButtonFocused(PlayerButtons.BACK)}
                        >
                            <Image
                                style={[
                                    style.secondaryIcon,
                                    buttonFocused === PlayerButtons.BACK &&
                                        style.iconFocused,
                                ]}
                                source={require('../assets/icons/back10.png')}
                            />
                        </Pressable>
                        <Pressable
                            ref={buttonRef}
                            style={(state) => {
                                return [
                                    style.mainButton,
                                    state.focused && style.buttonFocused,
                                ];
                            }}
                            onPress={() => setIsPlaying(!isPlaying)}
                            onFocus={() => setButtonFocused(PlayerButtons.PLAY)}
                        >
                            <Image
                                style={[
                                    style.mainIcon,
                                    buttonFocused === PlayerButtons.PLAY &&
                                        style.iconFocused,
                                ]}
                                source={
                                    isPlaying
                                        ? require('../assets/icons/pause.png')
                                        : require('../assets/icons/play.png')
                                }
                            />
                        </Pressable>
                        <Pressable
                            style={(state) => {
                                return [
                                    style.secondaryButton,
                                    state.focused && style.buttonFocused,
                                ];
                            }}
                            onPress={() => player.seekBy(10)}
                            onFocus={() =>
                                setButtonFocused(PlayerButtons.FORWARD)
                            }
                        >
                            <Image
                                style={[
                                    style.secondaryIcon,
                                    buttonFocused === PlayerButtons.FORWARD &&
                                        style.iconFocused,
                                ]}
                                source={require('../assets/icons/forward10.png')}
                            />
                        </Pressable>
                    </View>

                    <View style={style.progressBar}>
                        <View
                            style={[
                                style.progressBack,
                                { width: `${progress}%` },
                            ]}
                        />
                        <View
                            style={[
                                style.progressPoint,
                                { left: `${progress - 0.5}%` },
                            ]}
                        >
                            <View
                                style={{
                                    position: 'relative',
                                    top: -30,
                                    left: -34,
                                    ...style.timeLabel,
                                }}
                            >
                                <Text
                                    style={{
                                        color: AppColors.white,
                                        fontSize: 20,
                                    }}
                                >
                                    {formatTime(currentTime)}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                left: -30,
                                top: 30,
                                ...style.timeLabel,
                            }}
                        >
                            <Text
                                style={{ color: AppColors.white, fontSize: 20 }}
                            >
                                {formatTime(0)}
                            </Text>
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                right: -30,
                                top: 30,
                                ...style.timeLabel,
                            }}
                        >
                            <Text
                                style={{ color: AppColors.white, fontSize: 20 }}
                            >
                                {formatTime(player.duration)}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
};
