class AfridioEndpoints {
  V1 = 'v1';

  login = () => `${this.V1}/user/login/`;
  logout = () => `${this.V1}/user/logout/`;
  register = () => `${this.V1}/user/register/`;
  verify = () => `${this.V1}/phone/verify/`;
  genre = () => `${this.V1}/genres/`;
  media = (slug: string) => `${this.V1}/medias/${slug}/`;
  mediaListByFormat = (slug: string, page: string) => {
    if (page) {
      return `${this.V1}/medias/?category=${slug}&page=${page}`;
    }
    return `${this.V1}/medias/?category=${slug}`;
  };
  home = () => `${this.V1}/home/`;
  resend = () => `${this.V1}/phone/resend/`;
  searchBy = () => `${this.V1}/searchby/`;
  mediaSearch = (
    search: string | null,
    format: string | null,
    language: string | null,
    genre: string | null,
  ) => {
    let query = null;
    if (search) query = `?search=${search}`;
    if (format) {
      query = query ? `&category=${format}` : `?category=${format}`;
    }

    if (language) {
      query = query ? `&language=${language}` : `?language=${language}`;
    }

    if (genre) {
      query = query ? `&genres=${genre}` : `?genres=${genre}`;
    }
    return `${this.V1}/medias/${query}`;
  };
  trackDownloadLog = (slug: string) => {
    return `${this.V1}/tracks/${slug}/download/`;
  };
  likeMedia = (slug: string) => {
    return `${this.V1}/medias/${slug}/like/`;
  };
}

export default new AfridioEndpoints();
