import tw from 'twrnc';
import {useCallback, useEffect, useState} from 'react';

import { Image, TouchableOpacity, View } from 'react-native';
import { Template as TemplateType } from '../api/mirror/types';
import {sticker} from "../api/mirror/sticker";

type Props = {
    faceId: string;
    stickerName: string;
}

export function Sticker({ faceId, stickerName }: Props): JSX.Element | null {
    const [url, setUrl] = useState<string>('');

    const load_sticker = async () => {
        const sticker_response = await sticker({face_id: faceId, sticker: stickerName});
        setUrl(sticker_response.url);
    };
    useEffect(() => {
        load_sticker();
    }, []);

    return (
        <View>
            <Image
                    style={tw.style(`w-44 h-44`, {resizeMode: 'contain'})}
                    source={{ uri: url }}
            />
        </View>
    );
}
