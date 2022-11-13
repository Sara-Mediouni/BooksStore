import React from "react";
import { ImageBackground } from "react-native-web";
import { View,Text, Image, ScrollView,Animated } from "react-native";
import {COLORS, icons, SIZES,images,FONTS} from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
const LineDivider=()=>{
    return(
        <View style={{width:1,paddingVertical:15,paddingHorizontal:15}}>
        <View style={{flex:1, borderLeftColor:COLORS.lightGray,borderLeftWidth:1}}>

        </View>
        </View>        
       
      )

}
const BookDetail=({route,navigation})=>{
    const [book, setBook] = React.useState(null);
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);
    const indicator=new Animated.Value(0);
    
    
    React.useEffect(() => {
        const {book} = route.params;
        setBook(book);
    }, [book]);

    function renderBookInfoSection(){
        return(
            <View style={{
                flex:1

            }}>
            <ImageBackground 
            source={book.bookCover}
            resizeMode="cover"
            style={{position:"absolute",
            top:0, right:0, left:0, bottom:0, }}
            />
            <View style={{
                position:"absolute",
                top:0, right:0, left:0, bottom:0,
                backgroundColor:book.backgroundColor,
            }}>

            </View>
            <View style={{flexDirection:'row',paddingHorizontal:SIZES.radius,
            height:80, alignItems:'flex-end'}}>
            <TouchableOpacity style={{
                marginLeft:SIZES.base
            }} onPress={()=>navigation.goBack()}>
            <Image
                source={icons.back_arrow_icon}
                resizeMode="contain"
                style={{
                    width:25,
                    height:25,
                    tintColor:book.navTintColor
                }}
            />

            </TouchableOpacity>
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:book.navTintColor, ...FONTS.h3,marginBottom:12,fontWeight:700}}>Book Details</Text>

            </View>
           <TouchableOpacity style={{
            marginRight:SIZES.base


           }}
           onPress={()=>console.log("Click More")}>
           <Image
            source={icons.more_icon}
            resizeMode="contain"
            style={{
                width:30,
                height:30,
                tintColor:book.navTintColor,
                alignSelf:'flex-end'
            }}
           />
             
           </TouchableOpacity>

            </View>
             <View style={{flex:3, paddinTop: SIZES.padding2, alignItems:'center'}}>
                    <Image
                    source={book.bookCover}
                    resizeMode="contain"
                    style={{
                        flex:1,
                        width:150,
                        height:"auto"
                    }}/>
             </View>
             <View style={{flex:1.8, alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:book.navTintColor, ...FONTS.h2}}>{book.bookName}</Text>
                    <Text style={{color:book.navTintColor, ...FONTS.body3}}>{book.author}</Text>
             </View>
             <View
                style={{
                    flexDirection:'row',
                    paddingVertical:10,
                    margin:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor:"rgba(0,0,0,0.3)"
                }}>
            
             <View style={{
                flex:1,alignItems:'center'
             }}>
             <Text style={{...FONTS.h3, color:COLORS.white}}>
             {book.rating}

             </Text>
             <Text style={{...FONTS.body4, color:COLORS.white}}>
             Rating

             </Text>
             </View>
             <LineDivider/>
             <View style={{
                flex:1,alignItems:'center'
             }}>
             <Text style={{...FONTS.h3, color:COLORS.white}}>
             {book.pageNo}

             </Text>
             <Text style={{...FONTS.body4, color:COLORS.white}}>
             Number of page

             </Text>
             </View>
             <LineDivider/>
             <View style={{
                flex:1,alignItems:'center'
             }}>
             <Text style={{...FONTS.h3, color:COLORS.white}}>
             {book.language}

             </Text>
             <Text style={{...FONTS.body4, color:COLORS.white}}>
             Language

             </Text>
             </View>
            </View>   </View>
        )
    }
    function rendrerBookDescription(){
        const indicatorSize=scrollViewVisibleHeight > scrollViewWholeHeight ?
         scrollViewVisibleHeight*scrollViewVisibleHeight /scrollViewWholeHeight : scrollViewVisibleHeight;
        const difference= scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1;
       
       
         return(
            <View style={{flex:1,flexDirection:'row',padding:SIZES.padding}}>
                <View style={{width:4,height:"100%",backgroundColor:COLORS.gray1}}>
                <Animated.View 
                style={{
                width:4,
                height:indicatorSize,
                backgroundColor:COLORS.lightGray4,
                transform:[{
                    translateY:Animated.multiply(indicator,scrollViewVisibleHeight/scrollViewWholeHeight).interpolate({
                        inputRange:[0,difference],
                        outputRange:[0,difference],
                        extrapolate:'clamp'
                })}]
                }}
                />

                
              
              
                 </View>
            <ScrollView
             contentContainerStyle={{paddingLeft:SIZES.padding2}}
             showsVerticalScrollIndicator={false}
             scrollEventThrottle={16}
             onContentSizeChange={(width,height)=>{
                    setScrollViewWholeHeight(height)
             }}
             onLayout={({nativeEvent:{layout:{x,y,width,height}}})=>{
                setScrollViewVisibleHeight(height)

             }}
                onScroll={Animated.event([{nativeEvent:{contentOffset:{y:indicator}}}],{useNativeDriver:false})}
             >
             
                <Text style={{color:COLORS.white, ...FONTS.h2,marginBottom:SIZES.padding}}>
                    Description
                </Text>
                <Text style={{color:COLORS.lightGray, ...FONTS.body2}}>
                    {book.description}
                </Text>
            </ScrollView>
            </View>
        )
    }
    function renderBottomButtons(){
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Bookmark */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        backgroundColor: COLORS.secondary,
                        marginLeft: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log("Bookmark")}
                >
                    <Image
                        source={icons.bookmark_icon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 50,
                            tintColor: COLORS.lightGray2
                        }}
                    />
                </TouchableOpacity>

                {/* Start Reading */}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        width:280,
                        backgroundColor: COLORS.primary,
                        marginHorizontal: SIZES.base,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log("Start Reading")}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Start Reading</Text>
                </TouchableOpacity>
            </View>
        )
    }
    if (book){
return(
        <View style={{
            flex: 1,
            backgroundColor: COLORS.black,


        }}>
       <View style={{flex:4}}>
       {renderBookInfoSection()}

       </View>
       <View style={{flex:2}}>
         {rendrerBookDescription()}
       </View>
       <View style={{height:70}}>
          {renderBottomButtons()}

       </View>
        </View>
    )
} else { 
    return (<></>);
}}
export default BookDetail;