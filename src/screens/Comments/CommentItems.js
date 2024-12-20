import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {images, icons, colors, fontSizes} from '../../constants';

export default function CommentItems(props) {
  const {onPress} = props;
  /* const { commentID, dateComment, userComment, content, replies, files } =
    props.comment; */

  //
  const [dateComment, setD] = useState(props.comment.dateComment);
  const [img, setI] = useState(props.comment.img);
  const [name, setN] = useState(props.comment.userName);
  const [content, setCD] = useState(props.comment.content);
  const [replies, setRr] = useState(props.comment.replies);
  const [files, setFF] = useState([]);
  //
  console.log(props.comment)

  const replyImages = [];

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      replyImages.push(files[i].url);
    }
  }

  /* const getTime = () => {
    const date = new Date(dateComment);
    return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
      date.getMonth() + 1
    }`;
  }; */

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: /* userComment.information.image */ img,
        }}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {/* userComment.information.fulName */ name}
        </Text>
        <Text style={styles.contentText} numberOfLines={4}>
          {content}
        </Text>
        <View>
          {replyImages.map((image, index) => (
            <Image key={index} source={{uri: image}} style={styles.image} />
          ))}
        </View>
      </View>
      <View style={styles.rightSideView}>
        <Text style={styles.rightSideText}>{/* getTime() */ dateComment}</Text>
        <Text style={styles.rightSideText}>{replies.length} phản hồi</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 65,
    //maxHeight: 150,
    marginBottom: 15,
    flexDirection: 'row',
  },
  img: {
    width: 55,
    height: 55,
    resizeMode: 'stretch',
    borderRadius: 15,
    marginTop: 11,
    marginHorizontal: 10,
  },
  textView: {
    flex: 1,
    marginRight: 10,
    marginTop: 15,
  },
  titleText: {
    color: colors.active,
    fontSize: fontSizes.h6,
    fontWeight: '400',
  },
  contentText: {
    color: 'black',
    fontSize: fontSizes.h7,
    fontWeight: '300',
  },
  rightSideView: {
    flexDirection: 'column',
    paddingTop: 10,
  },
  rightSideText: {
    width: 100,
    padding: 10,
    paddingLeft: 0,
    color: 'black',
    fontSize: fontSizes.h8,
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'right',
    color: colors.inactive,
    marginTop: -10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 5,
    //borderWidth: 3,
    //borderColor: colors.PrimaryBackground,
  },
});
