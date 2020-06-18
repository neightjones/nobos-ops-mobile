import React from 'react';
import { connect } from 'react-redux';
import { doToggleItem, setItemVideo, setItemComment } from 'entities/Checklist/actions';
import List from './List';

const AuditChecklistMain = props => {
  return (
    <List {...props} />
  );
};

const mapStateToProps = state => ({
  checklist: state.entities.checklists.checklist,
});

const mapDispatchToProps = dispatch => ({
  doToggleItem: itemId => dispatch(doToggleItem(itemId)),
  setItemVideo: (itemId, uri) => dispatch(setItemVideo(itemId, uri)),
  setItemComment: (itemId, text) => dispatch(setItemComment(itemId, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuditChecklistMain);