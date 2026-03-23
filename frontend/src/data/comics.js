// /src/data/comics.js
// โหลด cover (รองรับ png / jpg)
const covers = import.meta.glob('/src/assets/comics/*/cover.{png,jpg}', {
  eager: true,
  import: 'default'
})

export const comics = Object.keys(covers).map((path) => {
  const parts = path.split('/')
  const id = parts[4]

  return {
    id,
    title: id.replace(/-/g, ' '),
    image: covers[path]
  }
})