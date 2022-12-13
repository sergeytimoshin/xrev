import { ActivityIndicator, Button, Text, View } from "react-native";
import tw from 'twrnc';
import { useCallback } from "react";
import { useLoading } from "../hooks/useLoading";
import { MintResult, useMint } from "../hooks/useMint";

type Props = {
  image: string;
  faceId: string;
  onMint: (result: MintResult) => void; 
}

export function Mint({image, faceId, onMint}: Props) {
  const {loading, wrap, error} = useLoading<void>();
  const mint = useMint();
  const handleMint = useCallback(() => {
    wrap(mint(image, faceId).then(onMint));
  }, [image, faceId, mint, onMint]);

  return (
    <View style={tw`flex items-center justify-center bg-slate-300`}>
      <View style={tw`flex items-center pt-4 h-14 justify-center`}>
        {loading ? <ActivityIndicator /> : <Button title="Mint" onPress={handleMint} />}
      </View>
      {error ? (
        <View style={tw`pt-2`}>
          <Text>{error.message}</Text>
        </View>
      ) : null}
    </View>
  );
}
