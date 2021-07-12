class AfridioEndpoints {
  V1 = "v1";

  login = () => `${this.V1}/user/login/`;
  logout = () => `${this.V1}/user/logout/`;
  register = () => `${this.V1}/user/register/`;
  verify = () => `${this.V1}/phone/verify/`;
  genre = () => `${this.V1}/genres/`;
  media = (slug: string) => `${this.V1}/medias/${slug}`;
  mediaListByFormat = (slug: string, page: string) => {
    if (page) {
      return `${this.V1}/medias/?category=${slug}&page=${page}`;
    }
    return `${this.V1}/medias/?category=${slug}`;
  };
  home = () => `${this.V1}/home/`;
  resend = () => `${this.V1}/phone/resend/`;
}

export default new AfridioEndpoints();
