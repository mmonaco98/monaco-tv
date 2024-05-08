import { Image, StyleSheet, View } from "react-native"
import { AppColors } from "../enums/colors"
import { hScale, vScale } from "../helpers/sizeHelper"
import { Flow } from "react-native-animated-spinkit"

const style = StyleSheet.create({
    container: {
        height:"100%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: AppColors.background,
        
    },
    logo:{
        width: hScale(300),
        height: vScale(300)
    },
})

const logoUrl = require("../assets/images/logo.png")

export const SplashPage = ():JSX.Element => {
    return <>
        <View style={style.container}>
            <Image source={logoUrl} style={style.logo}/>
            <Flow size={hScale(100)} color="orange"/>
        </View>
    </>
}