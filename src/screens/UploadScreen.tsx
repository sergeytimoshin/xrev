import tw from 'twrnc';
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { Face, Tab as TabType} from "../api/mirror/types";
import { allPartsAtom } from "../atoms/allParts";
import { faceAtom } from "../atoms/face";
import { Clothes } from "../components/Clothes";
import { PhotoUploader } from "../components/PhotoUploader";
import { Screen } from "../components/Screen";
import { Tab } from "../components/Tab";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { useFace } from "../hooks/useFace";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Preview } from "../components/Preview";
import { Mint } from '../components/Mint';
import { Success } from '../components/Success';
import { MintResult } from '../hooks/useMint';

export type RootStackParamList = {
  Upload: {};
  Editor: {};
  Thanks: { result: MintResult };
};

const Stack = createStackNavigator<RootStackParamList>();

function getTabId(tab: TabType): string {
  return `${'name' in tab ? tab.name : '-'}:${'material' in tab ? tab.material : '-'}`;
}

export function Upload({navigation}: NativeStackScreenProps<RootStackParamList, "Upload">) {
  const handleUpload = useCallback((face: Face) => {
    navigation.push('Editor', {});
  }, [navigation]);

  return <PhotoUploader onUpload={handleUpload} />;
}

export function Thanks({navigation, route}: NativeStackScreenProps<RootStackParamList, "Thanks">) {
  const handleBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return <Success result={route.params.result} onClose={handleBack} />;
}

export function Editor({navigation}: NativeStackScreenProps<RootStackParamList, "Editor">) {
  const [face] = useRecoilState(faceAtom);
  const [allParts] = useRecoilState(allPartsAtom);

  useEffect(() => {
    if (!face) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Upload' }],
      });
    }
  }, [face]);

  const handleMint = useCallback((result: MintResult) => {
    navigation.push('Thanks', {result});
  }, [navigation]);

  if (!face) {
    return <View />;
  }

  return (
    <Screen stickyHeaderIndices={[0]}>
      <Mint onMint={handleMint} image={face.url} faceId={face.id} />
      <Preview />
      <View>
        {allParts?.tabs.map(((tab) => (
          <Tab key={getTabId(tab)} tab={tab} />
        )))}
        {allParts?.clothes ? <Clothes clothes={allParts.clothes} /> : null}
      </View>
    </Screen>
  );
} 

export const Reset = ({navigation}: Pick<NativeStackScreenProps<RootStackParamList, "Editor">, 'navigation'>) => {
  const [_, setFace] = useFace();
  const handlePress = useCallback(() => {
    setFace(undefined);
  }, [navigation]);
  return (
    <TouchableOpacity style={tw`m-1`} onPress={handlePress}>
      <MaterialCommunityIcons size={24} name="arrow-left"  />
    </TouchableOpacity>
  );
};

export const UploadScreen = () => {
  const [face] = useRecoilState(faceAtom);

  return (
    <Stack.Navigator initialRouteName={face ? 'Editor' : 'Upload'}>
      <Stack.Screen
        name="Upload"
        component={Upload}
        options={{
          title: "Choose Photo",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Editor"
        component={Editor}
        options={({navigation}) => ({
          title: "Editor",
          headerLeft: () => <Reset navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="Thanks"
        component={Thanks}
        options={{
          title: "Success",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
