import Services from './services'
export default {
  // fetch coming soon
  async fetchComingSoonFilms ({ state }) {
    const res = await Services.fetchComingSoonFilms()
    state.comingSoonFilms = res.data.data
    return res.data.data
  },
  async fetchFilm ({state}, id) {
    const res = await Services.fetchFilm(id)
    state.film = res.data.data
    return res.data.data
  },
  async fetchFilmTrailer ({state}, id) {
    const res = await Services.fetchFilmTrailer(id)
    state.filmTrailer = res.data.data
    return res.data.data
  }
}
