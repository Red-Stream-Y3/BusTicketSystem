import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ThemeButton from './common/ThemeButton';
import ThemeChip from './common/ThemeChip';
import ThemeOverlay from './common/ThemeOverlay';

const HomeContainer = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    return (
        <View>
            <Text>Welcome to the Home Screen!</Text>
            <ThemeButton title="example" />
            <ThemeChip text="example" />
            <ThemeButton title={"Show Overlay"} onPress={() => setShowOverlay(true)} />
            <ThemeOverlay visible={showOverlay} onPressBg={()=>setShowOverlay(false)}>
                <Text>Overlay body</Text>
            </ThemeOverlay>
        </View>
    );
};

export default HomeContainer;
