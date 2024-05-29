import { Pressable, StyleSheet, View, Text } from 'react-native';
import { AppColors } from '../enums/colors';
import { CarouselsContainer } from '../components/CarouselsContainer/CarouselsContainer';
import { MoviePreview } from '../components/MoviePreview/MoviePreview';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { hScale } from '../helpers/sizeHelper';
import { useEffect, useState } from 'react';
import { Flow } from '../components/Loaders/Loaders';
import { useAppStore } from '../stores/appStores';
import { getHomepageByUserId } from '../utils/rest-api';

const style = StyleSheet.create({
    homePage: {
        height: '100%',
        width: '100%',
        backgroundColor: AppColors.background,
    },
    menuWrapper: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: hScale(200),
        height: '100%',
        zIndex: 2,
    },
});

export const HomePage = (): JSX.Element => {
    const userInfo = useAppStore((state) => state.userInfo);
    const updateHomepage = useAppStore((state) => state.updateHomepage);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getHomepageByUserId(userInfo.id)
            .then((resp) => {
                updateHomepage(resp);
                setIsLoading(false);
            })
            .catch(() => {});
    }, []);
    return (
        <>
            <View style={style.homePage}>
                <View style={style.menuWrapper}>
                    <SideMenu />
                </View>
                {isLoading ? (
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Flow
                            size={hScale(200)}
                            colors={['#ff5726', '#ff6c27', '#ff8325']}
                        />
                    </View>
                ) : (
                    <>
                        <MoviePreview />
                        <CarouselsContainer />
                    </>
                )}
            </View>
        </>
    );
};
