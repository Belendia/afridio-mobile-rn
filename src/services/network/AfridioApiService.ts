import { from } from "rxjs";
import AfridioAsyncStoreService from "../asyncstorage/AfridioAsyncStoreService";
import NetworkHelper from "../../helpers/NetworkHelper";
import AfridioEndpoints from "./AfridioEndpoints";
import AfridioHttpException from "./exceptions/AfridioHttpException";
import OfflineException from "./exceptions/OfflineException";

type ContentType = "JSON" | "Text" | "Unsupported";
interface ApiConfig {
  url: string;
  verb?: "GET" | "PUT" | "POST" | "DELETE";
  timeoutInSeconds?: number;
  data?: object;
  withToken?: boolean;
}

type HeaderType = {
  method: string;
  headers: {
    "Content-Type": string;
    accept: string;
    authorization?: string;
  };
};

class AfridioApiService {
  defaultTimeout = 30;
  BASE_URL = "http://192.168.8.102:8000/api/";

  getHttpConfig = (
    token: string,
    verb: ApiConfig["verb"] = "GET",
    withToken: boolean = true
  ) => {
    let header: HeaderType = {
      method: verb,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    };
    if (withToken) {
      header.headers = { ...header.headers, authorization: `Token ${token}` };
    }
    return header;
  };

  getContentType = (res: Response) => {
    const isJSON =
      res.headers.get("Content-Type")?.startsWith("application/json") || false;

    if (isJSON) return "JSON";

    const isText = res.headers.get("Content-Type")?.startsWith("text") || false;

    if (isText) return "Text";

    return "Unsupported";
  };

  doThrow = async (res: Response, contentType: ContentType) => {
    // Not 2XX
    if (contentType === "JSON") {
      const error = await res.json();
      throw new AfridioHttpException(res.status, error, res.url);
    } else if (contentType === "Text") {
      const errorText = await res.text();
      throw new AfridioHttpException(res.status, errorText, res.url);
    }

    // Not 2XX, not JSON and not text.
    throw new AfridioHttpException(
      res.status,
      "Unsupported content type",
      res.url
    );
  };

  processResponse = async (res: Response) => {
    const contentType = this.getContentType(res);

    // HTTP 2XX
    if (res.ok) {
      if (contentType === "JSON") {
        return await res.json();
      } else {
        return res;
      }
    }

    return this.doThrow(res, contentType);
  };

  api = async <T>({
    url,
    verb,
    timeoutInSeconds,
    data,
    withToken,
  }: ApiConfig) => {
    if (NetworkHelper.isInternetReachable) {
      const token = await AfridioAsyncStoreService.getToken();
      const reqConfig = await this.getHttpConfig(token!, verb, withToken);

      const fullURL = this.BASE_URL + url;
      const reqTimeout = timeoutInSeconds || this.defaultTimeout;

      const contoller = new AbortController();
      if (verb === "POST" && data) {
        data = { body: JSON.stringify(data) };
      }
      const finalConfig = { signal: contoller.signal, ...reqConfig, ...data };

      const abort = setTimeout(() => {
        contoller.abort();
      }, reqTimeout * 1000);

      const res = await fetch(fullURL, finalConfig);

      clearTimeout(abort);

      return this.processResponse(res);
    } else {
      throw new OfflineException("Offline", "Internet not reachable", url);
    }
  };

  login = (phoneNumber: string, pwd: string) =>
    from(
      this.api({
        url: AfridioEndpoints.login(),
        verb: "POST",
        data: { phone_number: phoneNumber, password: pwd },
        withToken: false,
      })
    );

  logout = () =>
    from(
      this.api({
        url: AfridioEndpoints.logout(),
        verb: "GET",
        withToken: true,
      })
    );

  register = (data: object) =>
    from(
      this.api({
        url: AfridioEndpoints.register(),
        verb: "POST",
        data: { ...data },
        withToken: false,
      })
    );

  verify = (data: object) =>
    from(
      this.api({
        url: AfridioEndpoints.verify(),
        verb: "POST",
        data: { ...data },
        withToken: false,
      })
    );

  home = () =>
    from(
      this.api({
        url: AfridioEndpoints.home(),
        verb: "GET",
        withToken: true,
      })
    );

  media = (slug: string) =>
    from(
      this.api({
        url: AfridioEndpoints.media(slug),
        verb: "GET",
        withToken: true,
      })
    );

  mediaListByFormat = (slug: string, page: string) =>
    from(
      this.api({
        url: AfridioEndpoints.mediaListByFormat(slug, page),
        verb: "GET",
        withToken: true,
      })
    );

  resendOTP = (data: object) =>
    from(
      this.api({
        url: AfridioEndpoints.resend(),
        verb: "POST",
        data: { ...data },
        withToken: false,
      })
    );
}

export default new AfridioApiService();
