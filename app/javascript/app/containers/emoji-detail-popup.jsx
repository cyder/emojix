import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmojiDetail from '../components/emoji-detail';
import EmojiShape from '../components/shapes/emoji';
import DownloadCartShape from '../components/shapes/download-cart';
import { Background, Container } from '../components/css/popup';
import { STATUS } from '../constants/emoji';
import * as EmojiActions from '../actions/emoji';
import * as DownloadCartActions from '../actions/download-cart';

class EmojiDetailPopup extends Component {
  componentWillMount() {
    this.props.getEmoji(this.props.match.params.id);

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    if (this.props.history.location.state === undefined) {
      this.props.history.push('/');
    } else {
      this.props.history.goBack();
    }
  }

  render() {
    const { status, emoji } = this.props.emoji;
    const { list } = this.props.downloadCart;

    return (
      <Background isShow>
        <Container>
          {
            status === STATUS.SHOWING
              ? (
                <EmojiDetail
                  emoji={emoji}
                  onClose={this.onClose}
                  addEmojiToDownloadCart={this.props.addEmojiToDownloadCart}
                  deleteEmojiFromDownloadCart={this.props.deleteEmojiFromDownloadCart}
                  isAddedToCart={list.some(value => value.id === emoji.id)}
                />
              ) : null
          }
        </Container>
      </Background>
    );
  }
}

function mapStateToProps(state) {
  return {
    emoji: state.emoji,
    downloadCart: state.downloadCart,
  };
}

function mapDispatchProps(dispatch) {
  return bindActionCreators({
    ...EmojiActions,
    ...DownloadCartActions,
  }, dispatch);
}

EmojiDetailPopup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.string,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  emoji: PropTypes.shape({
    status: PropTypes.string.isRequired,
    emoji: EmojiShape,
  }).isRequired,
  getEmoji: PropTypes.func.isRequired,
  addEmojiToDownloadCart: PropTypes.func.isRequired,
  deleteEmojiFromDownloadCart: PropTypes.func.isRequired,
  downloadCart: DownloadCartShape.isRequired,
};

const EmojiDetailPopupContainer = connect(mapStateToProps, mapDispatchProps)(EmojiDetailPopup);

export default EmojiDetailPopupContainer;
