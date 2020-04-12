const ga = {
  trackEvent: (category, event, params) => {
    params
      ? window.gtag('event', `${category}_${event}`, params)
      : window.gtag('event', `${category}_${event}`);
  },
};

export default ga;
