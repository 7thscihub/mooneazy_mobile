import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from './theme.js'

export default function Signal(props) {
  const isLong = props.direction?.toLowerCase() === 'buy';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.symbol}>{props.symbol}</Text>
          <Text style={styles.time}>{props.triggerTime}</Text>
        </View>

        <View
          style={[
            styles.directionBadge,
            { backgroundColor: isLong ? colors.success : colors.danger },
          ]}
        >
          <Text style={styles.direction}>
            {props.direction?.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Signal details */}
      <View style={styles.grid}>
        <Info label="Entry Price" value={props.entryPrice} />
        <Info label="Stop Loss" value={props.stopLoss} danger />

        <Info label="Target 1" value={props.tp1} success />
        <Info label="Target 2" value={props.tp2} success />

        <Info label="Signal Type" value={props.signalType} />
      </View>
    </View>
  );
}

function Info({ label, value, success, danger }) {
  return (
    <View style={styles.info}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[
          styles.value,
          success && styles.success,
          danger && styles.danger,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#181A20',
    borderRadius: 14,
    padding: 18,
    marginVertical: 8,
    marginHorizontal: 16,

    // subtle elevation
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,

    borderWidth: 1,
    borderColor: '#2B2F36',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  symbol: {
    color: '#F0B90B', // Binance yellow
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase'
  },

  time: {
    color: '#848E9C',
    fontSize: 12,
    marginTop: 4,
  },

  directionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
   
  },

  direction: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#2B2F36',
    marginVertical: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  info: {
    width: '48%',
    marginBottom: 16,
  },

  label: {
    color: '#848E9C',
    fontSize: 12,
    marginBottom: 5,
  },

  value: {
    color: '#EAECEF',
    fontSize: 15,
    fontWeight: '600',
  },

  success: {
    color: '#0ECB81',
  },

  danger: {
    color: '#F6465D',
  },
});


