import { View, StyleSheet } from 'react-native';
import { CarouselsContainer } from '../components/CarouselsContainer/CarouselsContainer';
import { StandardPreview } from '../components/StandardPreview/StandardPreview';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { AppColors } from '../enums/colors';
import { hScale } from '../helpers/sizeHelper';
import { useEffect, useRef, useState } from 'react';
import { getFavouriteMovie } from '../utils/rest-api';
import { Flow } from '../components/Loaders/Loaders';
import { useAppStore } from '../stores/appStores';
import { PreviewPage } from '../types/preview';

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
    loaderWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.background,
    },
});

export const FavouritePage = (): JSX.Element => {
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const user = useAppStore((state) => state.userInfo);
    const updateFavourites = useAppStore((state) => state.updateFavourites);
    const menuRef = useRef(null);

    useEffect(() => {
        getFavouriteMovie(user.id)
            .then((res) => {
                updateFavourites(res);
                setIsFetching(false);
            })
            .catch((err) => {});
    }, []);
    return isFetching ? (
        <View style={style.loaderWrapper}>
            <Flow
                size={hScale(100)}
                colors={['#ff5726', '#ff6c27', '#ff8325']}
            />
        </View>
    ) : (
        <View style={style.homePage}>
            <View style={style.menuWrapper}>
                <SideMenu menuRef={menuRef} />
            </View>
            <StandardPreview />
            <CarouselsContainer
                menuRef={menuRef}
                page={PreviewPage.FAVOURITE}
            />
        </View>
    );
};
