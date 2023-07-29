import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginHorizontal: '10px',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

const CartPDF = ({ products, total }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={{ marginHorizontal: '10px' }}>
          <Text style={{ textAlign: 'center', marginVertical: '10px' }}>Final details for your order</Text>
          <Text style={{ fontSize: '12px' }}>Order placed on: {new Date().toDateString()}</Text>
          <Text style={{ fontSize: '12px' }}>Order total: {total}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{ ...styles.tableCol, width: '20%' }}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
            <View style={{ ...styles.tableCol, width: '70%' }}>
              <Text style={styles.tableCell}>Category</Text>
            </View>
            <View style={{ ...styles.tableCol, width: '10%' }}>
              <Text style={styles.tableCell}>Price</Text>
            </View>
          </View>
          {(products || []).map((product) => (
            <View style={styles.tableRow}>
              <View style={{ ...styles.tableCol, width: '20%' }}>
                <Text style={styles.tableCell}>{product.name}</Text>
              </View>
              <View style={{ ...styles.tableCol, width: '70%' }}>
                <Text style={styles.tableCell}>{product.category}</Text>
              </View>
              <View style={{ ...styles.tableCol, width: '10%' }}>
                <Text style={styles.tableCell}>{product.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CartPDF;
