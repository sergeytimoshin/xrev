import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';

import { generate } from '../api/mirror/generate';
import { ActivityIndicator, Button, View } from 'react-native';
import { Face } from '../api/mirror/types';
import { useFace } from '../hooks/useFace';
import { useLoading } from '../hooks/useLoading';
import { useCallback } from 'react';

type Props = {
  onUpload: (face: Face) => void;
}

export function PhotoUploader({ onUpload }: Props) {
  const {loading, wrap} = useLoading<void>();
  const [_, updateFace] = useFace();

  const pickImage = useCallback(() => {
    const action = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const response = await fetch(asset.uri);
        const blob = await response.blob();

        const {face} = await generate({
          photo: new File([blob], asset.fileName || 'photo', { type: blob.type }),
          style: 'mau',
        });

        await updateFace(face);
        onUpload(face);
      }
    };

    wrap(action());
  }, [onUpload, wrap, updateFace]);

  return (
    <View style={tw`flex flex-1 items-center h-24 justify-center`}>
      {loading ? <ActivityIndicator /> : <Button title="Pick an image from camera roll" onPress={pickImage} />}
    </View>
  );
}
