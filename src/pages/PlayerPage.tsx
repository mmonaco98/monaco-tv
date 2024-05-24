import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export const PlayerPage = (): JSX.Element => {
    const refVideo = useRef(null);
    return (
        <>
            <View style={style.container}>
                <VideoPlayer
                    videoProps={{
                        shouldPlay: true,
                        resizeMode: ResizeMode.COVER,
                        source: {
                            uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        },
                        ref: refVideo,
                    }}
                />
            </View>
        </>
    );
};
