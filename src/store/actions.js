import Services from './services'
export default {
  // fetch coming soon
  async fetchComingSoonFilms ({ state }) {
    const res = await Services.fetchComingSoonFilms()
    state.comingSoonFilms = res.data.data
    return res.data.data
  }
}
