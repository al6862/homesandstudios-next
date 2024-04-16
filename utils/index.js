export const executeScroll = (ref) => {
  ref.current.scrollIntoView({ block: 'start', behavior: 'instant' });
};
