const size = {
  xs: "425px",
  sm: "768px",
  lg: "1024px",
};

export const device = {
  xs_and_smaller: `(max-width: ${size.xs})`,
  sm_and_smaller: `(max-width: ${size.sm})`,
  lg_and_smaller: `(max-width: ${size.lg})`,
  xs_and_larger: `(min-width: ${size.xs})`,
  sm_and_larger: `(min-width: ${size.sm})`,
  lg_and_larger: `(min-width: ${size.lg})`,
};
