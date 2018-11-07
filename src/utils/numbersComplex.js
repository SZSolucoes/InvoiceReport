
export const interpolateRange = (minX, maxX, minY, maxY, clampFlag) => {
    const slope = (maxY - minY) / (maxX - minX);
    return clampFlag ?
      (x) => {
        let value = x;
        if (x < minX) {
            value = minX;
        } else if (x > maxX) {
            value = maxX;
        }

        return ((value - minX) * slope) + minY;
      }
      :
      (x) => (((x - minX) * slope) + minY);
};
