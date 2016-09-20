const handleReducers = (handlers, state, action) =>
    action.type in handlers
        ? handlers[action.type](state, action)
        : state;

export default handleReducers;
