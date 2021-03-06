import * as types from '../constants/emoji';

const initialState = {
  status: types.STATUS.EMPTY,
  emoji: null,
};

const emoji = (state = initialState, action) => {
  switch (action.type) {
    case types.GET:
      return {
        ...state,
        status: types.STATUS.LOADING,
        emoji: null,
      };
    case types.EDIT:
      return {
        ...state,
        emoji: {
          ...state.emoji,
          name: action.name,
          description: action.description,
        },
      };
    case types.DELETE:
      return {
        status: types.STATUS.DELETED,
        emoji: null,
      };
    case types.SUCCESS_GET:
      return {
        ...state,
        status: types.STATUS.SHOWING,
        emoji: action.emoji,
      };
    case types.FAILED_GET:
      return {
        ...state,
        status: types.STATUS.ERROR,
        emoji: null,
      };
    case types.SUCCESS_ADD_TAG:
      return {
        ...state,
        emoji: {
          ...state.emoji,
          tags: [...state.emoji.tags, action.tag],
        },
      };
    case types.DELETE_TAG: {
      const tags = state.emoji.tags.filter(tag => tag.id !== action.tagId);
      return {
        ...state,
        emoji: {
          ...state.emoji,
          tags,
        },
      };
    }
    default:
      return state;
  }
};

export default emoji;
