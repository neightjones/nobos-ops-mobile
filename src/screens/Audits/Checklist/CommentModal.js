import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Modal, View } from 'react-native';
import { Text, Icon, Button, Container, Content, Form, Textarea } from 'native-base';

const screenWidth = Math.round(Dimensions.get('window').width);

const CommentModal = props => {
  const { item, open, close, patchChecklistInstanceItem } = props;
  if (!item) return null;
  const [internalComment, setInternalComment] = useState('');

  useEffect(() => {
    setInternalComment(item.comment);
  }, [item]);

  const onSaveAndClose = () => {
    if (item.comment !== internalComment) {
      patchChecklistInstanceItem(item.id, 'comment', item.comment, internalComment);
    }
    close();
  };

  return (
    <Modal
      animationType="slide"
      visible={open}
      onRequestClose={() => close()}
      onDismiss={() => close()}
    >
      <Container>
        <Content style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.btnContainer}>
            <Button
              small
              iconLeft
              success
              onPress={() => onSaveAndClose()}
            >
              <Icon name="md-arrow-round-back" />
              <Text>Save and Close</Text>
            </Button>
            <Button
              small
              warning
              onPress={() => close()}
            >
              <Text>Cancel</Text>
            </Button>
          </View>
          <Text style={styles.itemText}>
            Enter your comment:
          </Text>
          <Form style={styles.formStyle}>
            <Textarea
              rowSpan={4}
              bordered
              placeholder="Comment"
              value={internalComment}
              onChangeText={t => setInternalComment(t)}
            />
          </Form>
        </Content>
      </Container>
     </Modal>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 160,
  },
  itemText: {
    color: '#585858',
    fontSize: 14,
    textAlign: 'center',
  },
  formStyle: {
    width: '100%',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});