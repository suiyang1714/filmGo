import Fly from 'flyio'
const baseUrl = 'http://localhost:5000'
const fly = new Fly()

class Services {
  fetchComingSoonFilms () {
    return fly.get(`${baseUrl}/api/film/comingsoon`)
  }
  fetchFilm (id) {
    return fly.get(`${baseUrl}/api/film/id?id=${id}`)
  }
  fetchFilmTrailer ({filmId}) {
    return fly.get(`${baseUrl}/api/film/poster/id?filmId=${filmId}`)
  }
}
export default new Services()
