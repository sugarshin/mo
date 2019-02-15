import resolveVcsType from '../resolveVcsType'

test('resolveVcsType / `gh`', () => {
  expect(resolveVcsType('/gh/path/foo/bar')).toBe('/github/path/foo/bar')
})

test('resolveVcsType / `bb`', () => {
  expect(resolveVcsType('/bb/path/foo/bar')).toBe('/bitbucket/path/foo/bar')
})
