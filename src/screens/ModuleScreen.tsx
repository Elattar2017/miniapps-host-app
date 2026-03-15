import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ZoneRenderer} from '@attar/enterprise-module-sdk';
import {brand} from '../theme';

export function ModuleScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ZoneRenderer zoneId="content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
  },
});
