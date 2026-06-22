/**
 * Flexible placeholder image helper (picsum.photos). Each template picks its
 * own seeds and treatment (color vs grayscale) so the imagery matches its mood.
 * Swap these for real photography later.
 */
export const pic = (
  seed: string,
  w: number,
  h: number,
  opts: { gray?: boolean; blur?: number } = {}
) => {
  const params: string[] = [];
  if (opts.gray) params.push("grayscale");
  if (opts.blur) params.push(`blur=${opts.blur}`);
  const q = params.length ? `?${params.join("&")}` : "";
  return `https://picsum.photos/seed/${seed}/${w}/${h}${q}`;
};
