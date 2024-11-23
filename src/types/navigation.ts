import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TMovie } from './movie';
import { RouteNames } from '../enums/navigation';

export type TRouteParams<T> = T & ParamListBase;
export type TNavigation = NativeStackNavigationProp<
    TRouteParams<ReactNavigation.RootParamList>
>;

export type TRoutes = {
    [RouteNames.HomePage]: TRouteHomePageParams;
    [RouteNames.SplashPage]: TRouteSplashPageParams;
    [RouteNames.DetailPage]: TRouteDetailPageParams;
    [RouteNames.LoginPage]: TRouteLoginPageParams;
    [RouteNames.SignInPage]: TRouteSignInPageParams;
    [RouteNames.SearchPage]: TRouteSearchPageParams;
    [RouteNames.PlayerPage]: TRoutePlayerPageParams;
    [RouteNames.SettingsPage]: TRouteSettingsPageParams;
    [RouteNames.ListingPage]: TRouteListingPageParams;
    [RouteNames.FavouritePage]: TRouteFavouritePageParams;
};

export interface TPageProps<RouteName extends string & keyof TRoutes> {
    route: RouteProp<TRoutes, RouteName>;
}
export interface TRouteDetailPageParams {
    movie_id: number;
}
export interface TRouteHomePageParams {}
export interface TRouteSearchPageParams {}
export interface TRouteSplashPageParams {}
export interface TRouteLoginPageParams {}
export interface TRouteSignInPageParams {}
export interface TRoutePlayerPageParams {}
export interface TRouteSettingsPageParams {}
export interface TRouteListingPageParams {}
export interface TRouteFavouritePageParams {}

export type TDetailPageProps = TPageProps<RouteNames.DetailPage>;
export type THomePageProps = TPageProps<RouteNames.HomePage>;
export type TSearchPageProps = TPageProps<RouteNames.SearchPage>;
export type TSplashPageProps = TPageProps<RouteNames.SplashPage>;
export type TLoginPageProps = TPageProps<RouteNames.LoginPage>;
export type TSignInPageProps = TPageProps<RouteNames.SignInPage>;
export type TPlayerPageProps = TPageProps<RouteNames.PlayerPage>;
export type TSettingsPageProps = TPageProps<RouteNames.SettingsPage>;
export type TListingPageProps = TPageProps<RouteNames.ListingPage>;
export type TFavouritePageProps = TPageProps<RouteNames.FavouritePage>;
