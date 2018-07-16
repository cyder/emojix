import 'babel-polyfill';
import { takeEvery, put } from 'redux-saga/effects';

import { GET, EDIT, DELETE, ADD_TAG, DELETE_TAG } from '../constants/emoji';
import { successGetEmoji, failedGetEmoji, successAddTag } from '../actions/emoji';
import { getEmoji, editEmoji, deleteEmoji, createTag, deleteTag } from '../api';

function* sageGetEmoji(action) {
  try {
    const json = yield getEmoji(action.id);
    yield put(successGetEmoji(json.emoji));
  } catch (status) {
    yield put(failedGetEmoji());
  }
}

function* sageEditEmoji(action) {
  yield editEmoji(action.id, action.name, action.description, action.accessToken);
}


function* sageDeleteEmoji(action) {
  yield deleteEmoji(action.id, action.accessToken);
}

function* sageAddTag(action) {
  const json = yield createTag(action.emojiId, action.name, action.accessToken);
  yield put(successAddTag(json.tag));
}

function* sageDeleteTag(action) {
  yield deleteTag(action.emojiId, action.tagId, action.accessToken);
}

export default function* emojiSaga() {
  yield takeEvery(GET, sageGetEmoji);
  yield takeEvery(EDIT, sageEditEmoji);
  yield takeEvery(DELETE, sageDeleteEmoji);
  yield takeEvery(ADD_TAG, sageAddTag);
  yield takeEvery(DELETE_TAG, sageDeleteTag);
}
