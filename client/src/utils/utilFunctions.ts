export function roundFollowers(followers: number) {
  if (followers >= 1000000) {
    return `${Math.floor(followers / 1000000)}M Followers`;
  } else {
    return `${Math.floor(followers / 1000)}K Followers`;
  }
}
