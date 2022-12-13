import tw from 'twrnc';
import { Button, Text, StyleSheet, StatusBar } from 'react-native';
import { MintResult } from '../hooks/useMint';
import {SafeAreaView, ScrollView} from 'react-native';
import {Sticker} from "./Sticker";
import {ListGroup} from "./Layout/ListGroup";

type Props = {
  result: MintResult;
  onClose:() => void;
}

export function Success({result, onClose}: Props) {

    const sticker_names = [
        "angel_mau", "battery_mau", "cool_stars_mau", "dancing_pose_mau", "smiling_thumbs_up_pose_mau",
        "suh_orange_bubble_pose_mau", "tik_tok_pose_mau", "wednesday_jump_stories_pose_mau", "shocked_pose_mau",
        "whats_up_pose_mau", "not_interested_pose_mau", "worry_emotion_mau", "joy_emotion_mau",
        "amusement_emotion_mau", "shocked_emotion_mau", "wink_emotion_mau",
        "no_drama_mau", "brocolli_love_mau", "deal_with_it_mau", "thanks_mau"
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={[styles.scrollView]}>
                <Text style={tw`flex text-${2} text-gray-500 items-center justify-center`}>
                    <Button onPress={onClose} title="Unlock stickers (1 SOL per week) "/>
                </Text>
                <ListGroup>
                    {sticker_names.map(stickerName => (
                        <Sticker faceId={result.request.faceId} stickerName={stickerName}/>
                    ))}
                </ListGroup>
                <Button onPress={onClose} title="Go Back"/>
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        position: 'relative',
    },
});
