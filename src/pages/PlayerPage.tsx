import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

const style = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export const PlayerPage = (): JSX.Element => {
    return (
        <>
            <View style={style.container}>
                <Video
                    source={{
                        uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    }}
                    style={style.backgroundVideo}
                />
            </View>
        </>
    );
};
