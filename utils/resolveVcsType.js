const resolveVcsType = url => (
  url.replace(/^\/(gh|bb)/, (_, p) => p === 'gh' ? '/github' : (p === 'bb' ? '/bitbucket' : '/'))
)
export default resolveVcsType
