// BottomSheets.tsx
import BottomSheet from '@gorhom/bottom-sheet';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Text, View } from 'react-native';

export type BottomSheetHandle = {
  open: () => void;
  close: () => void;
};

const BottomSheets = forwardRef<BottomSheetHandle>((props, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Expones métodos al padre
  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.snapToIndex(1);
    },
    close: () => {
      bottomSheetRef.current?.close();
    },
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['25%', '50%']}
      index={-1}
      enablePanDownToClose
    >
      <View style={{ padding: 20 }}>
        <Text>Contenido del BottomSheet</Text>
      </View>
    </BottomSheet>
  );
});

export default BottomSheets;
