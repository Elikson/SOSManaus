import * as React from 'react'
import { View } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import colors from '../colors'
import { isTablet } from 'react-native-device-info';

export default function WavyHeader({ customStyles }) {

    return (
      <View style={customStyles}>
        <View style={{ backgroundColor: colors.primary, height: 160 }}>
          <Svg
            height="60%"
            width="100%"
            viewBox={ !isTablet ? "0 0 1600 320" : "100 180 2000 180"}
            style={{ position: 'absolute', top: 130 }}
          >
            <Path
              fill={colors.primary}
              d="M0,256L60,234.7C120,213,240,171,360,176C480,181,600,235,720,229.3C840,224,960,160,1080,160C1200,160,1320,224,1380,256L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
    );
  }