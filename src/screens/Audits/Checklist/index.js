import React from 'react';
import { connect } from 'react-redux';
import { doToggleItem, updateComment } from 'entities/Checklist/actions';
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
  updateComment: (itemId, text) => dispatch(updateComment(itemId, text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuditChecklistMain);