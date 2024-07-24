import axios from 'axios';

const API_URL = 'https://api.tvmaze.com';

export const getAllMovies = () => {
  return axios.get(`${API_URL}/search/shows?q=all`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching movies:', error);
      throw error;
    });
};

export const searchMovies = (searchTerm) => {
  return axios.get(`${API_URL}/search/shows?q=${searchTerm}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error searching movies:', error);
      throw error;
    });
};

export const getMoviesByPage = (page = 0) => {
  return axios.get(`${API_URL}/shows?page=${page}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching movies by page:', error);
      throw error;
    });
};

export const getShowDetails = (showId) => {
  return axios.get(`${API_URL}/shows/${showId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching show details:', error);
      throw error;
    });
};

export const getShowEpisodes = (showId) => {
  return axios.get(`${API_URL}/shows/${showId}/episodes`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching show episodes:', error);
      throw error;
    });
};
