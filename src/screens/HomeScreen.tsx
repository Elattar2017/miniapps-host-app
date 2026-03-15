import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ZoneRenderer} from '@attar/enterprise-module-sdk';
import {brand} from '../theme';

export function HomeScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Welcome back!</Text>
        <Text style={styles.subText}>Explore your services</Text>
      </View>
      <ZoneRenderer zoneId="actions" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
  },
  greeting: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '700',
    color: brand.textPrimary,
  },
  subText: {
    fontSize: 14,
    color: brand.textSecondary,
    marginTop: 2,
  },
});
