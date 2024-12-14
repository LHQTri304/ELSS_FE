import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { icons, colors, fontSizes, images } from "../constants";
import Icon from "./MyIcon";
import { WhiteSlideBottomUp } from "./MyModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  groupStudying_getAllUserInGroup,
  messageuser_sendMessageForUser,
  messageuser_uploadImage,
  messagegroup_sendMessage,
  messagegroup_uploadImage,
  blog_commentBlog,
  blog_insertImageInComment,
  blog_replyComment,
  blog_insertImageInReply,
} from "../api";
//import * as ImagePicker from "expo-image-picker";

export default EnterMessageBar = (props) => {
  //use for friend-MessageBar
  const { friendUsername, friendID } = props;
  const { commentID } = props;
  const { blogID } = props;
  //use for all
  //actionType: friend (0) - group (1) - comment (2) - reply (3) - chatbot (4)
  const { stompClient, actionType } = props;

  const [typedText, setTypedText] = useState("");
  const [userNames, setUserNames] = useState([]);

  const MAXHeight = 45;
  const [listSelectedImage, setListSelectedImage] = useState([]);
  const [listMembersNotTagged, setListMembersNotTagged] = useState([]);

  const isTagAble = true;

  /* const renderContentAddTag = () => {
    return (
      <View>
        {listMembersNotTagged.map((eachName, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAddTag(eachName, index)}
          >
            {
              <View style={styles.notTaggedContainer}>
                <Image
                  style={styles.notTaggedAvatar}
                  source={{ uri: eachName.information.image }}
                />
                <Text style={styles.notTaggedName}>
                  {eachName.information.fulName}
                </Text>
              </View>
            }
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleTagMembers = async () => {
    isTagAble ? setModalVisible(true) : alert("Chức năng không khả dụng");
  }; */

  return (
    <View style={styles.container}>
      {/* {isTagAble ? (
        <View>
          <WhiteSlideBottomUp
            title={"Gắn thẻ thành viên"}
            renderContent={renderContentAddTag}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          <View style={styles.tagsInput_container}>
            <View style={styles.tags_container}>
              {listTaggedUsernames.map((eachName, index) => (
                <View key={index} style={styles.eachTag}>
                  <View style={styles.tagBox}>
                    <Text style={styles.tagBoxText}>
                      {eachName.information.fulName}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                    onPress={() => handleRemoveTagFromList(eachName, index)}
                  >
                    <Icon
                      name={icons.cancelCircleIcon}
                      size={20}
                      color={colors.RedLightBackground}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <View />
      )}

      {listSelectedImage.length === 0 ? (
        <View />
      ) : (
        <ScrollView horizontal={true} style={styles.imgBar}>
          {listSelectedImage.map((eachImg, index) => (
            <Image
              key={index}
              source={{ uri: eachImg.uri }}
              style={[
                styles.image,
                {
                  width:
                    eachImg.height > MAXHeight
                      ? eachImg.width / (eachImg.height / MAXHeight)
                      : eachImg.width,
                  height:
                    eachImg.height > MAXHeight ? MAXHeight : eachImg.height,
                },
              ]}
            />
          ))}
          <View style={styles.blankEndImgBar} />
        </ScrollView>
      )} */}
      <View style={styles.mainBar}>
        <View style={styles.tools_container}>
          <TouchableOpacity /* onPress={handleUploadImages} */>
            <Icon
              name={icons.priceTagIcon}
              size={25}
              color={colors.PrimaryBackground}
            />
          </TouchableOpacity>
          {isTagAble ? (
            <TouchableOpacity /* onPress={handleTagMembers} */>
              <Icon
                name={icons.atSignIcon}
                size={25}
                color={colors.PrimaryBackground}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <TextInput
          multiline={true}
          style={styles.textInput}
          onChangeText={(typedText) => {
            setTypedText(typedText);
          }}
          value={typedText}
          placeholder="Nhắn tin"
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity /* onPress={handleSendMessage} */>
          <Icon
            name={icons.sendMessageCursorIcon}
            size={25}
            color={colors.PrimaryBackground}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.transparentWhite,
    //
    borderColor: colors.PrimaryBackground,
    borderWidth: 1,
    borderRadius: 30,
  },
  imgBar: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 100,
  },
  blankEndImgBar: {
    width: 20,
    height: 20,
  },
  mainBar: {
    height: "auto",
    minHeight: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  textInput: {
    flex: 1,
    color: "black",
    paddingStart: 10,
  },
  sendIcon: {
    width: 25,
    height: 25,
    resizeMode: "stretch",
    padding: 10,
    marginHorizontal: 10,
    tintColor: colors.PrimaryBackground,
  },
  image: {
    resizeMode: "contain",
    marginHorizontal: 2,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: colors.GrayBackground,
  },
  //
  tools_container: {
    flexDirection: "row",
  },
  //
  tagsInput_container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.transparentWhite,
  },
  tags_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  eachTag: {
    marginBottom: 5,
    marginHorizontal: 1,
    paddingBottom: 7,
    paddingRight: 17,
  },
  tagBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.GrayObjects,
  },
  tagBoxText: {
    color: colors.GrayOnContainerAndFixed,
    textAlign: "center",
    fontSize: fontSizes.h7,
  },
  //
  notTaggedContainer: {
    flexDirection: "row",
    width: 375,
    height: 55,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.GrayContainer,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  notTaggedAvatar: {
    width: 35,
    height: 35,
    resizeMode: "cover",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.PrimaryBackground,
  },
  notTaggedName: {
    paddingHorizontal: 10,
    fontSize: fontSizes.h5,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.GrayOnContainerAndFixed,
  },
});
